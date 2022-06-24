import type { AudioDevice } from './Media';
import type { NativeGroupCallModule } from './NativeModule';
import { JSMediaDeviceControl } from './NativeModule';
import type { ParticipantProperties } from './Participant';
import type { AsJSGroupCall, AsJSInterface } from './index';

export interface RoomListener {
  /**
   * Called when the update properties internally on Javascript side
   *
   * @platform Javascript
   * @since 1.0.0
   */
  onPropertyUpdatedManually: (room: RoomProperties) => void;

  /**
   * Called when GroupCall Room is deleted.
   *
   * @since 1.0.0
   */
  onDeleted: () => void;

  /**
   * Called when a participant stream is lost due to reconnection failure.
   *
   * @since 1.0.0
   */
  onError: (e: Error, participant?: ParticipantProperties) => void;

  /**
   * Called when a remote participant entered the room.
   *
   * @since 1.0.0
   */
  onRemoteParticipantEntered: (participant: ParticipantProperties) => void;

  /**
   * Called when a remote participant exited the room.
   *
   * @since 1.0.0
   */
  onRemoteParticipantExited: (participant: ParticipantProperties) => void;

  /**
   * Called when a remote participant starts to send a stream.
   *
   * @since 1.0.0
   */
  onRemoteParticipantStreamStarted: (participant: ParticipantProperties) => void;

  /**
   * Called when the audio device has been changed.
   *
   * @since 1.0.0
   */
  onAudioDeviceChanged: (currentAudioDevice: AudioDevice | null, availableAudioDevices: AudioDevice[]) => void;

  /**
   * Called when a remote participant changed video settings.
   *
   * @since 1.0.0
   */
  onRemoteVideoSettingsChanged: (participant: ParticipantProperties) => void;

  /**
   * Called when a remote participant changed audio settings.
   *
   * @since 1.0.0
   */
  onRemoteAudioSettingsChanged: (participant: ParticipantProperties) => void;

  /**
   *  Called when the custom items of the call are updated.
   *
   * @since 1.0.0
   */
  onCustomItemsUpdated: (updatedKeys: string[]) => void;

  /**
   * Called when the custom items of the call are deleted.
   *
   * @since 1.0.0
   */
  onCustomItemsDeleted: (deletedKeys: string[]) => void;
}

export interface RoomProperties {
  /**
   * Gets room ID.
   *
   * @since 1.0.0
   */
  roomId: string;

  /**
   * Gets state of room.
   *
   * @since 1.0.0
   */
  state: RoomState;

  /**
   * Gets type of room.
   *
   * @since 1.0.0
   */
  type: RoomType;

  /**
   * Gets custom items of this {@link Room} instance.
   *
   * @since 1.0.0
   */
  customItems: Record<string, string>;

  /**
   * Gets a list of participants who entered the room.
   *
   * @since 1.0.0
   */
  participants: ParticipantProperties[];

  /**
   * Gets the local participant.
   *
   * @since 1.0.0
   */
  localParticipant: ParticipantProperties | null;

  /**
   * Gets a list of remote participants who entered the room.
   *
   * @since 1.0.0
   */
  remoteParticipants: ParticipantProperties[];

  /**
   * Gets available audio devices.
   *
   * @platform Android
   * @since 1.0.0
   */
  android_availableAudioDevices: AudioDevice[];

  /**
   * Gets current audio device.
   *
   * @platform Android
   * @since 1.0.0
   */
  android_currentAudioDevice: AudioDevice | null;

  /**
   * Gets createdAt that is a timestamp of creating the room.
   *
   * @since 1.0.0
   */
  createdAt: number;

  /**
   * Gets user ID created the room.
   *
   * @since 1.0.0
   */
  createdBy: string;
}

type JSGroupCallModule = AsJSGroupCall<NativeGroupCallModule>;
type JSGroupCallMediaDeviceControl = AsJSInterface<
  Pick<JSMediaDeviceControl, 'selectAudioDevice'>,
  'android',
  'selectAudioDevice'
>;

export interface GroupCallMethods extends JSGroupCallModule, JSGroupCallMediaDeviceControl {
  addListener(listener: Partial<RoomListener>): () => void;
}

export enum RoomType {
  SMALL_ROOM_FOR_VIDEO = 'SMALL_ROOM_FOR_VIDEO',
  LARGE_ROOM_FOR_AUDIO_ONLY = 'LARGE_ROOM_FOR_AUDIO_ONLY',
}

export enum RoomState {
  OPEN = 'OPEN',
  DELETED = 'DELETED',
}

export type EnterParams = {
  /** @default true */
  audioEnabled?: boolean;
  /** @default true */
  videoEnabled?: boolean;
};
