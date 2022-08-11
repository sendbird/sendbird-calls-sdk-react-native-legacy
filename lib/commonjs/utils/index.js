"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noopRoomListener = exports.noopDirectCallListener = exports.noop = void 0;

const noop = () => {
  void 0;
};

exports.noop = noop;
const noopDirectCallListener = {
  onPropertyUpdatedManually: noop,
  onAudioDeviceChanged: noop,
  onConnected: noop,
  onCustomItemsDeleted: noop,
  onCustomItemsUpdated: noop,
  onEnded: noop,
  onEstablished: noop,
  onLocalVideoSettingsChanged: noop,
  onReconnected: noop,
  onReconnecting: noop,
  onRemoteAudioSettingsChanged: noop,
  onRemoteRecordingStatusChanged: noop,
  onRemoteVideoSettingsChanged: noop,
  onUserHoldStatusChanged: noop
};
exports.noopDirectCallListener = noopDirectCallListener;
const noopRoomListener = {
  onPropertyUpdatedManually: noop,
  onDeleted: noop,
  onError: noop,
  onRemoteParticipantEntered: noop,
  onRemoteParticipantExited: noop,
  onRemoteParticipantStreamStarted: noop,
  onAudioDeviceChanged: noop,
  onRemoteVideoSettingsChanged: noop,
  onRemoteAudioSettingsChanged: noop,
  onCustomItemsUpdated: noop,
  onCustomItemsDeleted: noop
};
exports.noopRoomListener = noopRoomListener;
//# sourceMappingURL=index.js.map