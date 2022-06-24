function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class BridgedQuery {
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
export class DirectCallLogListQuery extends BridgedQuery {}
export class RoomListQuery extends BridgedQuery {}
//# sourceMappingURL=BridgedQuery.js.map