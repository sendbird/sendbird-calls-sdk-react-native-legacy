function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * SendbirdError class
 *
 * Used at {@link onError} in {@link RoomListener}
 *
 * @since 1.0.0
 */
export class SendbirdError extends Error {
  constructor(message, code) {
    super(message);

    _defineProperty(this, "_code", void 0);

    this.name = 'SendbirdError';
    this._code = code;
  }

  get code() {
    return this._code;
  }

}
//# sourceMappingURL=SendbirdError.js.map