import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfImageWithoutAlt: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("img:not([alt])")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-image-without-alt",
    };
};
