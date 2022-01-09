import {AuditFunction, Metadata} from "../types";
import {Page} from "puppeteer";

export const checkIfMomentDependency: AuditFunction = async (page: Page, metadata: Metadata): Promise<boolean> => {
    if (!Object.keys(metadata?.packageJson?.dependencies ?? {})?.includes("moment")) {
        return false;
    }
    return true;
};
