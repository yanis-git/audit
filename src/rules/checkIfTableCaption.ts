import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfTableCaption: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const error = {
        name: "check-if-table-caption",
        message:
            "Vous devez avoir une balise caption inside a table",
    }
    const numberOfTableWithoutCaption = await page.evaluate(() => Array.from(document.querySelectorAll("table")).find(table => table.querySelectorAll("caption").length === 0)) as HTMLTableElement;
    if (!numberOfTableWithoutCaption) {
        return false;
    }
    return error;
};
