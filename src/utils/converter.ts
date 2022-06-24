import type { AsNativeInterface, DirectCallProperties, RoomProperties } from '../types';

// NTJ - Native To Javascript
// JTN - Javascript To Native

export function convertDirectCallPropsNTJ(data: AsNativeInterface<DirectCallProperties>): DirectCallProperties {
  return {
    ...data,
    ios_callUUID: data.callUUID,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice,
  };
}

export function convertGroupCallPropsNTJ(data: AsNativeInterface<RoomProperties>): RoomProperties {
  return {
    ...data,
    android_availableAudioDevices: data.availableAudioDevices,
    android_currentAudioDevice: data.currentAudioDevice,
  };
}
