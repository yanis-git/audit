import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfButtonInsideALink: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("a button")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-button-inside-link",
        message:
            "Sémantiquement, il est interdit d'avoir un bouton dans un lien",
    };
};
