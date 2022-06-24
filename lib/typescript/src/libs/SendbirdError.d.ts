export declare class SendbirdError extends Error {
    constructor(message: string, code: number);
    private _code;
    get code(): number;
}
