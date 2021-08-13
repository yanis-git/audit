import {AuditFunction, AuditResult, Metadata} from "../types";

export const checkIfCypressAxe: AuditFunction = async (page: any, metadata: Metadata): Promise<AuditResult | false> => {
    if (!Object.keys(metadata.packageJson.devDependencies).includes("cypress")) {
        return false;
    }
    if (!Object.keys(metadata.packageJson.devDependencies).includes("cypress-axe")) {
        return false;
    }
    return {
        name: "check-if-cypress-axe-dependency",
        message:
            "Il semblerait que vous utilisez Cypress pour vos tests d'interface. Vous pourriez installer également Cypress Axe afin de vérifier le niveau d'accessibilité de vos page.",
    };
};
