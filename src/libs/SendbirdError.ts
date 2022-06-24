export class SendbirdError extends Error {
  constructor(message: string, code: number) {
    super(message);

    this.name = 'SendbirdError';
    this._code = code;
  }

  private _code: number;

  public get code() {
    return this._code;
  }
}
