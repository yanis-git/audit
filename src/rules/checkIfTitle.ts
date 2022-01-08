import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfTitle: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const error = {
        name: "check-if-title",
    }
    const htmlNode = await page.evaluate(() => document.querySelector("title")) as HTMLTitleElement;
    if (htmlNode) {
        if(htmlNode.text === ''){
            return error
        }
        return false;
    }
    return error;
};
