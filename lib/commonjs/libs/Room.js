"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Room = void 0;

var _reactNative = require("react-native");

var _types = require("../types");

var _logger = require("../utils/logger");

var _NativeBinder = require("./NativeBinder");

var _Participant = require("./Participant");

var _SendbirdError = require("./SendbirdError");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Room {
  /** @internal **/

  /** @internal **/
  static poolRelease() {
    Room.pool = {};
  }
  /** @internal **/


  static get(binder, props) {
    if (!Room.pool[props.roomId]) Room.pool[props.roomId] = new Room(binder, props);
    const room = Room.pool[props.roomId];
    return room._updateInternal(props);
  }

  constructor(binder, props) {
    var _this = this;

    _defineProperty(this, "_binder", void 0);

    _defineProperty(this, "_props", void 0);

    _defineProperty(this, "_localParticipant", void 0);

    _defineProperty(this, "_participants", void 0);

    _defineProperty(this, "_remoteParticipants", void 0);

    _defineProperty(this, "_internalEvents", {
      pool: [],
      emit: function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // @ts-ignore
        _this._internalEvents.pool.forEach(listener => {
          var _listener$event;

          return (_listener$event = listener[event]) === null || _listener$event === void 0 ? void 0 : _listener$event.call(listener, ...args);
        });
      },
      add: listener => {
        this._internalEvents.pool.push(listener);

        return () => {
          const index = this._internalEvents.pool.indexOf(listener);

          if (index > -1) delete this._internalEvents.pool[index];
        };
      }
    });

    _defineProperty(this, "addListener", listener => {
      _logger.Logger.debug('[GroupCall]', 'addListener', this.roomId);

      const unsubscribes = [];

      const disposeInternal = this._internalEvents.add(listener);

      const disposeNative = this._binder.addListener(_NativeBinder.CallsEvent.GROUP_CALL, _ref => {
        let {
          type,
          data,
          additionalData
        } = _ref;
        if (data.roomId !== this.roomId) return;

        _logger.Logger.debug('[GroupCall]', 'receive events ', type, data.roomId, additionalData);

        this._updateInternal(data);

        switch (type) {
          case _NativeBinder.GroupCallEventType.ON_DELETED:
            {
              var _listener$onDeleted;

              (_listener$onDeleted = listener.onDeleted) === null || _listener$onDeleted === void 0 ? void 0 : _listener$onDeleted.call(listener);
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_ERROR:
            {
              var _listener$onError;

              const error = new _SendbirdError.SendbirdError(additionalData === null || additionalData === void 0 ? void 0 : additionalData.errorMessage, additionalData === null || additionalData === void 0 ? void 0 : additionalData.errorCode);

              const participant = _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant);

              (_listener$onError = listener.onError) === null || _listener$onError === void 0 ? void 0 : _listener$onError.call(listener, error, participant);
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_REMOTE_PARTICIPANT_ENTERED:
            {
              var _listener$onRemotePar;

              (_listener$onRemotePar = listener.onRemoteParticipantEntered) === null || _listener$onRemotePar === void 0 ? void 0 : _listener$onRemotePar.call(listener, _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_REMOTE_PARTICIPANT_EXITED:
            {
              var _listener$onRemotePar2;

              (_listener$onRemotePar2 = listener.onRemoteParticipantExited) === null || _listener$onRemotePar2 === void 0 ? void 0 : _listener$onRemotePar2.call(listener, _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_REMOTE_PARTICIPANT_STREAM_STARTED:
            {
              var _listener$onRemotePar3;

              (_listener$onRemotePar3 = listener.onRemoteParticipantStreamStarted) === null || _listener$onRemotePar3 === void 0 ? void 0 : _listener$onRemotePar3.call(listener, _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_AUDIO_DEVICE_CHANGED:
            {
              if (_reactNative.Platform.OS === 'android') {
                var _listener$onAudioDevi, _additionalData$curre, _additionalData$avail;

                (_listener$onAudioDevi = listener.onAudioDeviceChanged) === null || _listener$onAudioDevi === void 0 ? void 0 : _listener$onAudioDevi.call(listener, {
                  platform: 'android',
                  data: {
                    currentAudioDevice: (_additionalData$curre = additionalData === null || additionalData === void 0 ? void 0 : additionalData.currentAudioDevice) !== null && _additionalData$curre !== void 0 ? _additionalData$curre : null,
                    availableAudioDevices: (_additionalData$avail = additionalData === null || additionalData === void 0 ? void 0 : additionalData.availableAudioDevices) !== null && _additionalData$avail !== void 0 ? _additionalData$avail : []
                  }
                });
              }

              if (_reactNative.Platform.OS === 'ios') {
                var _listener$onAudioDevi2, _additionalData$reaso, _additionalData$curre2, _additionalData$previ;

                (_listener$onAudioDevi2 = listener.onAudioDeviceChanged) === null || _listener$onAudioDevi2 === void 0 ? void 0 : _listener$onAudioDevi2.call(listener, {
                  platform: 'ios',
                  data: {
                    reason: (_additionalData$reaso = additionalData === null || additionalData === void 0 ? void 0 : additionalData.reason) !== null && _additionalData$reaso !== void 0 ? _additionalData$reaso : _types.RouteChangeReason.unknown,
                    currentRoute: (_additionalData$curre2 = additionalData === null || additionalData === void 0 ? void 0 : additionalData.currentRoute) !== null && _additionalData$curre2 !== void 0 ? _additionalData$curre2 : {
                      inputs: [],
                      outputs: []
                    },
                    previousRoute: (_additionalData$previ = additionalData === null || additionalData === void 0 ? void 0 : additionalData.previousRoute) !== null && _additionalData$previ !== void 0 ? _additionalData$previ : {
                      inputs: [],
                      outputs: []
                    }
                  }
                });
              }

              break;
            }

          case _NativeBinder.GroupCallEventType.ON_REMOTE_VIDEO_SETTINGS_CHANGED:
            {
              var _listener$onRemoteVid;

              (_listener$onRemoteVid = listener.onRemoteVideoSettingsChanged) === null || _listener$onRemoteVid === void 0 ? void 0 : _listener$onRemoteVid.call(listener, _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_REMOTE_AUDIO_SETTINGS_CHANGED:
            {
              var _listener$onRemoteAud;

              (_listener$onRemoteAud = listener.onRemoteAudioSettingsChanged) === null || _listener$onRemoteAud === void 0 ? void 0 : _listener$onRemoteAud.call(listener, _Participant.Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_CUSTOM_ITEMS_UPDATED:
            {
              var _listener$onCustomIte, _additionalData$updat;

              (_listener$onCustomIte = listener.onCustomItemsUpdated) === null || _listener$onCustomIte === void 0 ? void 0 : _listener$onCustomIte.call(listener, (_additionalData$updat = additionalData === null || additionalData === void 0 ? void 0 : additionalData.updatedKeys) !== null && _additionalData$updat !== void 0 ? _additionalData$updat : []);
              break;
            }

          case _NativeBinder.GroupCallEventType.ON_CUSTOM_ITEMS_DELETED:
            {
              var _listener$onCustomIte2, _additionalData$delet;

              (_listener$onCustomIte2 = listener.onCustomItemsDeleted) === null || _listener$onCustomIte2 === void 0 ? void 0 : _listener$onCustomIte2.call(listener, (_additionalData$delet = additionalData === null || additionalData === void 0 ? void 0 : additionalData.deletedKeys) !== null && _additionalData$delet !== void 0 ? _additionalData$delet : []);
              break;
            }
        }
      });

      unsubscribes.push(disposeNative, disposeInternal);
      return () => unsubscribes.forEach(fn => fn());
    });

    _defineProperty(this, "enter", function () {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        audioEnabled: true,
        videoEnabled: true
      };
      return _this._binder.nativeModule.enter(_this.roomId, options);
    });

    _defineProperty(this, "android_selectAudioDevice", device => {
      return this._binder.nativeModule.selectAudioDevice(_types.ControllableModuleType.GROUP_CALL, this.roomId, device);
    });

    this._binder = binder;
    this._props = props;
    this._localParticipant = null;
    this._participants = [];
    this._remoteParticipants = [];
  }

  _updateInternal(props) {
    this._localParticipant = _Participant.LocalParticipant.get(props.localParticipant, this._binder, this._internalEvents, this.roomId);
    this._participants = props.participants.map(participant => _Participant.Participant.get(participant));
    this._remoteParticipants = props.remoteParticipants.map(remoteParticipant => _Participant.Participant.get(remoteParticipant));
    this._props = props;
    return this;
  }

  get roomId() {
    return this._props.roomId;
  }

  get state() {
    return this._props.state;
  }

  get type() {
    return this._props.type;
  }

  get customItems() {
    return this._props.customItems;
  }

  get participants() {
    return this._participants;
  }

  get localParticipant() {
    return this._localParticipant;
  }

  get remoteParticipants() {
    return this._remoteParticipants;
  }

  get android_availableAudioDevices() {
    return this._props.android_availableAudioDevices;
  }

  get android_currentAudioDevice() {
    return this._props.android_currentAudioDevice;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get createdBy() {
    return this._props.createdBy;
  }
  /**
   * Add GroupCall Room listener.
   * supports multiple listeners.
   *
   * @since 1.0.0
   */


  /**
   * Exit from the room
   * Will trigger {@link RoomListener.onRemoteParticipantExited} method of remote participants after successfully exiting the room.
   * If a remote participant exited the room, the local user will be notified via the same method.
   *
   * @since 1.0.0
   */
  exit() {
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


}

exports.Room = Room;

_defineProperty(Room, "pool", {});
//# sourceMappingURL=Room.js.map