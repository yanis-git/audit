import {AuditFunction, AuditResult, Metadata} from "../types";
import {Page} from "puppeteer";

export const checkIfMomentDependency: AuditFunction = async (page: Page, metadata: Metadata): Promise<AuditResult | false> => {
    if (!Object.keys(metadata?.packageJson?.dependencies ?? {})?.includes("moment")) {
        return false;
    }
    return {
        name: "check-if-moment-dependency",
        message:
            "Il semblerait que vous utilisez la librairie Moment.js. Celle-ci n'est plus maintenue. Nous vous recommendons d'utiliser des librairies plus légères comme Day.js ou Date-fns",
    };
};
