function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */
import { NativeEventEmitter, NativeModules } from 'react-native';
import { LINKING_ERROR } from '../utils/constants';
import { convertDirectCallPropsNTJ, convertGroupCallPropsNTJ } from '../utils/converter';
import { Logger } from '../utils/logger';
import JSEventEmitter from './JSEventEmitter';
const MODULE_NAME = 'RNSendbirdCalls';
const NativeModule = NativeModules[MODULE_NAME]; //TurboModuleRegistry.get<SendbirdCallsSpec>(MODULE_NAME);

const NoopModuleProxy = new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
export let CallsEvent;

(function (CallsEvent) {
  CallsEvent["DEFAULT"] = "sendbird.call.default";
  CallsEvent["DIRECT_CALL"] = "sendbird.call.direct";
  CallsEvent["GROUP_CALL"] = "sendbird.call.group";
})(CallsEvent || (CallsEvent = {}));

export let DefaultEventType;

(function (DefaultEventType) {
  DefaultEventType["ON_RINGING"] = "sendbird.call.default.onRinging";
})(DefaultEventType || (DefaultEventType = {}));

export let DirectCallEventType;

(function (DirectCallEventType) {
  DirectCallEventType["ON_ESTABLISHED"] = "sendbird.call.direct.onEstablished";
  DirectCallEventType["ON_CONNECTED"] = "sendbird.call.direct.onConnected";
  DirectCallEventType["ON_RECONNECTING"] = "sendbird.call.direct.onReconnecting";
  DirectCallEventType["ON_RECONNECTED"] = "sendbird.call.direct.onReconnected";
  DirectCallEventType["ON_ENDED"] = "sendbird.call.direct.onEnded";
  DirectCallEventType["ON_REMOTE_AUDIO_SETTINGS_CHANGED"] = "sendbird.call.direct.onRemoteAudioSettingsChanged";
  DirectCallEventType["ON_REMOTE_VIDEO_SETTINGS_CHANGED"] = "sendbird.call.direct.onRemoteVideoSettingsChanged";
  DirectCallEventType["ON_LOCAL_VIDEO_SETTINGS_CHANGED"] = "sendbird.call.direct.onLocalVideoSettingsChanged";
  DirectCallEventType["ON_REMOTE_RECORDING_STATUS_CHANGED"] = "sendbird.call.direct.onRemoteRecordingStatusChanged";
  DirectCallEventType["ON_AUDIO_DEVICE_CHANGED"] = "sendbird.call.direct.onAudioDeviceChanged";
  DirectCallEventType["ON_CUSTOM_ITEMS_UPDATED"] = "sendbird.call.direct.onCustomItemsUpdated";
  DirectCallEventType["ON_CUSTOM_ITEMS_DELETED"] = "sendbird.call.direct.onCustomItemsDeleted";
  DirectCallEventType["ON_USER_HOLD_STATUS_CHANGED"] = "sendbird.call.direct.onUserHoldStatusChanged";
})(DirectCallEventType || (DirectCallEventType = {}));

export let GroupCallEventType;

(function (GroupCallEventType) {
  GroupCallEventType["ON_DELETED"] = "sendbird.call.group.onDeleted";
  GroupCallEventType["ON_ERROR"] = "sendbird.call.group.onError";
  GroupCallEventType["ON_REMOTE_PARTICIPANT_ENTERED"] = "sendbird.call.group.onRemoteParticipantEntered";
  GroupCallEventType["ON_REMOTE_PARTICIPANT_EXITED"] = "sendbird.call.group.onRemoteParticipantExited";
  GroupCallEventType["ON_REMOTE_PARTICIPANT_STREAM_STARTED"] = "sendbird.call.group.onRemoteParticipantStreamStarted";
  GroupCallEventType["ON_AUDIO_DEVICE_CHANGED"] = "sendbird.call.group.onAudioDeviceChanged";
  GroupCallEventType["ON_REMOTE_VIDEO_SETTINGS_CHANGED"] = "sendbird.call.group.onRemoteVideoSettingsChanged";
  GroupCallEventType["ON_REMOTE_AUDIO_SETTINGS_CHANGED"] = "sendbird.call.group.onRemoteAudioSettingsChanged";
  GroupCallEventType["ON_CUSTOM_ITEMS_UPDATED"] = "sendbird.call.group.onCustomItemsUpdated";
  GroupCallEventType["ON_CUSTOM_ITEMS_DELETED"] = "sendbird.call.group.onCustomItemsDeleted";
})(GroupCallEventType || (GroupCallEventType = {}));

export default class NativeBinder {
  get nativeModule() {
    return this._nativeModule;
  }

  get jsEventEmitter() {
    return this._jsEventEmitter;
  }

  constructor() {
    _defineProperty(this, "_nativeModule", NativeModule !== null && NativeModule !== void 0 ? NativeModule : NoopModuleProxy);

    _defineProperty(this, "_nativeEventEmitter", new NativeEventEmitter(this._nativeModule));

    _defineProperty(this, "_jsEventEmitter", new JSEventEmitter());

    _defineProperty(this, "_supportedNativeEvents", [CallsEvent.DEFAULT, CallsEvent.DIRECT_CALL, CallsEvent.GROUP_CALL]);

    /* for reduce redundant native event listeners */
    this._supportedNativeEvents.forEach(event => {
      Logger.debug('[NativeBinder] Add native event listener:', event); // Native -> JS

      this._nativeEventEmitter.addListener(event, _ref => {
        let {
          eventType,
          data,
          additionalData
        } = _ref;
        Logger.debug('[NativeBinder] Receive events from native module: ', [event, eventType, event === CallsEvent.GROUP_CALL ? data.roomId : data.callId, additionalData && JSON.stringify(additionalData).slice(0, 30) + '...'].join(' ++ '));

        if (event === CallsEvent.DIRECT_CALL || event === CallsEvent.DEFAULT) {
          this.jsEventEmitter.emit(event, {
            type: eventType,
            data: convertDirectCallPropsNTJ(data),
            additionalData
          });
        }

        if (event === CallsEvent.GROUP_CALL) {
          this.jsEventEmitter.emit(event, {
            type: eventType,
            data: convertGroupCallPropsNTJ(data),
            additionalData
          });
        }
      });
    });
  }

  addListener(eventName, callback) {
    Logger.log('[NativeBinder] Add javascript event listener:', eventName);
    return this.jsEventEmitter.addListener(eventName, callback);
  }

}
//# sourceMappingURL=NativeBinder.js.map