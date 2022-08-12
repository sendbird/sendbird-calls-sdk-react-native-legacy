import type { NativeModule, TurboModule } from 'react-native';

import { BridgedQuery } from '../libs/BridgedQuery';
import type { CallOptions, DirectCallLog, DirectCallProperties } from './Call';
import type { AudioDevice, VideoDevice } from './Media';
import { SoundType } from './Media';
import {
  DirectCallLogQueryParams,
  NativeQueryCreator,
  NativeQueryKey,
  NativeQueryResult,
  NativeQueryType,
  RoomListQueryParams,
} from './Query';
import type { EnterParams, RoomParams, RoomProperties } from './Room';
import type { User } from './User';
import type { AsJSInterface, AsJSMediaDeviceControl } from './index';

// --------------- Native interfaces ---------------

type NativeModuleInterface = NativeModule & TurboModule;

export type NativeConstants = {
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
  authenticate(userId: string, accessToken?: string | null): Promise<User>;
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

  // unregisterAllPushTokens(): Promise<void>;
  // addRecordingListener
  // removeRecordingListener
  // removeAllRecordingListeners
}

type CommonModule_AndroidSpecificKeys = 'handleFirebaseMessageData';
type CommonModule_IOSSpecificKeys = 'registerVoIPPushToken' | 'unregisterVoIPPushToken' | 'routePickerView';
export enum ControllableModuleType {
  DIRECT_CALL = 'DIRECT_CALL',
  GROUP_CALL = 'GROUP_CALL',
}

export type JSMediaDeviceControl = AsJSMediaDeviceControl<NativeMediaDeviceControl>;
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

  /** Not implemented yet belows **/
  // hold(callId:string): Promise<void>;
  // unhold(callId:string, force: boolean): Promise<void>;
  //
  // captureLocalVideoView(callId:string): Promise<string>; // capture -> tmp file path
  // captureRemoteVideoView(callId:string): Promise<string>;
  // updateCustomItems(callId:string, items: Record<string, string>): Promise<CustomItemUpdateResult>;
  // deleteAllCustomItems(callId:string): Promise<void>;
  // deleteCustomItems(callId:string, key: string[]): Promise<CustomItemUpdateResult>;
  //
  // startRecording(callId:string, options: RecordingOptions): Promise<{ recordingId: string }>;
  // stopRecording(callId:string, recordingId: string): void;
  //
  // startScreenShare(callId:string): Promise<void>;
  // stopScreenShare(callId:string): Promise<void>;
}

export interface NativeGroupCallModule {
  enter(roomId: string, options: EnterParams): Promise<void>;
  exit(roomId: string): void;
}

export interface NativeQueries {
  createDirectCallLogListQuery: NativeQueryCreator<DirectCallLogQueryParams>;
  createRoomListQuery: NativeQueryCreator<RoomListQueryParams>;
  queryNext<T extends NativeQueryType>(
    key: NativeQueryKey,
    type: T,
  ): NativeQueryResult<T extends NativeQueryType.DIRECT_CALL_LOG ? DirectCallLog : RoomProperties>;
  queryRelease(key: NativeQueryKey): void;
}

export interface SendbirdCallsNativeSpec
  extends NativeModuleInterface,
    NativeQueries,
    NativeCommonModule,
    NativeDirectCallModule,
    NativeGroupCallModule,
    NativeMediaDeviceControl {}

// --------------- Javascript interfaces ---------------

type PlatformSpecificInterface = AsJSInterface<
  AsJSInterface<NativeCommonModule, 'ios', CommonModule_IOSSpecificKeys>,
  'android',
  CommonModule_AndroidSpecificKeys
>;

export interface SendbirdCallsJavascriptSpec extends PlatformSpecificInterface {
  /** Listeners **/
  onRinging(listener: (props: DirectCallProperties) => void): void;

  /** Queries **/
  createDirectCallLogListQuery(
    params: DirectCallLogQueryParams,
  ): Promise<BridgedQuery<NativeQueryType.DIRECT_CALL_LOG>>;
  createRoomListQuery(params: RoomListQueryParams): Promise<BridgedQuery<NativeQueryType.ROOM_LIST>>;
}
