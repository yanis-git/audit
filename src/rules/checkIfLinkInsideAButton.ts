import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfLinkInsideAButton: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("button a")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-button-inside-link",
        message:
            "Sémantiquement, il est interdit d'avoir un lien dans un bouton",
    };
};
