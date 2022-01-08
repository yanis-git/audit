import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfLinkInsideLabel: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("label a")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-link-inside-label",
    };
};
