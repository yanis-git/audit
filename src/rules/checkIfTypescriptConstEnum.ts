import {AsyncAuditFunction, AuditResult} from "../types";
import {Inquirer} from "inquirer";

export const checkIfTypescriptConstEnum: AsyncAuditFunction = async (inquirer: Inquirer): Promise<AuditResult | false> => {
    const answers = await inquirer.prompt([{
        type: "confirm",
        name: "checkIfTypescriptConstEnum",
        message: "En Typescript, utilisez-vous des const enums plutot que des enums basiques ?",
        choices: ["Oui", "Non"]
    }]);
    if(answers.checkIfCountInsteadOfExist){
        return false
    }
    return {
        links: ["https://ultimatecourses.com/blog/const-enums-typescript"]
    };
};
