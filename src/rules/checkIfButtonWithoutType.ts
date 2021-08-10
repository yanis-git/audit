import {AuditFunction, AuditResult} from "../types";

export const checkIfButtonWithoutType: AuditFunction = async (page: any): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("button:not(type)")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-button-without-type",
        message:
            "Pour éviter des éventuels problèmes pour vos utilisateurs, nous vous conseillons de toujours définir l'attribut type pour un bouton",
    };
};
