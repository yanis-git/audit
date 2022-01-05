import {rules, rulesPerPage} from "./rules";
import {Metadata, Result} from "./types";
import {getGitMetadata} from "./metadatas/git";
import {getReadmeMetadata} from "./metadatas/readme";
import {Page, Protocol} from "puppeteer";
import commandLineArgs, {CommandLineOptions} from "command-line-args";
import yaml from "js-yaml";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import audit from "eco-index-audit/src/ecoindex/audit";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import ResponseReceivedEvent = Protocol.Network.ResponseReceivedEvent;
import LoadingFinishedEvent = Protocol.Network.LoadingFinishedEvent;


const optionDefinitions = [
  { name: "path", type: String },
  { name: "config", type: String },
  { name: "url", type: String, multiple: true },
];

(async () => {
  const cliOptions = commandLineArgs(optionDefinitions);
  const options: CommandLineOptions = cliOptions.config ? yaml.load(fs.readFileSync(path.resolve(cliOptions.config), 'utf-8')) as CommandLineOptions : cliOptions;

  console.log(options)
  const result: Partial<Result> = {
    audits: {
      global: {},
    },
  };

  const browser = await puppeteer.launch();
  const page: Page = await browser.newPage();

  const metadata: Metadata = {};

  if(options.path) {
    const fullPath = path.resolve(options.path);

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const packageJson = require(fullPath + "/package.json");
      metadata.packageJson = packageJson;
    } catch (e) {
      console.error(e)
    }

    const git = await getGitMetadata(fullPath);
    metadata.git = git;
    metadata.readme = getReadmeMetadata(fullPath);
  }


  for (const rule of rules) {
    const auditResult = await rule(page, metadata);
    if (auditResult && result.audits) {
      result.audits.global[auditResult.name] = auditResult;
    }
  }

  const devToolsResponses = new Map();
  const devTools = await page.target().createCDPSession();
  await devTools.send("Network.enable");

  const requests: { [key: string]: { url?: string, size?: number } } = {};
  devTools.on("Network.responseReceived", (event: ResponseReceivedEvent) => {
    requests[event.requestId] = {
      url: event.response.url,
    };
    devToolsResponses.set(event.requestId, event.response);
  });

  devTools.on("Network.loadingFinished", (event: LoadingFinishedEvent) => {
    requests[event.requestId] = {
      ...requests[event.requestId],
      size: event.encodedDataLength,
    };
  });
  for (const url of options.url) {
    if (result.audits) {
      result.audits[url] = {};
    }

    result.ecoIndex = await audit(url);
    await page.goto(url);
    for (const rule of rulesPerPage) {
      const auditResult = await rule(page, metadata);
      if (auditResult && result.audits) {
        result.audits[url][auditResult.name] = auditResult;
      }
    }
  }

  const domain = Object.values(requests)
    .map((request) => request.url)
    .map((url) => new URL(url as string).hostname)
    .reduce((acc: { [key: string]: number }, domain: string) => {
      if (acc[domain]) {
        return {
          ...acc,
          [domain]: acc[domain] + 1,
        };
      } else {
        return {
          ...acc,
          [domain]: 1,
        };
      }
    }, {});

  if (Object.keys(domain).length > 3 && result.audits) {
    result.audits.global["check-if-less-three-domains"] = {
      name: "check-if-less-three-domains",
      message: "Vous devez utiliser moins de trois domaines",
      payload: domain,
    };
  }

  const topFive = Object.values(requests)
    .sort((r1: any, r2: any) => r2.size - r1.size)
    .splice(0, 5);

  result.biggestRequest = topFive as any;

  await browser.close();
  console.log(result);
})();
