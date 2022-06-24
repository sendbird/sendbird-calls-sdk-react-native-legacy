/** DirectCall */
export let DirectCallEndResult;

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
})(DirectCallEndResult || (DirectCallEndResult = {}));

export let DirectCallUserRole;

(function (DirectCallUserRole) {
  DirectCallUserRole["CALLER"] = "CALLER";
  DirectCallUserRole["CALLEE"] = "CALLEE";
})(DirectCallUserRole || (DirectCallUserRole = {}));
//# sourceMappingURL=Call.js.map