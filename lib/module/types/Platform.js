// NOTE: This file must follow the native-side convention.

/**
 * @platform iOS
 * @description AVAudioSession.RouteChangeReason {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/routechangereason}
 */
export let RouteChangeReason;
/**
 * @platform iOS
 * @description AVAudioSession.Port {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/port}
 */

(function (RouteChangeReason) {
  RouteChangeReason[RouteChangeReason["unknown"] = 0] = "unknown";
  RouteChangeReason[RouteChangeReason["newDeviceAvailable"] = 1] = "newDeviceAvailable";
  RouteChangeReason[RouteChangeReason["oldDeviceUnavailable"] = 2] = "oldDeviceUnavailable";
  RouteChangeReason[RouteChangeReason["categoryChange"] = 3] = "categoryChange";
  RouteChangeReason[RouteChangeReason["override"] = 4] = "override";
  RouteChangeReason[RouteChangeReason["wakeFromSleep"] = 5] = "wakeFromSleep";
  RouteChangeReason[RouteChangeReason["noSuitableRouteForCategory"] = 6] = "noSuitableRouteForCategory";
  RouteChangeReason[RouteChangeReason["routeConfigurationChange"] = 7] = "routeConfigurationChange";
})(RouteChangeReason || (RouteChangeReason = {}));

export let AVAudioSessionPort;

(function (AVAudioSessionPort) {
  AVAudioSessionPort["lineIn"] = "lineIn";
  AVAudioSessionPort["builtInMic"] = "builtInMic";
  AVAudioSessionPort["headsetMic"] = "headsetMic";
  AVAudioSessionPort["lineOut"] = "lineOut";
  AVAudioSessionPort["headphones"] = "headphones";
  AVAudioSessionPort["bluetoothA2DP"] = "bluetoothA2DP";
  AVAudioSessionPort["builtInReceiver"] = "builtInReceiver";
  AVAudioSessionPort["builtInSpeaker"] = "builtInSpeaker";
  AVAudioSessionPort["HDMI"] = "HDMI";
  AVAudioSessionPort["airPlay"] = "airPlay";
  AVAudioSessionPort["bluetoothLE"] = "bluetoothLE";
  AVAudioSessionPort["bluetoothHFP"] = "bluetoothHFP";
  AVAudioSessionPort["usbAudio"] = "usbAudio";
  AVAudioSessionPort["carAudio"] = "carAudio";
  AVAudioSessionPort["virtual"] = "virtual";
  AVAudioSessionPort["PCI"] = "PCI";
  AVAudioSessionPort["fireWire"] = "fireWire";
  AVAudioSessionPort["displayPort"] = "displayPort";
  AVAudioSessionPort["AVB"] = "AVB";
  AVAudioSessionPort["thunderbolt"] = "thunderbolt";
})(AVAudioSessionPort || (AVAudioSessionPort = {}));
//# sourceMappingURL=Platform.js.map