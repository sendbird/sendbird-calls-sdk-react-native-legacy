"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoDevicePosition = exports.SoundType = exports.RecordingType = exports.RecordingStatus = exports.AudioDeviceType = void 0;
let SoundType;
exports.SoundType = SoundType;

(function (SoundType) {
  SoundType["DIALING"] = "DIALING";
  SoundType["RINGING"] = "RINGING";
  SoundType["RECONNECTING"] = "RECONNECTING";
  SoundType["RECONNECTED"] = "RECONNECTED";
})(SoundType || (exports.SoundType = SoundType = {}));

let AudioDeviceType;
exports.AudioDeviceType = AudioDeviceType;

(function (AudioDeviceType) {
  AudioDeviceType["EARPIECE"] = "EARPIECE";
  AudioDeviceType["SPEAKERPHONE"] = "SPEAKERPHONE";
  AudioDeviceType["WIRED_HEADSET"] = "WIRED_HEADSET";
  AudioDeviceType["BLUETOOTH"] = "BLUETOOTH";
})(AudioDeviceType || (exports.AudioDeviceType = AudioDeviceType = {}));

let VideoDevicePosition;
exports.VideoDevicePosition = VideoDevicePosition;

(function (VideoDevicePosition) {
  VideoDevicePosition["FRONT"] = "FRONT";
  VideoDevicePosition["BACK"] = "BACK";
  VideoDevicePosition["UNSPECIFIED"] = "UNSPECIFIED";
})(VideoDevicePosition || (exports.VideoDevicePosition = VideoDevicePosition = {}));

let RecordingStatus;
exports.RecordingStatus = RecordingStatus;

(function (RecordingStatus) {
  RecordingStatus["NONE"] = "NONE";
  RecordingStatus["RECORDING"] = "RECORDING";
})(RecordingStatus || (exports.RecordingStatus = RecordingStatus = {}));

let RecordingType;
exports.RecordingType = RecordingType;

(function (RecordingType) {
  RecordingType["REMOTE_AUDIO_AND_VIDEO"] = "REMOTE_AUDIO_AND_VIDEO";
  RecordingType["REMOTE_AUDIO_ONLY"] = "REMOTE_AUDIO_ONLY";
  RecordingType["LOCAL_REMOTE_AUDIOS"] = "LOCAL_REMOTE_AUDIOS";
  RecordingType["LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO"] = "LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO";
  RecordingType["LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO"] = "LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO";
})(RecordingType || (exports.RecordingType = RecordingType = {}));
//# sourceMappingURL=Media.js.map