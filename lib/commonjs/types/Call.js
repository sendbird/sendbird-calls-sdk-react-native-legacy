"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectCallUserRole = exports.DirectCallEndResult = void 0;

/** DirectCall */
let DirectCallEndResult;
exports.DirectCallEndResult = DirectCallEndResult;

(function (DirectCallEndResult) {
  DirectCallEndResult["NONE"] = "NONE";
  DirectCallEndResult["COMPLETED"] = "COMPLETED";
  DirectCallEndResult["CANCELED"] = "CANCELED";
  DirectCallEndResult["DECLINED"] = "DECLINED";
  DirectCallEndResult["OTHER_DEVICE_ACCEPTED"] = "OTHER_DEVICE_ACCEPTED";
  DirectCallEndResult["TIMED_OUT"] = "TIMED_OUT";
  DirectCallEndResult["CONNECTION_LOST"] = "CONNECTION_LOST";
  DirectCallEndResult["NO_ANSWER"] = "NO_ANSWER";
  DirectCallEndResult["DIAL_FAILED"] = "DIAL_FAILED";
  DirectCallEndResult["ACCEPT_FAILED"] = "ACCEPT_FAILED";
  DirectCallEndResult["UNKNOWN"] = "UNKNOWN";
})(DirectCallEndResult || (exports.DirectCallEndResult = DirectCallEndResult = {}));

let DirectCallUserRole;
exports.DirectCallUserRole = DirectCallUserRole;

(function (DirectCallUserRole) {
  DirectCallUserRole["CALLER"] = "CALLER";
  DirectCallUserRole["CALLEE"] = "CALLEE";
})(DirectCallUserRole || (exports.DirectCallUserRole = DirectCallUserRole = {}));
//# sourceMappingURL=Call.js.map