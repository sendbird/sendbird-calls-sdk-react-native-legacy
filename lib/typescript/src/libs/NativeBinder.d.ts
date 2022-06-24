import type { AsNativeInterface, DirectCallProperties, RoomProperties, SendbirdCallsNativeSpec } from '../types';
import JSEventEmitter from './JSEventEmitter';
export declare enum CallsEvent {
    DEFAULT = "sendbird.call.default",
    DIRECT_CALL = "sendbird.call.direct",
    GROUP_CALL = "sendbird.call.group"
}
export declare enum DefaultEventType {
    ON_RINGING = "sendbird.call.default.onRinging"
}
export declare enum DirectCallEventType {
    ON_ESTABLISHED = "sendbird.call.direct.onEstablished",
    ON_CONNECTED = "sendbird.call.direct.onConnected",
    ON_RECONNECTING = "sendbird.call.direct.onReconnecting",
    ON_RECONNECTED = "sendbird.call.direct.onReconnected",
    ON_ENDED = "sendbird.call.direct.onEnded",
    ON_REMOTE_AUDIO_SETTINGS_CHANGED = "sendbird.call.direct.onRemoteAudioSettingsChanged",
    ON_REMOTE_VIDEO_SETTINGS_CHANGED = "sendbird.call.direct.onRemoteVideoSettingsChanged",
    ON_LOCAL_VIDEO_SETTINGS_CHANGED = "sendbird.call.direct.onLocalVideoSettingsChanged",
    ON_REMOTE_RECORDING_STATUS_CHANGED = "sendbird.call.direct.onRemoteRecordingStatusChanged",
    ON_AUDIO_DEVICE_CHANGED = "sendbird.call.direct.onAudioDeviceChanged",
    ON_CUSTOM_ITEMS_UPDATED = "sendbird.call.direct.onCustomItemsUpdated",
    ON_CUSTOM_ITEMS_DELETED = "sendbird.call.direct.onCustomItemsDeleted",
    ON_USER_HOLD_STATUS_CHANGED = "sendbird.call.direct.onUserHoldStatusChanged"
}
export declare enum GroupCallEventType {
    ON_DELETED = "sendbird.call.group.onDeleted",
    ON_ERROR = "sendbird.call.group.onError",
    ON_REMOTE_PARTICIPANT_ENTERED = "sendbird.call.group.onRemoteParticipantEntered",
    ON_REMOTE_PARTICIPANT_EXITED = "sendbird.call.group.onRemoteParticipantExited",
    ON_REMOTE_PARTICIPANT_STREAM_STARTED = "sendbird.call.group.onRemoteParticipantStreamStarted",
    ON_AUDIO_DEVICE_CHANGED = "sendbird.call.group.onAudioDeviceChanged",
    ON_REMOTE_VIDEO_SETTINGS_CHANGED = "sendbird.call.group.onRemoteVideoSettingsChanged",
    ON_REMOTE_AUDIO_SETTINGS_CHANGED = "sendbird.call.group.onRemoteAudioSettingsChanged",
    ON_CUSTOM_ITEMS_UPDATED = "sendbird.call.group.onCustomItemsUpdated",
    ON_CUSTOM_ITEMS_DELETED = "sendbird.call.group.onCustomItemsDeleted"
}
declare type MakeEventUnionMember<Type, Data> = {
    eventType: Type;
    data: AsNativeInterface<Data>;
    convertedData: Data;
    additionalData?: Record<string, any>;
};
declare type EventUnion = MakeEventUnionMember<DefaultEventType, DirectCallProperties> | MakeEventUnionMember<DirectCallEventType, DirectCallProperties> | MakeEventUnionMember<GroupCallEventType, RoomProperties>;
declare type EventType = EventUnion['eventType'];
declare type ExtractData<T extends EventType, U extends EventUnion = EventUnion> = U extends {
    eventType: T;
} ? U['convertedData'] : never;
export default class NativeBinder {
    private _nativeModule;
    private _nativeEventEmitter;
    private _jsEventEmitter;
    private _supportedNativeEvents;
    get nativeModule(): SendbirdCallsNativeSpec;
    get jsEventEmitter(): JSEventEmitter;
    constructor();
    addListener(eventName: CallsEvent.DEFAULT, callback: EventCallback<DefaultEventType>): () => void;
    addListener(eventName: CallsEvent.DIRECT_CALL, callback: EventCallback<DirectCallEventType>): () => void;
    addListener(eventName: CallsEvent.GROUP_CALL, callback: EventCallback<GroupCallEventType>): () => void;
}
declare type EventCallback<T extends EventType> = (data: {
    type: T;
    data: ExtractData<T>;
    additionalData?: Record<string, any>;
}) => void;
export {};
