import {checkIfLinkInsideLabel} from "./checkIfLinkInsideLabel";
import {checkIfHtmlTagHasLangAttribute} from "./checkIfHtmlTagHasLangAttribute";
import {checkIfImageWithoutAlt} from "./checkIfImageWithoutAlt";
import {checkIfButtonWithoutType} from "./checkIfButtonWithoutType";
import {checkIfMomentDependency} from "./checkIfMomentDependency";
import {checkIfButtonInsideALink} from "./checkIfButtonInsideALink";
import {checkIfLinkInsideAButton} from "./checkIfLinkInsideAButton";

export const rulesPerPage = [
    checkIfLinkInsideLabel,
    checkIfHtmlTagHasLangAttribute,
    checkIfImageWithoutAlt,
    checkIfButtonWithoutType,
    checkIfButtonInsideALink,
    checkIfLinkInsideAButton
];
export const rules = [checkIfMomentDependency];
