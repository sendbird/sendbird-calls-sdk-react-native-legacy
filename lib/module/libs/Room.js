function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Platform } from 'react-native';
import { ControllableModuleType, RouteChangeReason } from '../types';
import { Logger } from '../utils/logger';
import { CallsEvent, GroupCallEventType } from './NativeBinder';
import { LocalParticipant, Participant } from './Participant';
import { SendbirdError } from './SendbirdError';
export class Room {
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
      Logger.info('[GroupCall]', 'addListener', this.roomId);
      const unsubscribes = [];

      const disposeInternal = this._internalEvents.add(listener);

      const disposeNative = this._binder.addListener(CallsEvent.GROUP_CALL, _ref => {
        let {
          type,
          data,
          additionalData
        } = _ref;
        if (data.roomId !== this.roomId) return;
        Logger.info('[GroupCall]', 'receive events ', type, data.roomId, additionalData);

        this._updateInternal(data);

        switch (type) {
          case GroupCallEventType.ON_DELETED:
            {
              var _listener$onDeleted;

              (_listener$onDeleted = listener.onDeleted) === null || _listener$onDeleted === void 0 ? void 0 : _listener$onDeleted.call(listener);
              break;
            }

          case GroupCallEventType.ON_ERROR:
            {
              var _listener$onError;

              const error = new SendbirdError(additionalData === null || additionalData === void 0 ? void 0 : additionalData.errorMessage, additionalData === null || additionalData === void 0 ? void 0 : additionalData.errorCode);
              const participant = Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant);
              (_listener$onError = listener.onError) === null || _listener$onError === void 0 ? void 0 : _listener$onError.call(listener, error, participant);
              break;
            }

          case GroupCallEventType.ON_REMOTE_PARTICIPANT_ENTERED:
            {
              var _listener$onRemotePar;

              (_listener$onRemotePar = listener.onRemoteParticipantEntered) === null || _listener$onRemotePar === void 0 ? void 0 : _listener$onRemotePar.call(listener, Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case GroupCallEventType.ON_REMOTE_PARTICIPANT_EXITED:
            {
              var _listener$onRemotePar2;

              (_listener$onRemotePar2 = listener.onRemoteParticipantExited) === null || _listener$onRemotePar2 === void 0 ? void 0 : _listener$onRemotePar2.call(listener, Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case GroupCallEventType.ON_REMOTE_PARTICIPANT_STREAM_STARTED:
            {
              var _listener$onRemotePar3;

              (_listener$onRemotePar3 = listener.onRemoteParticipantStreamStarted) === null || _listener$onRemotePar3 === void 0 ? void 0 : _listener$onRemotePar3.call(listener, Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case GroupCallEventType.ON_AUDIO_DEVICE_CHANGED:
            {
              if (Platform.OS === 'android') {
                var _listener$onAudioDevi;

                (_listener$onAudioDevi = listener.onAudioDeviceChanged) === null || _listener$onAudioDevi === void 0 ? void 0 : _listener$onAudioDevi.call(listener, {
                  platform: 'android',
                  data: {
                    currentAudioDevice: (additionalData === null || additionalData === void 0 ? void 0 : additionalData.currentAudioDevice) ?? null,
                    availableAudioDevices: (additionalData === null || additionalData === void 0 ? void 0 : additionalData.availableAudioDevices) ?? []
                  }
                });
              }

              if (Platform.OS === 'ios') {
                var _listener$onAudioDevi2;

                (_listener$onAudioDevi2 = listener.onAudioDeviceChanged) === null || _listener$onAudioDevi2 === void 0 ? void 0 : _listener$onAudioDevi2.call(listener, {
                  platform: 'ios',
                  data: {
                    reason: (additionalData === null || additionalData === void 0 ? void 0 : additionalData.reason) ?? RouteChangeReason.unknown,
                    currentRoute: (additionalData === null || additionalData === void 0 ? void 0 : additionalData.currentRoute) ?? {
                      inputs: [],
                      outputs: []
                    },
                    previousRoute: (additionalData === null || additionalData === void 0 ? void 0 : additionalData.previousRoute) ?? {
                      inputs: [],
                      outputs: []
                    }
                  }
                });
              }

              break;
            }

          case GroupCallEventType.ON_REMOTE_VIDEO_SETTINGS_CHANGED:
            {
              var _listener$onRemoteVid;

              (_listener$onRemoteVid = listener.onRemoteVideoSettingsChanged) === null || _listener$onRemoteVid === void 0 ? void 0 : _listener$onRemoteVid.call(listener, Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case GroupCallEventType.ON_REMOTE_AUDIO_SETTINGS_CHANGED:
            {
              var _listener$onRemoteAud;

              (_listener$onRemoteAud = listener.onRemoteAudioSettingsChanged) === null || _listener$onRemoteAud === void 0 ? void 0 : _listener$onRemoteAud.call(listener, Participant.get(additionalData === null || additionalData === void 0 ? void 0 : additionalData.participant));
              break;
            }

          case GroupCallEventType.ON_CUSTOM_ITEMS_UPDATED:
            {
              var _listener$onCustomIte;

              (_listener$onCustomIte = listener.onCustomItemsUpdated) === null || _listener$onCustomIte === void 0 ? void 0 : _listener$onCustomIte.call(listener, (additionalData === null || additionalData === void 0 ? void 0 : additionalData.updatedKeys) ?? []);
              break;
            }

          case GroupCallEventType.ON_CUSTOM_ITEMS_DELETED:
            {
              var _listener$onCustomIte2;

              (_listener$onCustomIte2 = listener.onCustomItemsDeleted) === null || _listener$onCustomIte2 === void 0 ? void 0 : _listener$onCustomIte2.call(listener, (additionalData === null || additionalData === void 0 ? void 0 : additionalData.deletedKeys) ?? []);
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
      return this._binder.nativeModule.selectAudioDevice(ControllableModuleType.GROUP_CALL, this.roomId, device);
    });

    this._binder = binder;
    this._props = props;
    this._localParticipant = null;
    this._participants = [];
    this._remoteParticipants = [];
  }

  _updateInternal(props) {
    this._localParticipant = LocalParticipant.get(props.localParticipant, this._binder, this._internalEvents, this.roomId);
    this._participants = props.participants.map(participant => Participant.get(participant));
    this._remoteParticipants = props.remoteParticipants.map(remoteParticipant => Participant.get(remoteParticipant));
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

_defineProperty(Room, "pool", {});
//# sourceMappingURL=Room.js.map