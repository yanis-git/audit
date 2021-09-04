import {AuditFunction, AuditResult, Metadata} from "../types";
import {Page} from "puppeteer";

export const checkIfHtmlTagHasLangAttribute: AuditFunction = async (
    page: Page
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
