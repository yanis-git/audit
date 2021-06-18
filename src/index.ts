const commandLineArgs = require("command-line-args");
const audit = require("eco-index-audit/src/ecoindex/audit");
const puppeteer = require("puppeteer");

const optionDefinitions = [{ name: "url", type: String }];

interface AuditResult {
    name: string;
    message: string;
}
interface Result {
  ecoIndex: {
    ecoIndex: number;
    grade: string;
    greenhouseGasesEmission: number;
    waterConsumption: number;
  };
  audits: { [key: string]: AuditResult };
}

type AuditFunction = (page: any) => Promise<AuditResult | false>;
const checkIfLinkInsideLabel: AuditFunction = async (page: any): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("label a")?.length);
  if(size === 0){
      return false;
  }
  return {
    name: 'check-if-link-inside-label',
    message: "Pour des raisons d'accessibilité, vous ne pouvez avoir de liens dans un label de formulaire",
  }
};
const checkIfHtmlTagHasLangAttribute: AuditFunction = async (page: any): Promise<AuditResult | false> => {
  const size = await page.evaluate(() => document.querySelectorAll("html[lang]")?.length);
  if(size === 1){
      return false;
  }
  return {
    name: 'check-if-html-tag-has-lang-attribute',
    message: "La balise HTML doit absolument définir l'attribut lang afin de configurer la langue par défaut de votre contenu",
  }
};
const rules = [checkIfLinkInsideLabel, checkIfHtmlTagHasLangAttribute];

(async () => {
  const options = commandLineArgs(optionDefinitions);
  const result: Partial<Result> = {
      audits: {}
  };
  result.ecoIndex = await audit(options.url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(options.url);
  for(let rule of rules){
      const auditResult = await rule(page)
      if(auditResult && result.audits){
        result.audits[auditResult.name] = auditResult
      }
  }
  await browser.close();
  console.log(result);
})();
