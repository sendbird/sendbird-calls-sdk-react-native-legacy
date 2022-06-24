// NTJ - Native To Javascript
// JTN - Javascript To Native
export function convertDirectCallPropsNTJ(data) {
  return { ...data,
    ios_callUUID: data.callUUID,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice
  };
}
export function convertGroupCallPropsNTJ(data) {
  return { ...data,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice
  };
}
//# sourceMappingURL=converter.js.map