import type { DirectCallEndResult, DirectCallUserRole, RoomState, RoomType } from '../types';
export declare enum NativeQueryType {
    DIRECT_CALL_LOG = "DIRECT_CALL_LOG",
    ROOM_LIST = "ROOM_LIST"
}
export interface Query {
    release(): void;
    next(): Promise<unknown>;
    hasNext: boolean;
    isLoading: boolean;
}
export declare type NativeQueryKey = `native#${string}`;
export declare type NativeQueryCreator<QueryParams> = {
    (params: QueryParams): Promise<NativeQueryKey>;
};
export declare type DirectCallLogQueryParams = {
    limit?: number;
    myRole?: DirectCallUserRole | 'ALL';
    endResults?: DirectCallEndResult[];
};
export declare type RoomListQueryParams = {
    limit?: number;
    createdByUserIds?: string[];
    roomIds?: string[];
    state?: RoomState;
    type?: RoomType;
    createdAt?: Range;
    currentParticipantCount?: Range;
};
export declare type Range = {
    upperBound?: number;
    lowerBound?: number;
};
export declare type NativeQueryResult<T> = Promise<{
    hasNext: boolean;
    result: T[];
}>;
