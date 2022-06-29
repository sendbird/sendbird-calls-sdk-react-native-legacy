export let SoundType;

(function (SoundType) {
  SoundType["DIALING"] = "DIALING";
  SoundType["RINGING"] = "RINGING";
  SoundType["RECONNECTING"] = "RECONNECTING";
  SoundType["RECONNECTED"] = "RECONNECTED";
})(SoundType || (SoundType = {}));

export let AudioDeviceType;

(function (AudioDeviceType) {
  AudioDeviceType["EARPIECE"] = "EARPIECE";
  AudioDeviceType["SPEAKERPHONE"] = "SPEAKERPHONE";
  AudioDeviceType["WIRED_HEADSET"] = "WIRED_HEADSET";
  AudioDeviceType["BLUETOOTH"] = "BLUETOOTH";
})(AudioDeviceType || (AudioDeviceType = {}));

export let VideoDevicePosition;

(function (VideoDevicePosition) {
  VideoDevicePosition["FRONT"] = "FRONT";
  VideoDevicePosition["BACK"] = "BACK";
  VideoDevicePosition["UNSPECIFIED"] = "UNSPECIFIED";
})(VideoDevicePosition || (VideoDevicePosition = {}));

export let RecordingStatus;

(function (RecordingStatus) {
  RecordingStatus["NONE"] = "NONE";
  RecordingStatus["RECORDING"] = "RECORDING";
})(RecordingStatus || (RecordingStatus = {}));

export let RecordingType;

(function (RecordingType) {
  RecordingType["REMOTE_AUDIO_AND_VIDEO"] = "REMOTE_AUDIO_AND_VIDEO";
  RecordingType["REMOTE_AUDIO_ONLY"] = "REMOTE_AUDIO_ONLY";
  RecordingType["LOCAL_REMOTE_AUDIOS"] = "LOCAL_REMOTE_AUDIOS";
  RecordingType["LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO"] = "LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO";
  RecordingType["LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO"] = "LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO";
})(RecordingType || (RecordingType = {}));
//# sourceMappingURL=Media.js.map