import {AuditFunction, AuditResult} from "../types";
import {Page} from "puppeteer";

export const checkIfLandmarks: AuditFunction = async (page: Page): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("header, main, footer, nav, aside")?.length) as number;
    if (size > 0) {
        return false;
    }
    return {
        name: "check-if-landmarks",
        message:
            "Afin de structurer pour le mieux votre page, vous devriez utiliser des balises header, main, footer, nav ou encore aside",
    };
};
