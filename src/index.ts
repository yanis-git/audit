const commandLineArgs = require("command-line-args");
const audit = require("eco-index-audit/src/ecoindex/audit");
const puppeteer = require("puppeteer");
const path = require("path");

interface Metadata {
  packageJson?: any;
}
const optionDefinitions = [
  { name: "path", type: String },
  { name: "url", type: String, multiple: true },
];

interface AuditResult {
  name: string;
  message: string;
  payload?: any;
}

interface Result {
  ecoIndex: {
    pages: {
      ecoIndex: number;
      grade: string;
      greenhouseGasesEmission: number;
      waterConsumption: number;
    }[];
    ecoIndex: number;
    grade: string;
    greenhouseGasesEmission: number;
    waterConsumption: number;
  };
  audits: { [key: string]: { [key: string]: AuditResult } };
  biggestRequest: { url: string; size: number }[];
}

type AuditFunction = (page: any, metadata: Metadata) => Promise<AuditResult | false>;
const checkIfLinkInsideLabel: AuditFunction = async (page: any): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("label a")?.length);
  if (size === 0) {
    return false;
  }
  return {
    name: "check-if-link-inside-label",
    message: "Pour des raisons d'accessibilité, vous ne pouvez avoir de liens dans un label de formulaire",
  };
};

const checkIfButtonWithoutType: AuditFunction = async (page: any): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("button:not(type)")?.length);
  if (size === 0) {
    return false;
  }
  return {
    name: "check-if-button-without-type",
    message:
      "Pour éviter des éventuels problèmes pour vos utilisateurs, nous vous conseillons de toujours définir l'attribut type pour un bouton",
  };
};

const checkIfImageWithoutAlt: AuditFunction = async (page: any): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("img:not([alt])")?.length);
  if (size === 0) {
    return false;
  }
  return {
    name: "check-if-image-without-alt",
    message: "Pour des raisons d'accessibilité, vous ne pouvez avoir d'images sant attributs alt'",
  };
};

const checkIfMomentDependency: AuditFunction = async (page: any, metadata: Metadata): Promise<AuditResult | false> => {
  if (!Object.keys(metadata.packageJson.dependencies).includes("moment")) {
    return false;
  }
  return {
    name: "check-if-moment-dependency",
    message:
      "Il semblerait que vous utilisez la librairie Moment.js. Celle-ci n'est plus maintenue. Nous vous recommendons d'utiliser des librairies plus légères comme Day.js ou Date-fns",
  };
};
const checkIfHtmlTagHasLangAttribute: AuditFunction = async (
  page: any,
  metadata: Metadata
): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("html[lang]")?.length);
  if (size === 1) {
    return false;
  }
  return {
    name: "check-if-html-tag-has-lang-attribute",
    message:
      "La balise HTML doit absolument définir l'attribut lang afin de configurer la langue par défaut de votre contenu",
  };
};
const rulesPerPage = [
  checkIfLinkInsideLabel,
  checkIfHtmlTagHasLangAttribute,
  checkIfImageWithoutAlt,
  checkIfButtonWithoutType,
];
const rules = [checkIfMomentDependency];

(async () => {
  const options = commandLineArgs(optionDefinitions);

  const result: Partial<Result> = {
    audits: {
      global: {},
    },
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const metadata: Metadata = {};
  try {
    const fullPath = path.resolve(options.path);
    const packageJson = require(fullPath + "/package.json");
    metadata.packageJson = packageJson;
  } catch (e) {}

  for (let rule of rules) {
    const auditResult = await rule(page, metadata);
    if (auditResult && result.audits) {
      result.audits.global[auditResult.name] = auditResult;
    }
  }

  const devToolsResponses = new Map();
  const devTools = await page.target().createCDPSession();
  await devTools.send("Network.enable");

  const requests: any = {};
  devTools.on("Network.responseReceived", (event: any) => {
    requests[event.requestId] = {
      url: event.response.url,
    };
    devToolsResponses.set(event.requestId, event.response);
  });

  devTools.on("Network.loadingFinished", (event: any) => {
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
    for (let rule of rulesPerPage) {
      const auditResult = await rule(page, metadata);
      if (auditResult && result.audits) {
        result.audits[url][auditResult.name] = auditResult;
      }
    }
  }

  const domain = Object.values(requests)
    .map((request: any) => request.url)
    .map((url) => new URL(url).hostname)
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
