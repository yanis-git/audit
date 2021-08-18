import {AuditFunction, AuditResult, Metadata} from "../types";

export const checkIfReadme: AuditFunction = async (page: any, {readme}: Metadata): Promise<AuditResult | false> => {
    if (readme){
        return false;
    }
    return {
        name: "check-if-readme",
        message:
            "Dans le but de rendre votre project facilement utilisable, veuillez créer un fichier README.md.",
    };
};
