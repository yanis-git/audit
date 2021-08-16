"use strict";
exports.__esModule = true;
exports.rules = exports.rulesPerPage = void 0;
var checkIfLinkInsideLabel_1 = require("./checkIfLinkInsideLabel");
var checkIfHtmlTagHasLangAttribute_1 = require("./checkIfHtmlTagHasLangAttribute");
var checkIfImageWithoutAlt_1 = require("./checkIfImageWithoutAlt");
var checkIfButtonWithoutType_1 = require("./checkIfButtonWithoutType");
var checkIfMomentDependency_1 = require("./checkIfMomentDependency");
var checkIfButtonInsideALink_1 = require("./checkIfButtonInsideALink");
var checkIfLinkInsideAButton_1 = require("./checkIfLinkInsideAButton");
var checkIfMainLang_1 = require("./checkIfMainLang");
var checkIfCypressAxe_1 = require("./checkIfCypressAxe");
var checkIfLandmarks_1 = require("./checkIfLandmarks");
exports.rulesPerPage = [
    checkIfLinkInsideLabel_1.checkIfLinkInsideLabel,
    checkIfHtmlTagHasLangAttribute_1.checkIfHtmlTagHasLangAttribute,
    checkIfImageWithoutAlt_1.checkIfImageWithoutAlt,
    checkIfButtonWithoutType_1.checkIfButtonWithoutType,
    checkIfButtonInsideALink_1.checkIfButtonInsideALink,
    checkIfLinkInsideAButton_1.checkIfLinkInsideAButton,
    checkIfMainLang_1.checkIfMainLang,
    checkIfLandmarks_1.checkIfLandmarks
];
exports.rules = [checkIfMomentDependency_1.checkIfMomentDependency, checkIfCypressAxe_1.checkIfCypressAxe];
