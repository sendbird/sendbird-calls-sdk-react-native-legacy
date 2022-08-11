/**
 * SendbirdError class
 *
 * Used at {@link onError} in {@link RoomListener}
 *
 * @since 1.0.0
 */
export declare class SendbirdError extends Error {
    constructor(message: string, code: number);
    private _code;
    get code(): number;
}
