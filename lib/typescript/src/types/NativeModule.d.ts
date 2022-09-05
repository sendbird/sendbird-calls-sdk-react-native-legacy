import type { NativeModule, TurboModule } from 'react-native';
import { BridgedQuery } from '../libs/BridgedQuery';
import type { CallOptions, DirectCallLog, DirectCallProperties, SendbirdCallListener } from './Call';
import type { AudioDevice, VideoDevice } from './Media';
import { SoundType } from './Media';
import { DirectCallLogQueryParams, NativeQueryCreator, NativeQueryKey, NativeQueryResult, NativeQueryType, RoomListQueryParams } from './Query';
import type { EnterParams, RoomParams, RoomProperties } from './Room';
import type { AuthenticateParams, User } from './User';
import type { AsJSInterface, AsJSMediaDeviceControl } from './index';
declare type NativeModuleInterface = NativeModule & TurboModule;
export declare type NativeConstants = {
    NATIVE_SDK_VERSION: string;
};
export interface NativeCommonModule {
    applicationId: string;
    currentUser: User | null;
    addDirectCallSound(type: SoundType, fileName: string): void;
    removeDirectCallSound(type: SoundType): void;
    setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled: boolean): void;
    getCurrentUser(): Promise<User | null>;
    getOngoingCalls(): Promise<DirectCallProperties[]>;
    getDirectCall(callId: string): Promise<DirectCallProperties>;
    initialize(appId: string): boolean;
    authenticate(authParams: AuthenticateParams): Promise<User>;
    deauthenticate(): Promise<void>;
    registerPushToken(token: string, unique?: boolean): Promise<void>;
    unregisterPushToken(token: string): Promise<void>;
    dial(calleeUserId: string, isVideoCall: boolean, options: CallOptions): Promise<DirectCallProperties>;
    createRoom(roomParams: RoomParams): Promise<RoomProperties>;
    fetchRoomById(roomId: string): Promise<RoomProperties>;
    getCachedRoomById(roomId: string): Promise<RoomProperties | null>;
    /** @platform Android **/
    handleFirebaseMessageData(data: Record<string, string>): void;
    /** @platform iOS **/
    registerVoIPPushToken(token: string, unique?: boolean): Promise<void>;
    /** @platform iOS **/
    unregisterVoIPPushToken(token: string): Promise<void>;
    /** @platform iOS **/
    routePickerView(): void;
}
declare type CommonModule_AndroidSpecificKeys = 'handleFirebaseMessageData';
declare type CommonModule_IOSSpecificKeys = 'registerVoIPPushToken' | 'unregisterVoIPPushToken' | 'routePickerView';
export declare enum ControllableModuleType {
    DIRECT_CALL = "DIRECT_CALL",
    GROUP_CALL = "GROUP_CALL"
}
export declare type JSMediaDeviceControl = AsJSMediaDeviceControl<NativeMediaDeviceControl>;
export interface NativeMediaDeviceControl {
    muteMicrophone(type: ControllableModuleType, identifier: string): void;
    unmuteMicrophone(type: ControllableModuleType, identifier: string): void;
    stopVideo(type: ControllableModuleType, identifier: string): void;
    startVideo(type: ControllableModuleType, identifier: string): void;
    switchCamera(type: ControllableModuleType, identifier: string): Promise<void>;
    selectVideoDevice(type: ControllableModuleType, identifier: string, device: VideoDevice): Promise<void>;
    /** @platform Android **/
    selectAudioDevice(type: ControllableModuleType, identifier: string, device: AudioDevice): Promise<void>;
}
export interface NativeDirectCallModule {
    accept(callId: string, options: CallOptions, holdActiveCall: boolean): Promise<void>;
    end(callId: string): Promise<void>;
    updateLocalVideoView(callId: string, videoViewId: number): void;
    updateRemoteVideoView(callId: string, videoViewId: number): void;
}
export interface NativeGroupCallModule {
    enter(roomId: string, options: EnterParams): Promise<void>;
    exit(roomId: string): void;
}
export interface NativeQueries {
    createDirectCallLogListQuery: NativeQueryCreator<DirectCallLogQueryParams>;
    createRoomListQuery: NativeQueryCreator<RoomListQueryParams>;
    queryNext<T extends NativeQueryType>(key: NativeQueryKey, type: T): NativeQueryResult<T extends NativeQueryType.DIRECT_CALL_LOG ? DirectCallLog : RoomProperties>;
    queryRelease(key: NativeQueryKey): void;
}
export interface SendbirdCallsNativeSpec extends NativeModuleInterface, NativeQueries, NativeCommonModule, NativeDirectCallModule, NativeGroupCallModule, NativeMediaDeviceControl {
}
declare type PlatformSpecificInterface = AsJSInterface<AsJSInterface<NativeCommonModule, 'ios', CommonModule_IOSSpecificKeys>, 'android', CommonModule_AndroidSpecificKeys>;
export interface SendbirdCallsJavascriptSpec extends PlatformSpecificInterface {
    /** Listeners **/
    setListener(listener: SendbirdCallListener): void;
    /** Queries **/
    createDirectCallLogListQuery(params: DirectCallLogQueryParams): Promise<BridgedQuery<NativeQueryType.DIRECT_CALL_LOG>>;
    createRoomListQuery(params: RoomListQueryParams): Promise<BridgedQuery<NativeQueryType.ROOM_LIST>>;
}
export {};
