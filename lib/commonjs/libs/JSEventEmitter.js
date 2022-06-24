"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("../utils/logger");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let val = 0;

function createUniqueKey() {
  return val++;
}

class JSEventEmitter {
  constructor() {
    _defineProperty(this, "eventPool", {});
  }

  getListenerPool(event) {
    if (!this.eventPool[event]) this.eventPool[event] = {};
    return this.eventPool[event];
  }

  addListener(event, listener) {
    const uniqKey = createUniqueKey();
    const listenerPool = this.getListenerPool(event);
    listenerPool[uniqKey] = listener;
    return () => {
      delete listenerPool[uniqKey];
    };
  }

  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    setTimeout(() => {
      const listenerPool = this.getListenerPool(event);
      const listeners = Object.values(listenerPool);
      listeners.forEach(listener => {
        try {
          listener(...args);
        } catch (e) {
          _logger.Logger.warn('[JSEventEmitter]', e);
        }
      });
    }, 0);
  }

}

exports.default = JSEventEmitter;
//# sourceMappingURL=JSEventEmitter.js.map