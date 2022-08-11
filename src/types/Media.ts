import type { AVAudioSessionPort, RouteChangeReason } from './Platform';

export interface BaseVideoViewProps {
  android_zOrderMediaOverlay?: boolean;
  resizeMode?: 'contain' | 'cover' | 'center';
  mirror?: boolean;
}

export enum SoundType {
  DIALING = 'DIALING',
  RINGING = 'RINGING',
  RECONNECTING = 'RECONNECTING',
  RECONNECTED = 'RECONNECTED',
}

export enum AudioDeviceType {
  EARPIECE = 'EARPIECE',
  SPEAKERPHONE = 'SPEAKERPHONE',
  WIRED_HEADSET = 'WIRED_HEADSET',
  BLUETOOTH = 'BLUETOOTH',
}

export enum VideoDevicePosition {
  FRONT = 'FRONT',
  BACK = 'BACK',
  UNSPECIFIED = 'UNSPECIFIED',
}

export enum RecordingStatus {
  NONE = 'NONE',
  RECORDING = 'RECORDING',
}

export enum RecordingType {
  /** An option to record the video and audio of the remote user */
  REMOTE_AUDIO_AND_VIDEO = 'REMOTE_AUDIO_AND_VIDEO',

  /** An option to record the audio of the remote user. */
  REMOTE_AUDIO_ONLY = 'REMOTE_AUDIO_ONLY',

  /** An option to record both audios of the local and remote users. */
  LOCAL_REMOTE_AUDIOS = 'LOCAL_REMOTE_AUDIOS',

  /** An option to record both audios of the local and remote users, and the video of the remote user. */
  LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO = 'LOCAL_AUDIO_REMOTE_AUDIO_AND_VIDEO',

  /** An option to record both audios of the local and remote users, and the video of the local user. */
  LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO = 'LOCAL_AUDIO_AND_VIDEO_REMOTE_AUDIO',
}

export type AudioDevice = AudioDeviceType;
export interface VideoDevice {
  /**
   * device id
   * @android deviceName
   * @ios uniqueId
   */
  deviceId: string;
  position: VideoDevicePosition;
}

export type RecordingOptions = {
  recordingType: RecordingType;
  /** Used to specify the base directory path of where the recorded file will be saved **/
  directoryPath: string;
  // TODO: implement default fileName generator for
  /** Used to specify a name of the recorded file. If unspecified, it will be saved as `{type}_{callId}_{timestamp}`. **/
  fileName?: string;
};

export type Port = {
  type: AVAudioSessionPort;
  name: string;
};
export type AudioDeviceRoute = {
  inputs: Port[];
  outputs: Port[];
};

export type AudioDeviceChangedInfo =
  | {
      platform: 'android';
      data: {
        currentAudioDevice: AudioDevice | null;
        availableAudioDevices: AudioDevice[] | null;
      };
    }
  | {
      platform: 'ios';
      data: {
        reason: RouteChangeReason;
        currentRoute: AudioDeviceRoute;
        previousRoute: AudioDeviceRoute;
      };
    };
