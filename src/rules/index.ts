import {checkIfLinkInsideLabel} from "./checkIfLinkInsideLabel";
import {checkIfHtmlTagHasLangAttribute} from "./checkIfHtmlTagHasLangAttribute";
import {checkIfImageWithoutAlt} from "./checkIfImageWithoutAlt";
import {checkIfButtonWithoutType} from "./checkIfButtonWithoutType";
import {checkIfMomentDependency} from "./checkIfMomentDependency";

export const rulesPerPage = [
    checkIfLinkInsideLabel,
    checkIfHtmlTagHasLangAttribute,
    checkIfImageWithoutAlt,
    checkIfButtonWithoutType,
];
export const rules = [checkIfMomentDependency];
