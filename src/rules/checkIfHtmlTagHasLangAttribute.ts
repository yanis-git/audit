import {AuditFunction, AuditResult} from "../types";
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
    };
};
