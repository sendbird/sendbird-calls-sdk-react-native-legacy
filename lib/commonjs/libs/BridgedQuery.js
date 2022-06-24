"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomListQuery = exports.DirectCallLogListQuery = exports.BridgedQuery = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BridgedQuery {
  get isLoading() {
    return this._isLoading;
  }

  get hasNext() {
    return this._hasNext;
  }

  constructor(queryKey, type, binder) {
    this.queryKey = queryKey;
    this.type = type;
    this.binder = binder;

    _defineProperty(this, "_isLoading", false);

    _defineProperty(this, "_hasNext", false);
  }

  async next() {
    this._isLoading = true;
    const {
      hasNext,
      result
    } = await this.binder.nativeModule.queryNext(this.queryKey, this.type);
    this._hasNext = hasNext;
    this._isLoading = false;
    return result;
  }

  release() {
    this.binder.nativeModule.queryRelease(this.queryKey);
  }

}

exports.BridgedQuery = BridgedQuery;

class DirectCallLogListQuery extends BridgedQuery {}

exports.DirectCallLogListQuery = DirectCallLogListQuery;

class RoomListQuery extends BridgedQuery {}

exports.RoomListQuery = RoomListQuery;
//# sourceMappingURL=BridgedQuery.js.map