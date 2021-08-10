import {AuditFunction, AuditResult} from "../types";

export const checkIfImageWithoutAlt: AuditFunction = async (page: any): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("img:not([alt])")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-image-without-alt",
        message: "Pour des raisons d'accessibilité, vous ne pouvez avoir d'images sant attributs alt'",
    };
};
