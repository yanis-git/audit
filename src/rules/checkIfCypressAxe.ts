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
    };
};
