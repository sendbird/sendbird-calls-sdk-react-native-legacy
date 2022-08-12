function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ControllableModuleType } from '../types';
export class LocalParticipant {
  /** @internal **/
  static get(binder, internalEvents, props, roomId) {
    if (!props) return null;
    const localParticipant = new LocalParticipant(binder, internalEvents, props, roomId);
    return localParticipant._updateInternal(props);
  }

  constructor(binder, internalEvents, props, roomId) {
    _defineProperty(this, "_binder", void 0);

    _defineProperty(this, "_props", void 0);

    _defineProperty(this, "_internalEvents", void 0);

    _defineProperty(this, "_roomId", void 0);

    _defineProperty(this, "muteMicrophone", () => {
      this._binder.nativeModule.muteMicrophone(ControllableModuleType.GROUP_CALL, this._roomId); // NOTE: native doesn't have onLocalAudioSettingsChanged event


      this._props.isAudioEnabled = false;

      this._internalEvents.emit('onPropertyUpdatedManually', this);
    });

    _defineProperty(this, "unmuteMicrophone", () => {
      this._binder.nativeModule.unmuteMicrophone(ControllableModuleType.GROUP_CALL, this._roomId); // NOTE: native doesn't have onLocalAudioSettingsChanged event


      this._props.isAudioEnabled = true;

      this._internalEvents.emit('onPropertyUpdatedManually', this);
    });

    _defineProperty(this, "stopVideo", () => {
      this._binder.nativeModule.stopVideo(ControllableModuleType.GROUP_CALL, this._roomId); // NOTE: native doesn't have onLocalAudioSettingsChanged event


      this._props.isVideoEnabled = false;

      this._internalEvents.emit('onPropertyUpdatedManually', this);
    });

    _defineProperty(this, "startVideo", () => {
      this._binder.nativeModule.startVideo(ControllableModuleType.GROUP_CALL, this._roomId); // NOTE: native doesn't have onLocalAudioSettingsChanged event


      this._props.isVideoEnabled = true;

      this._internalEvents.emit('onPropertyUpdatedManually', this);
    });

    _defineProperty(this, "switchCamera", () => {
      return this._binder.nativeModule.switchCamera(ControllableModuleType.GROUP_CALL, this._roomId);
    });

    this._binder = binder;
    this._internalEvents = internalEvents;
    this._props = props;
    this._roomId = roomId;
  }

  _updateInternal(props) {
    this._props = props;
    return this;
  }

  get participantId() {
    return this._props.participantId;
  }

  get user() {
    return this._props.user;
  }

  get state() {
    return this._props.state;
  }

  get enteredAt() {
    return this._props.enteredAt;
  }

  get exitedAt() {
    return this._props.exitedAt;
  }

  get duration() {
    return this._props.duration;
  }

  get isAudioEnabled() {
    return this._props.isAudioEnabled;
  }

  get isVideoEnabled() {
    return this._props.isVideoEnabled;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }
  /**
   * Mutes the audio of the local user.
   * Will trigger {@link RoomListener.onRemoteAudioSettingsChanged} method of remote participants.
   * If the remote user changes their audio settings, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */


}
//# sourceMappingURL=LocalParticipant.js.map