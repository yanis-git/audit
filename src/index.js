"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rules_1 = require("./rules");
var commandLineArgs = require("command-line-args");
var audit = require("eco-index-audit/src/ecoindex/audit");
var puppeteer = require("puppeteer");
var path = require("path");
var optionDefinitions = [
    { name: "path", type: String },
    { name: "url", type: String, multiple: true },
];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, result, browser, page, metadata, fullPath, packageJson, _i, rules_2, rule, auditResult, devToolsResponses, devTools, requests, _a, _b, url, _c, _d, rulesPerPage_1, rule, auditResult, domain, topFive;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                options = commandLineArgs(optionDefinitions);
                result = {
                    audits: {
                        global: {}
                    }
                };
                return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _e.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _e.sent();
                metadata = {};
                try {
                    fullPath = path.resolve(options.path);
                    packageJson = require(fullPath + "/package.json");
                    metadata.packageJson = packageJson;
                }
                catch (e) { }
                _i = 0, rules_2 = rules_1.rules;
                _e.label = 3;
            case 3:
                if (!(_i < rules_2.length)) return [3 /*break*/, 6];
                rule = rules_2[_i];
                return [4 /*yield*/, rule(page, metadata)];
            case 4:
                auditResult = _e.sent();
                if (auditResult && result.audits) {
                    result.audits.global[auditResult.name] = auditResult;
                }
                _e.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                devToolsResponses = new Map();
                return [4 /*yield*/, page.target().createCDPSession()];
            case 7:
                devTools = _e.sent();
                return [4 /*yield*/, devTools.send("Network.enable")];
            case 8:
                _e.sent();
                requests = {};
                devTools.on("Network.responseReceived", function (event) {
                    requests[event.requestId] = {
                        url: event.response.url
                    };
                    devToolsResponses.set(event.requestId, event.response);
                });
                devTools.on("Network.loadingFinished", function (event) {
                    requests[event.requestId] = __assign(__assign({}, requests[event.requestId]), { size: event.encodedDataLength });
                });
                _a = 0, _b = options.url;
                _e.label = 9;
            case 9:
                if (!(_a < _b.length)) return [3 /*break*/, 16];
                url = _b[_a];
                if (result.audits) {
                    result.audits[url] = {};
                }
                _c = result;
                return [4 /*yield*/, audit(url)];
            case 10:
                _c.ecoIndex = _e.sent();
                return [4 /*yield*/, page.goto(url)];
            case 11:
                _e.sent();
                _d = 0, rulesPerPage_1 = rules_1.rulesPerPage;
                _e.label = 12;
            case 12:
                if (!(_d < rulesPerPage_1.length)) return [3 /*break*/, 15];
                rule = rulesPerPage_1[_d];
                return [4 /*yield*/, rule(page, metadata)];
            case 13:
                auditResult = _e.sent();
                if (auditResult && result.audits) {
                    result.audits[url][auditResult.name] = auditResult;
                }
                _e.label = 14;
            case 14:
                _d++;
                return [3 /*break*/, 12];
            case 15:
                _a++;
                return [3 /*break*/, 9];
            case 16:
                domain = Object.values(requests)
                    .map(function (request) { return request.url; })
                    .map(function (url) { return new URL(url).hostname; })
                    .reduce(function (acc, domain) {
                    var _a, _b;
                    if (acc[domain]) {
                        return __assign(__assign({}, acc), (_a = {}, _a[domain] = acc[domain] + 1, _a));
                    }
                    else {
                        return __assign(__assign({}, acc), (_b = {}, _b[domain] = 1, _b));
                    }
                }, {});
                if (Object.keys(domain).length > 3 && result.audits) {
                    result.audits.global["check-if-less-three-domains"] = {
                        name: "check-if-less-three-domains",
                        message: "Vous devez utiliser moins de trois domaines",
                        payload: domain
                    };
                }
                topFive = Object.values(requests)
                    .sort(function (r1, r2) { return r2.size - r1.size; })
                    .splice(0, 5);
                result.biggestRequest = topFive;
                return [4 /*yield*/, browser.close()];
            case 17:
                _e.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); })();
