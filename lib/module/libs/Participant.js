function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ControllableModuleType } from '../types';
export class Participant {
  /** @internal **/
  static get(props, _binder, _internalEvents, _roomId) {
    if (!props) return null;
    const localParticipant = new Participant(props);
    return localParticipant._updateInternal(props);
  }

  constructor(props) {
    _defineProperty(this, "_props", void 0);

    this._props = props;
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

}
export class LocalParticipant extends Participant {
  /** @internal **/
  static get(props, binder, internalEvents, roomId) {
    if (!props) return null;
    return new LocalParticipant(props, binder, internalEvents, roomId);
  }

  constructor(props, binder, internalEvents, roomId) {
    super(props);

    _defineProperty(this, "_binder", void 0);

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
    this._roomId = roomId;
  }

}
//# sourceMappingURL=Participant.js.map