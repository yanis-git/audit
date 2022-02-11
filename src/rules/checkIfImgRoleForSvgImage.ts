import {AsyncAuditFunction} from "../types";
import {Inquirer} from "inquirer";

export const checkIfImgRoleForSvgImage: AsyncAuditFunction = async (inquirer: Inquirer): Promise<boolean> => {
    const answers = await inquirer.prompt([{
        type: "confirm",
        name: "checkIfImgRoleForSvgImage",
        message: "Avons-nous des images au format SVG sur lesquelles l'attribut role=img n'est pas utilisé ?",
        choices: ["Oui", "Non"]
    }]);
    if(!answers.checkIfImgRoleForSvgImage){
        return false
    }
    return true
};
