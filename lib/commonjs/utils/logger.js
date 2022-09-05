"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = exports.Logger = void 0;

var _reactNative = require("react-native");

const LogLevelEnum = {
  'none': 0,
  'error': 1,
  'warning': 2,
  'info': 3
};

/** @internal **/
const getLogger = function () {
  let lv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'none';
  let title = arguments.length > 1 ? arguments[1] : undefined;

  let _logLevel = __DEV__ ? lv : 'none';

  let _title = title ?? `[Calls_${_reactNative.Platform.OS}]`;

  return {
    setTitle(title) {
      _title = title;
    },

    setLogLevel(lv) {
      if (__DEV__) _logLevel = lv;
    },

    getLogLevel() {
      return _logLevel;
    },

    error() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.error) return LogLevelEnum.none;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.error(_title, ...args);
      return LogLevelEnum[_logLevel];
    },

    warn() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.warning) return LogLevelEnum.none;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      console.warn(_title, ...args);
      return LogLevelEnum[_logLevel];
    },

    info() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.info) return LogLevelEnum.none;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      console.info(_title, ...args);
      return LogLevelEnum[_logLevel];
    }

  };
};

exports.getLogger = getLogger;
const Logger = getLogger();
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map