import {AuditFunction, AuditResult, Metadata} from "../types";

export const checkIfHtmlTagHasLangAttribute: AuditFunction = async (
    page: any,
    metadata: Metadata
): Promise<AuditResult | false> => {
    const size = await page.evaluate(() => document.querySelectorAll("html[lang]")?.length);
    if (size === 1) {
        return false;
    }
    return {
        name: "check-if-html-tag-has-lang-attribute",
        message:
            "La balise HTML doit absolument définir l'attribut lang afin de configurer la langue par défaut de votre contenu",
    };
};
