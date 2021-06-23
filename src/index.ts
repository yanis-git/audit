const commandLineArgs = require("command-line-args");
const audit = require("eco-index-audit/src/ecoindex/audit");
const puppeteer = require("puppeteer");
const path = require("path");

interface Metadata {
  packageJson?: any
}
const optionDefinitions = [
  { name: 'path', type: String},
  { name: "url", type: String, multiple: true 
}];

interface AuditResult {
  name: string;
  message: string;
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
  audits: { [key: string]: { [key: string]: AuditResult}};
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

const checkIfMomentDependency: AuditFunction = async (page: any, metadata: Metadata): Promise<AuditResult | false> => {
  if (!Object.keys(metadata.packageJson.dependencies).includes("moment")) {
    return false;
  }
  return {
    name: "check-if-moment-dependency",
    message: "Il semblerait que vous utilisez la librairie Moment.js. Celle-ci n'est plus maintenue. Nous vous recommendons d'utiliser des librairies plus légères comme Day.js ou Date-fns",
  };
};
const checkIfHtmlTagHasLangAttribute: AuditFunction = async (page: any, metadata: Metadata): Promise<AuditResult | false> => {
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
const rulesPerPage = [checkIfLinkInsideLabel, checkIfHtmlTagHasLangAttribute];
const rules = [checkIfMomentDependency];

(async () => {
  const options = commandLineArgs(optionDefinitions);

  const result: Partial<Result> = {
    audits: {
      global: {}
    },
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const metadata: Metadata = {}
  try {
    const fullPath = path.resolve(options.path)
    const packageJson = require(fullPath + "/package.json");
    metadata.packageJson = packageJson;
  } catch (e) {}

  if (result.audits) {
  }
  for (let rule of rules) {
    const auditResult = await rule(page, metadata);
    if (auditResult && result.audits) {
      result.audits.global[auditResult.name] = auditResult;
    }
  }

  for (const url of options.url) {
    if(result.audits){
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

  await browser.close();
  console.log(result);
})();
