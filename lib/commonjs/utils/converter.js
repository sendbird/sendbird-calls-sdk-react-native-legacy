"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDirectCallPropsNTJ = convertDirectCallPropsNTJ;
exports.convertGroupCallPropsNTJ = convertGroupCallPropsNTJ;

// NTJ - Native To Javascript
// JTN - Javascript To Native
function convertDirectCallPropsNTJ(data) {
  return { ...data,
    ios_callUUID: data.callUUID,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice
  };
}

function convertGroupCallPropsNTJ(data) {
  return { ...data,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice
  };
}
//# sourceMappingURL=converter.js.map