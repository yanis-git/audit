import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfButtonWithoutType: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("button:not(type)")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-button-without-type",
    };
};
