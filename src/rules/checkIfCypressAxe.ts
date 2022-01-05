import {AuditFunction, AuditResult, Metadata} from "../types";
import {Page} from "puppeteer";

export const checkIfCypressAxe: AuditFunction = async (page: Page, metadata: Metadata): Promise<AuditResult | false> => {
    const devDependencies = metadata?.packageJson?.devDependencies ?? {};

    if (!Object.keys(devDependencies)?.includes("cypress")) {
        return false;
    }
    if (!Object.keys(devDependencies)?.includes("cypress-axe")) {
        return false;
    }
    return {
        name: "check-if-cypress-axe-dependency",
        message:
            "Il semblerait que vous utilisez Cypress pour vos tests d'interface. Vous pourriez installer également Cypress Axe afin de vérifier le niveau d'accessibilité de vos page.",
    };
};
