import {AuditFunction, AuditResult} from "../types";

export const checkIfButtonInsideALink: AuditFunction = async (page: any): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("a button")?.length);
    if (size === 0) {
        return false;
    }
    return {
        name: "check-if-button-inside-link",
        message:
            "Sémantiquement, il est interdit d'avoir un bouton dans un lien",
    };
};
