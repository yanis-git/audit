import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfMainLang: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const htmlNode = await page.evaluate(() => document.querySelector("html[lang]"));
    if (htmlNode) {
        return false;
    }
    return {
        name: "check-if-main-lang",
        message:
            "Vous devez avoir l'attribut lang présent sur la balise html",
    };
};
