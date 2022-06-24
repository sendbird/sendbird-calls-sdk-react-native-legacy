"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GroupCallEventType = exports.DirectCallEventType = exports.DefaultEventType = exports.CallsEvent = void 0;

var _reactNative = require("react-native");

var _constants = require("../utils/constants");

var _converter = require("../utils/converter");

var _logger = require("../utils/logger");

var _JSEventEmitter = _interopRequireDefault(require("./JSEventEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MODULE_NAME = 'RNSendbirdCalls';
const NativeModule = _reactNative.NativeModules[MODULE_NAME]; //TurboModuleRegistry.get<SendbirdCallsSpec>(MODULE_NAME);

const NoopModuleProxy = new Proxy({}, {
  get() {
    throw new Error(_constants.LINKING_ERROR);
  }

});
let CallsEvent;
exports.CallsEvent = CallsEvent;

(function (CallsEvent) {
  CallsEvent["DEFAULT"] = "sendbird.call.default";
  CallsEvent["DIRECT_CALL"] = "sendbird.call.direct";
  CallsEvent["GROUP_CALL"] = "sendbird.call.group";
})(CallsEvent || (exports.CallsEvent = CallsEvent = {}));

let DefaultEventType;
exports.DefaultEventType = DefaultEventType;

(function (DefaultEventType) {
  DefaultEventType["ON_RINGING"] = "sendbird.call.default.onRinging";
})(DefaultEventType || (exports.DefaultEventType = DefaultEventType = {}));

let DirectCallEventType;
exports.DirectCallEventType = DirectCallEventType;

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
})(DirectCallEventType || (exports.DirectCallEventType = DirectCallEventType = {}));

let GroupCallEventType;
exports.GroupCallEventType = GroupCallEventType;

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
})(GroupCallEventType || (exports.GroupCallEventType = GroupCallEventType = {}));

class NativeBinder {
  get nativeModule() {
    return this._nativeModule;
  }

  get jsEventEmitter() {
    return this._jsEventEmitter;
  }

  constructor() {
    _defineProperty(this, "_nativeModule", NativeModule ?? NoopModuleProxy);

    _defineProperty(this, "_nativeEventEmitter", new _reactNative.NativeEventEmitter(this._nativeModule));

    _defineProperty(this, "_jsEventEmitter", new _JSEventEmitter.default());

    _defineProperty(this, "_supportedNativeEvents", [CallsEvent.DEFAULT, CallsEvent.DIRECT_CALL, CallsEvent.GROUP_CALL]);

    /* for reduce redundant native event listeners */
    this._supportedNativeEvents.forEach(event => {
      _logger.Logger.debug('[NativeBinder] Add native event listener:', event); // Native -> JS


      this._nativeEventEmitter.addListener(event, _ref => {
        let {
          eventType,
          data,
          additionalData
        } = _ref;

        _logger.Logger.debug('[NativeBinder] Receive events from native module: ', [event, eventType, event === CallsEvent.GROUP_CALL ? data.roomId : data.callId, additionalData && JSON.stringify(additionalData).slice(0, 30) + '...'].join(' ++ '));

        if (event === CallsEvent.DIRECT_CALL || event === CallsEvent.DEFAULT) {
          this.jsEventEmitter.emit(event, {
            type: eventType,
            data: (0, _converter.convertDirectCallPropsNTJ)(data),
            additionalData
          });
        }

        if (event === CallsEvent.GROUP_CALL) {
          this.jsEventEmitter.emit(event, {
            type: eventType,
            data: (0, _converter.convertGroupCallPropsNTJ)(data),
            additionalData
          });
        }
      });
    });
  }

  addListener(eventName, callback) {
    _logger.Logger.log('[NativeBinder] Add javascript event listener:', eventName);

    return this.jsEventEmitter.addListener(eventName, callback);
  }

}

exports.default = NativeBinder;
//# sourceMappingURL=NativeBinder.js.map