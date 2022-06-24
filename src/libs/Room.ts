import type { AudioDevice, EnterParams, GroupCallMethods, RoomListener, RoomProperties } from '../types';
import { ControllableModuleType } from '../types';
import { Logger } from '../utils/logger';
import { LocalParticipant } from './LocalParticipant';
import type NativeBinder from './NativeBinder';
import { CallsEvent, GroupCallEventType } from './NativeBinder';
import { SendbirdError } from './SendbirdError';

export interface InternalEvents<T> {
  pool: Partial<T>[];
  emit: (event: keyof T, ...args: unknown[]) => void;
  add: (listener: Partial<T>) => () => void;
}

export class Room implements RoomProperties, GroupCallMethods {
  /** @internal **/
  private static pool: Record<string, Room> = {};

  /** @internal **/
  public static poolRelease() {
    Room.pool = {};
  }

  /** @internal **/
  public static get(binder: NativeBinder, props: RoomProperties) {
    if (!Room.pool[props.roomId]) Room.pool[props.roomId] = new Room(binder, props);
    const room = Room.pool[props.roomId];
    return room._updateInternal(props);
  }

  constructor(binder: NativeBinder, props: RoomProperties) {
    this._binder = binder;
    this._props = props;
    this._localParticipant = null;
  }

  private _binder: NativeBinder;
  private _props: RoomProperties;
  private _localParticipant: LocalParticipant | null;
  private _internalEvents = {
    pool: [] as Partial<RoomListener>[],
    emit: (event: keyof RoomListener, ...args: unknown[]) => {
      // @ts-ignore
      this._internalEvents.pool.forEach((listener) => listener[event]?.(...args));
    },
    add: (listener: Partial<RoomListener>) => {
      this._internalEvents.pool.push(listener);
      return () => {
        const index = this._internalEvents.pool.indexOf(listener);
        if (index > -1) delete this._internalEvents.pool[index];
      };
    },
  };
  private _updateInternal(props: RoomProperties) {
    this._localParticipant = LocalParticipant.get(
      this._binder,
      this._internalEvents,
      props.localParticipant,
      this.roomId,
    );
    this._props = props;
    return this;
  }

  public get roomId() {
    return this._props.roomId;
  }
  public get state() {
    return this._props.state;
  }
  public get type() {
    return this._props.type;
  }
  public get customItems() {
    return this._props.customItems;
  }
  public get participants() {
    return this._props.participants;
  }
  public get localParticipant() {
    return this._localParticipant;
  }
  public get remoteParticipants() {
    return this._props.remoteParticipants;
  }
  public get android_availableAudioDevices() {
    return this._props.android_availableAudioDevices;
  }
  public get android_currentAudioDevice() {
    return this._props.android_currentAudioDevice;
  }
  public get createdAt() {
    return this._props.createdAt;
  }
  public get createdBy() {
    return this._props.createdBy;
  }

  /**
   * Add GroupCall Room listener.
   * supports multiple listeners.
   *
   * @since 1.0.0
   */
  public addListener = (listener: Partial<RoomListener>) => {
    Logger.debug('[GroupCall]', 'addListener', this.roomId);

    const unsubscribes: Array<() => void> = [];

    const disposeInternal = this._internalEvents.add(listener);

    const disposeNative = this._binder.addListener(CallsEvent.GROUP_CALL, ({ type, data, additionalData }) => {
      if (data.roomId !== this.roomId) return;

      Logger.debug('[GroupCall]', 'receive events ', type, data.roomId, additionalData);
      this._updateInternal(data);
      switch (type) {
        case GroupCallEventType.ON_DELETED: {
          listener.onDeleted?.();
          break;
        }
        case GroupCallEventType.ON_ERROR: {
          const error = new SendbirdError(additionalData?.errorMessage, additionalData?.errorCode);
          const participant = additionalData?.participant;
          listener.onError?.(error, participant);
          break;
        }
        case GroupCallEventType.ON_REMOTE_PARTICIPANT_ENTERED: {
          listener.onRemoteParticipantEntered?.(additionalData?.participant);
          break;
        }
        case GroupCallEventType.ON_REMOTE_PARTICIPANT_EXITED: {
          listener.onRemoteParticipantExited?.(additionalData?.participant);
          break;
        }
        case GroupCallEventType.ON_REMOTE_PARTICIPANT_STREAM_STARTED: {
          listener.onRemoteParticipantStreamStarted?.(additionalData?.participant);
          break;
        }
        case GroupCallEventType.ON_AUDIO_DEVICE_CHANGED: {
          listener.onAudioDeviceChanged?.(
            additionalData?.currentAudioDevice ?? null,
            additionalData?.availableAudioDevices ?? [],
          );
          break;
        }
        case GroupCallEventType.ON_REMOTE_VIDEO_SETTINGS_CHANGED: {
          listener.onRemoteVideoSettingsChanged?.(additionalData?.participant);
          break;
        }
        case GroupCallEventType.ON_REMOTE_AUDIO_SETTINGS_CHANGED: {
          listener.onRemoteAudioSettingsChanged?.(additionalData?.participant);
          break;
        }
        case GroupCallEventType.ON_CUSTOM_ITEMS_UPDATED: {
          listener.onCustomItemsUpdated?.(additionalData?.updatedKeys ?? []);
          break;
        }
        case GroupCallEventType.ON_CUSTOM_ITEMS_DELETED: {
          listener.onCustomItemsDeleted?.(additionalData?.deletedKeys ?? []);
          break;
        }
      }
    });

    unsubscribes.push(disposeNative, disposeInternal);
    return () => unsubscribes.forEach((fn) => fn());
  };

  /**
   * Enter the room
   * Will trigger {@link RoomListener.onRemoteParticipantEntered} method of remote participants after successfully entering the room.
   * If a remote participant entered the room, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public enter = (options: EnterParams = { audioEnabled: true, videoEnabled: true }) => {
    return this._binder.nativeModule.enter(this.roomId, options);
  };

  /**
   * Exit from the room
   * Will trigger {@link RoomListener.onRemoteParticipantExited} method of remote participants after successfully exiting the room.
   * If a remote participant exited the room, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public exit() {
    this._binder.nativeModule.exit(this.roomId);
  }

  /**
   * Selects audio device
   * Changes current audio device asynchronously.
   * Will trigger {@link RoomListener.onAudioDeviceChanged} method of the local participant after successfully changing the audio device.
   *
   * @platform Android
   * @since 1.0.0
   */
  public android_selectAudioDevice = (device: AudioDevice) => {
    return this._binder.nativeModule.selectAudioDevice(ControllableModuleType.GROUP_CALL, this.roomId, device);
  };
}
