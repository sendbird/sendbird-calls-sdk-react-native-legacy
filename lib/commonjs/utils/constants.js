"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINKING_ERROR = void 0;

var _reactNative = require("react-native");

const LINKING_ERROR = "The package '@sendbird/calls-react-native' doesn't seem to be linked. Make sure: \n" + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
exports.LINKING_ERROR = LINKING_ERROR;
//# sourceMappingURL=constants.js.map