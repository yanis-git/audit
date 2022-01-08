import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfMultipleNavWithoutLabel: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("nav:not([aria-label]), nav:not([aria-labelledby])")?.length);
    if (size <= 1) {
        return false;
    }
    return {
        name: "check-if-multiple-nav-without-label",
    };
};
