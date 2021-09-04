import {AuditFunction, AuditResult, Metadata} from "../types";
import {Page} from "puppeteer";

export const checkIfReadme: AuditFunction = async (page: Page, {readme}: Metadata): Promise<AuditResult | false> => {
    if (readme){
        return false;
    }
    return {
        name: "check-if-readme",
        message:
            "Dans le but de rendre votre project facilement utilisable, veuillez créer un fichier README.md.",
    };
};
