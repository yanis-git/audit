import {checkIfLinkInsideLabel} from "./checkIfLinkInsideLabel";
import {checkIfHtmlTagHasLangAttribute} from "./checkIfHtmlTagHasLangAttribute";
import {checkIfImageWithoutAlt} from "./checkIfImageWithoutAlt";
import {checkIfButtonWithoutType} from "./checkIfButtonWithoutType";
import {checkIfMomentDependency} from "./checkIfMomentDependency";
import {checkIfButtonInsideALink} from "./checkIfButtonInsideALink";
import {checkIfLinkInsideAButton} from "./checkIfLinkInsideAButton";
import {checkIfMainLang} from "./checkIfMainLang";
import {checkIfCypressAxe} from "./checkIfCypressAxe";
import {checkIfLandmarks} from "./checkIfLandmarks";
import {checkIfReadme} from "./checkIfReadme";
import {checkIfTitle} from "./checkIfTitle";
import {checkIfTableCaption} from "./checkIfTableCaption";
import {checkIfMultipleNavWithoutLabel} from "./checkIfMultupleNavWithoutLabel";

export const rulesPerPage = [
    checkIfLinkInsideLabel,
    checkIfHtmlTagHasLangAttribute,
    checkIfImageWithoutAlt,
    checkIfButtonWithoutType,
    checkIfButtonInsideALink,
    checkIfLinkInsideAButton,
    checkIfMainLang,
    checkIfLandmarks,
    checkIfReadme,
    checkIfTitle,
    checkIfTableCaption,
    checkIfMultipleNavWithoutLabel
];
export const rules = [checkIfMomentDependency, checkIfCypressAxe];
