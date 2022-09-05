import type { DirectCallEndResult, DirectCallUserRole, RoomState, RoomType } from '../types';

export enum NativeQueryType {
  DIRECT_CALL_LOG = 'DIRECT_CALL_LOG',
  ROOM_LIST = 'ROOM_LIST',
}

export interface Query {
  release(): void;
  next(): Promise<unknown>;
  hasNext: boolean;
  isLoading: boolean;
}

export type NativeQueryKey = `native#${string}`;

export type NativeQueryCreator<QueryParams> = {
  (params: QueryParams): Promise<NativeQueryKey>;
};

export type DirectCallLogQueryParams = {
  limit?: number;
  myRole?: DirectCallUserRole | 'ALL';
  endResults?: DirectCallEndResult[];
};

export type RoomListQueryParams = {
  limit?: number;
  createdByUserIds?: string[];
  roomIds?: string[];
  state?: RoomState;
  type?: RoomType;
  createdAt?: Range;
  currentParticipantCount?: Range;
};

export type Range = {
  upperBound?: number;
  lowerBound?: number;
};

export type NativeQueryResult<T> = Promise<{ hasNext: boolean; result: T[] }>;
