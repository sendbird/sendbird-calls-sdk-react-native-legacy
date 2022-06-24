import { NativeQueryKey, NativeQueryType, Query } from '../types/Query';
import NativeBinder from './NativeBinder';
export declare class BridgedQuery<T extends NativeQueryType> implements Query {
    protected queryKey: NativeQueryKey;
    protected type: T;
    protected binder: NativeBinder;
    private _isLoading;
    private _hasNext;
    get isLoading(): boolean;
    get hasNext(): boolean;
    constructor(queryKey: NativeQueryKey, type: T, binder: NativeBinder);
    next(): Promise<(T extends NativeQueryType.DIRECT_CALL_LOG ? import("..").DirectCallLog : import("..").RoomProperties)[]>;
    release(): void;
}
export declare class DirectCallLogListQuery extends BridgedQuery<NativeQueryType.DIRECT_CALL_LOG> {
}
export declare class RoomListQuery extends BridgedQuery<NativeQueryType.ROOM_LIST> {
}
