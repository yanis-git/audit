import {checkIfLinkInsideLabel} from "./checkIfLinkInsideLabel";
import {checkIfHtmlTagHasLangAttribute} from "./checkIfHtmlTagHasLangAttribute";
import {checkIfImageWithoutAlt} from "./checkIfImageWithoutAlt";
import {checkIfButtonWithoutType} from "./checkIfButtonWithoutType";
import {checkIfMomentDependency} from "./checkIfMomentDependency";
import {checkIfButtonInsideALink} from "./checkIfButtonInsideALink";

export const rulesPerPage = [
    checkIfLinkInsideLabel,
    checkIfHtmlTagHasLangAttribute,
    checkIfImageWithoutAlt,
    checkIfButtonWithoutType,
    checkIfButtonInsideALink
];
export const rules = [checkIfMomentDependency];
