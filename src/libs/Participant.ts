/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LocalParticipantMethods, ParticipantProperties, RoomListener } from '../types';
import { ControllableModuleType } from '../types';
import type NativeBinder from './NativeBinder';
import type { InternalEvents } from './Room';

export class Participant implements ParticipantProperties {
  /** @internal **/
  public static get(
    props: ParticipantProperties | null,
    _binder?: NativeBinder,
    _internalEvents?: InternalEvents<RoomListener>,
    _roomId?: string,
  ) {
    if (!props) return null;

    const localParticipant = new Participant(props);
    return localParticipant._updateInternal(props);
  }

  constructor(props: ParticipantProperties) {
    this._props = props;
  }

  protected _props: ParticipantProperties;

  private _updateInternal(props: ParticipantProperties) {
    this._props = props;
    return this;
  }

  public get participantId() {
    return this._props.participantId;
  }
  public get user() {
    return this._props.user;
  }
  public get state() {
    return this._props.state;
  }
  public get enteredAt() {
    return this._props.enteredAt;
  }
  public get exitedAt() {
    return this._props.exitedAt;
  }
  public get duration() {
    return this._props.duration;
  }
  public get isAudioEnabled() {
    return this._props.isAudioEnabled;
  }
  public get isVideoEnabled() {
    return this._props.isVideoEnabled;
  }
  public get updatedAt() {
    return this._props.updatedAt;
  }
}

export class LocalParticipant extends Participant implements LocalParticipantMethods {
  /** @internal **/
  public static get(
    props: ParticipantProperties | null,
    binder: NativeBinder,
    internalEvents: InternalEvents<RoomListener>,
    roomId: string,
  ) {
    if (!props) return null;

    return new LocalParticipant(props, binder, internalEvents, roomId);
  }

  constructor(
    props: ParticipantProperties,
    binder: NativeBinder,
    internalEvents: InternalEvents<RoomListener>,
    roomId: string,
  ) {
    super(props);
    this._binder = binder;
    this._internalEvents = internalEvents;
    this._roomId = roomId;
  }

  private _binder: NativeBinder;
  private _internalEvents: InternalEvents<RoomListener>;
  private _roomId: string;

  /**
   * Mutes the audio of the local user.
   * Will trigger {@link RoomListener.onRemoteAudioSettingsChanged} method of remote participants.
   * If the remote user changes their audio settings, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public muteMicrophone = () => {
    this._binder.nativeModule.muteMicrophone(ControllableModuleType.GROUP_CALL, this._roomId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isAudioEnabled = false;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Unmutes the audio of the local user.
   * Will trigger {@link RoomListener.onRemoteAudioSettingsChanged} method of remote participants.
   * If the remote user changes their audio settings, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public unmuteMicrophone = () => {
    this._binder.nativeModule.unmuteMicrophone(ControllableModuleType.GROUP_CALL, this._roomId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isAudioEnabled = true;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Unmutes the audio of the local user.
   * Will trigger {@link RoomListener.onRemoteVideoSettingsChanged} method of remote participants.
   * If the remote user changes their video settings, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public stopVideo = () => {
    this._binder.nativeModule.stopVideo(ControllableModuleType.GROUP_CALL, this._roomId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isVideoEnabled = false;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Unmutes the audio of the local user.
   * Will trigger {@link RoomListener.onRemoteVideoSettingsChanged} method of remote participants.
   * If the remote user changes their video settings, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  public startVideo = () => {
    this._binder.nativeModule.startVideo(ControllableModuleType.GROUP_CALL, this._roomId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isVideoEnabled = true;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Toggles the selection between the front and the back camera.
   *
   * on Android, In case of more than two cameras, the next camera will be selected.
   * If the last camera is already selected, the first one will be selected again.
   *
   * @since 1.0.0
   */
  public switchCamera = () => {
    return this._binder.nativeModule.switchCamera(ControllableModuleType.GROUP_CALL, this._roomId);
  };
}
