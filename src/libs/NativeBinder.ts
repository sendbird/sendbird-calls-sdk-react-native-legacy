/* eslint-disable */
import { NativeEventEmitter, NativeModules } from 'react-native';

import type { AsNativeInterface, DirectCallProperties, RoomProperties, SendbirdCallsNativeSpec } from '../types';
import { LINKING_ERROR } from '../utils/constants';
import { convertDirectCallPropsNTJ, convertGroupCallPropsNTJ } from '../utils/converter';
import { Logger } from '../utils/logger';
import JSEventEmitter from './JSEventEmitter';

const MODULE_NAME = 'RNSendbirdCalls';
const NativeModule = NativeModules[MODULE_NAME]; //TurboModuleRegistry.get<SendbirdCallsSpec>(MODULE_NAME);

const NoopModuleProxy = new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

export enum CallsEvent {
  DEFAULT = 'sendbird.call.default',
  DIRECT_CALL = 'sendbird.call.direct',
  GROUP_CALL = 'sendbird.call.group',
}

export enum DefaultEventType {
  ON_RINGING = 'sendbird.call.default.onRinging',
}

export enum DirectCallEventType {
  ON_ESTABLISHED = 'sendbird.call.direct.onEstablished',
  ON_CONNECTED = 'sendbird.call.direct.onConnected',
  ON_RECONNECTING = 'sendbird.call.direct.onReconnecting',
  ON_RECONNECTED = 'sendbird.call.direct.onReconnected',
  ON_ENDED = 'sendbird.call.direct.onEnded',
  ON_REMOTE_AUDIO_SETTINGS_CHANGED = 'sendbird.call.direct.onRemoteAudioSettingsChanged',
  ON_REMOTE_VIDEO_SETTINGS_CHANGED = 'sendbird.call.direct.onRemoteVideoSettingsChanged',
  ON_LOCAL_VIDEO_SETTINGS_CHANGED = 'sendbird.call.direct.onLocalVideoSettingsChanged',
  ON_REMOTE_RECORDING_STATUS_CHANGED = 'sendbird.call.direct.onRemoteRecordingStatusChanged',
  ON_AUDIO_DEVICE_CHANGED = 'sendbird.call.direct.onAudioDeviceChanged',
  ON_CUSTOM_ITEMS_UPDATED = 'sendbird.call.direct.onCustomItemsUpdated',
  ON_CUSTOM_ITEMS_DELETED = 'sendbird.call.direct.onCustomItemsDeleted',
  ON_USER_HOLD_STATUS_CHANGED = 'sendbird.call.direct.onUserHoldStatusChanged',
}

export enum GroupCallEventType {
  ON_DELETED = 'sendbird.call.group.onDeleted',
  ON_ERROR = 'sendbird.call.group.onError',
  ON_REMOTE_PARTICIPANT_ENTERED = 'sendbird.call.group.onRemoteParticipantEntered',
  ON_REMOTE_PARTICIPANT_EXITED = 'sendbird.call.group.onRemoteParticipantExited',
  ON_REMOTE_PARTICIPANT_STREAM_STARTED = 'sendbird.call.group.onRemoteParticipantStreamStarted',
  ON_AUDIO_DEVICE_CHANGED = 'sendbird.call.group.onAudioDeviceChanged',
  ON_REMOTE_VIDEO_SETTINGS_CHANGED = 'sendbird.call.group.onRemoteVideoSettingsChanged',
  ON_REMOTE_AUDIO_SETTINGS_CHANGED = 'sendbird.call.group.onRemoteAudioSettingsChanged',
  ON_CUSTOM_ITEMS_UPDATED = 'sendbird.call.group.onCustomItemsUpdated',
  ON_CUSTOM_ITEMS_DELETED = 'sendbird.call.group.onCustomItemsDeleted',
}

type MakeEventUnionMember<Type, Data> = {
  eventType: Type;
  data: AsNativeInterface<Data>;
  convertedData: Data;
  additionalData?: Record<string, any>;
};

type EventUnion =
  | MakeEventUnionMember<DefaultEventType, DirectCallProperties>
  | MakeEventUnionMember<DirectCallEventType, DirectCallProperties>
  | MakeEventUnionMember<GroupCallEventType, RoomProperties>;

type EventType = EventUnion['eventType'];
type ExtractData<T extends EventType, U extends EventUnion = EventUnion> = U extends { eventType: T }
  ? U['convertedData']
  : never;

export default class NativeBinder {
  private _nativeModule: SendbirdCallsNativeSpec = NativeModule ?? NoopModuleProxy;
  private _nativeEventEmitter = new NativeEventEmitter(this._nativeModule);
  private _jsEventEmitter = new JSEventEmitter();
  private _supportedNativeEvents = [CallsEvent.DEFAULT, CallsEvent.DIRECT_CALL, CallsEvent.GROUP_CALL];

  public get nativeModule() {
    return this._nativeModule;
  }
  public get jsEventEmitter() {
    return this._jsEventEmitter;
  }

  constructor() {
    /* for reduce redundant native event listeners */
    this._supportedNativeEvents.forEach((event) => {
      Logger.debug('[NativeBinder] Add native event listener:', event);

      // Native -> JS
      this._nativeEventEmitter.addListener(
        event,
        ({ eventType, data, additionalData }: Omit<EventUnion, 'convertedData'>) => {
          Logger.debug(
            '[NativeBinder] Receive events from native module: ',
            [
              event,
              eventType,
              event === CallsEvent.GROUP_CALL
                ? (data as AsNativeInterface<RoomProperties>).roomId
                : (data as AsNativeInterface<DirectCallProperties>).callId,
              additionalData && JSON.stringify(additionalData).slice(0, 30) + '...',
            ].join(' ++ '),
          );

          if (event === CallsEvent.DIRECT_CALL || event === CallsEvent.DEFAULT) {
            this.jsEventEmitter.emit(event, {
              type: eventType,
              data: convertDirectCallPropsNTJ(data as AsNativeInterface<DirectCallProperties>),
              additionalData,
            });
          }

          if (event === CallsEvent.GROUP_CALL) {
            this.jsEventEmitter.emit(event, {
              type: eventType,
              data: convertGroupCallPropsNTJ(data as AsNativeInterface<RoomProperties>),
              additionalData,
            });
          }
        },
      );
    });
  }

  public addListener(eventName: CallsEvent.DEFAULT, callback: EventCallback<DefaultEventType>): () => void;
  public addListener(eventName: CallsEvent.DIRECT_CALL, callback: EventCallback<DirectCallEventType>): () => void;
  public addListener(eventName: CallsEvent.GROUP_CALL, callback: EventCallback<GroupCallEventType>): () => void;
  public addListener(eventName: string, callback: (event: any) => void) {
    Logger.log('[NativeBinder] Add javascript event listener:', eventName);
    return this.jsEventEmitter.addListener(eventName, callback);
  }
}

type EventCallback<T extends EventType> = (data: {
  type: T;
  data: ExtractData<T>;
  additionalData?: Record<string, any>;
}) => void;
