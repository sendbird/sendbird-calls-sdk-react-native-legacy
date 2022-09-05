import { Platform } from 'react-native';

import type {
  AudioDevice,
  CallOptions,
  DirectCallListener,
  DirectCallMethods,
  DirectCallProperties,
  VideoDevice,
} from '../types';
import { ControllableModuleType, RouteChangeReason } from '../types';
import { Logger } from '../utils/logger';
import type NativeBinder from './NativeBinder';
import { CallsEvent, DirectCallEventType } from './NativeBinder';

export class DirectCall implements DirectCallProperties, DirectCallMethods {
  /** @internal **/
  private static pool: Record<string, DirectCall> = {};

  /** @internal **/
  public static poolRelease() {
    DirectCall.pool = {};
  }

  /** @internal **/
  public static get(binder: NativeBinder, props: DirectCallProperties) {
    if (!DirectCall.pool[props.callId]) DirectCall.pool[props.callId] = new DirectCall(binder, props);
    const directCall = DirectCall.pool[props.callId];
    return directCall._updateInternal(props);
  }

  constructor(binder: NativeBinder, props: DirectCallProperties) {
    this._binder = binder;
    this._props = props;
  }

  private _binder: NativeBinder;
  private _props: DirectCallProperties;
  private _internalEvents = {
    pool: [] as Partial<DirectCallListener>[],
    emit: (event: keyof DirectCallListener, ...args: unknown[]) => {
      // @ts-ignore
      this._internalEvents.pool.forEach((listener) => listener[event]?.(...args));
    },
    add: (listener: Partial<DirectCallListener>) => {
      this._internalEvents.pool.push(listener);
      return () => {
        const index = this._internalEvents.pool.indexOf(listener);
        if (index > -1) delete this._internalEvents.pool[index];
      };
    },
  };
  private _updateInternal(props: DirectCallProperties) {
    this._props = props;
    return this;
  }

  public get ios_callUUID() {
    return this._props.ios_callUUID;
  }
  public get android_availableAudioDevices() {
    return this._props.android_availableAudioDevices;
  }
  public get android_currentAudioDevice() {
    return this._props.android_currentAudioDevice;
  }
  public get availableVideoDevices() {
    return this._props.availableVideoDevices;
  }
  public get callId() {
    return this._props.callId;
  }
  public get callLog() {
    return this._props.callLog;
  }
  public get callee() {
    return this._props.callee;
  }
  public get caller() {
    return this._props.caller;
  }
  public get currentVideoDevice() {
    return this._props.currentVideoDevice;
  }
  public get customItems() {
    return this._props.customItems;
  }
  public get startedAt() {
    return this._props.startedAt;
  }
  public get duration() {
    if (this.startedAt > 0) {
      return Math.max(0, Date.now() - this.startedAt);
    } else if (this._props.duration > 0) {
      return this._props.duration;
    } else {
      return 0;
    }
  }
  public get endedBy() {
    return this._props.endedBy;
  }
  public get isEnded() {
    return this._props.isEnded;
  }
  public get isLocalAudioEnabled() {
    return this._props.isLocalAudioEnabled;
  }
  public get isLocalScreenShareEnabled() {
    return this._props.isLocalScreenShareEnabled;
  }
  public get isLocalVideoEnabled() {
    return this._props.isLocalVideoEnabled;
  }
  public get isOnHold() {
    return this._props.isOnHold;
  }
  public get isOngoing() {
    return this._props.isOngoing;
  }
  public get isRemoteAudioEnabled() {
    return this._props.isRemoteAudioEnabled;
  }
  public get isRemoteVideoEnabled() {
    return this._props.isRemoteVideoEnabled;
  }
  public get isVideoCall() {
    return this._props.isVideoCall;
  }
  public get localRecordingStatus() {
    return this._props.localRecordingStatus;
  }
  public get localUser() {
    return this._props.localUser;
  }
  public get myRole() {
    return this._props.myRole;
  }
  public get remoteRecordingStatus() {
    return this._props.remoteRecordingStatus;
  }
  public get remoteUser() {
    return this._props.remoteUser;
  }
  public get endResult() {
    return this._props.endResult;
  }

  /**
   * Add DirectCall listener.
   * supports multiple listeners.
   *
   * @since 1.0.0
   */
  public addListener = (listener: Partial<DirectCallListener>) => {
    Logger.info('[DirectCall]', 'addListener', this.callId);

    const unsubscribes: Array<() => void> = [];

    const disposeInternal = this._internalEvents.add(listener);
    const disposeNative = this._binder.addListener(CallsEvent.DIRECT_CALL, ({ type, data, additionalData }) => {
      if (data.callId !== this.callId) return;

      this._updateInternal(data);
      switch (type) {
        case DirectCallEventType.ON_ESTABLISHED: {
          listener.onEstablished?.(this);
          break;
        }
        case DirectCallEventType.ON_CONNECTED: {
          listener.onConnected?.(this);
          break;
        }
        case DirectCallEventType.ON_RECONNECTING: {
          listener.onReconnecting?.(this);
          break;
        }
        case DirectCallEventType.ON_RECONNECTED: {
          listener.onReconnected?.(this);
          break;
        }
        case DirectCallEventType.ON_ENDED: {
          listener.onEnded?.(this);
          break;
        }
        case DirectCallEventType.ON_REMOTE_AUDIO_SETTINGS_CHANGED: {
          listener.onRemoteAudioSettingsChanged?.(this);
          break;
        }
        case DirectCallEventType.ON_REMOTE_VIDEO_SETTINGS_CHANGED: {
          listener.onRemoteVideoSettingsChanged?.(this);
          break;
        }
        case DirectCallEventType.ON_LOCAL_VIDEO_SETTINGS_CHANGED: {
          listener.onLocalVideoSettingsChanged?.(this);
          break;
        }
        case DirectCallEventType.ON_REMOTE_RECORDING_STATUS_CHANGED: {
          listener.onRemoteRecordingStatusChanged?.(this);
          break;
        }
        case DirectCallEventType.ON_CUSTOM_ITEMS_UPDATED: {
          listener.onCustomItemsUpdated?.(this, additionalData?.updatedKeys ?? []);
          break;
        }
        case DirectCallEventType.ON_CUSTOM_ITEMS_DELETED: {
          listener.onCustomItemsDeleted?.(this, additionalData?.deletedKeys ?? []);
          break;
        }
        case DirectCallEventType.ON_USER_HOLD_STATUS_CHANGED: {
          listener.onUserHoldStatusChanged?.(
            this,
            additionalData?.isLocalUser ?? false,
            additionalData?.isUserOnHold ?? false,
          );
          break;
        }
        case DirectCallEventType.ON_AUDIO_DEVICE_CHANGED: {
          if (Platform.OS === 'android') {
            listener.onAudioDeviceChanged?.(this, {
              platform: 'android',
              data: {
                currentAudioDevice: additionalData?.currentAudioDevice ?? null,
                availableAudioDevices: additionalData?.availableAudioDevices ?? [],
              },
            });
          }
          if (Platform.OS === 'ios') {
            listener.onAudioDeviceChanged?.(this, {
              platform: 'ios',
              data: {
                reason: additionalData?.reason ?? RouteChangeReason.unknown,
                currentRoute: additionalData?.currentRoute ?? { inputs: [], outputs: [] },
                previousRoute: additionalData?.previousRoute ?? { inputs: [], outputs: [] },
              },
            });
          }
          break;
        }
      }
    });

    unsubscribes.push(disposeNative, disposeInternal);
    return () => unsubscribes.forEach((fn) => fn());
  };

  /**
   * Accepts call.
   *
   * @since 1.0.0
   */
  public accept = async (
    options: CallOptions = { audioEnabled: true, frontCamera: true, videoEnabled: true },
    holdActiveCall = false,
  ) => {
    await this._binder.nativeModule.accept(this.callId, options, holdActiveCall);
  };

  /**
   * Ends the call.
   * {@link DirectCallListener.onEnded} will be called after successful ending.
   * This listener will also be called when the remote user ends the call.
   *
   * @since 1.0.0
   */
  public end = async () => {
    await this._binder.nativeModule.end(this.callId);
  };

  /**
   * Selects video device.
   * Changes current video device asynchronously.
   *
   * @since 1.0.0
   */
  public selectVideoDevice = async (device: VideoDevice) => {
    await this._binder.nativeModule.selectVideoDevice(ControllableModuleType.DIRECT_CALL, this.callId, device);
  };

  /**
   * Selects audio device.
   *
   * @platform Android
   * @since 1.0.0
   */
  public android_selectAudioDevice = async (device: AudioDevice) => {
    await this._binder.nativeModule.selectAudioDevice(ControllableModuleType.DIRECT_CALL, this.callId, device);
  };

  /**
   * Mutes the audio of local user.
   * Will trigger {@link DirectCallListener.onRemoteAudioSettingsChanged} method of the remote user.
   * If the remote user changes their audio settings, local user will be notified via same delegate method.
   *
   * @since 1.0.0
   */
  public muteMicrophone = () => {
    this._binder.nativeModule.muteMicrophone(ControllableModuleType.DIRECT_CALL, this.callId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isLocalAudioEnabled = false;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Unmutes the audio of local user.
   * Will trigger {@link DirectCallListener.onRemoteAudioSettingsChanged} method of the remote user.
   * If the remote user changes their audio settings, local user will be notified via same delegate method.
   *
   * @since 1.0.0
   */
  public unmuteMicrophone = () => {
    this._binder.nativeModule.unmuteMicrophone(ControllableModuleType.DIRECT_CALL, this.callId);

    // NOTE: native doesn't have onLocalAudioSettingsChanged event
    this._props.isLocalAudioEnabled = true;
    this._internalEvents.emit('onPropertyUpdatedManually', this);
  };

  /**
   * Starts local video.
   * If the callee changes video settings,
   * the caller is notified via the {@link DirectCallListener.onRemoteVideoSettingsChanged} listener.
   *
   * @since 1.0.0
   */
  public startVideo = () => {
    this._binder.nativeModule.startVideo(ControllableModuleType.DIRECT_CALL, this.callId);
    this._props.isLocalVideoEnabled = true;

    // NOTE: ios native doesn't have onLocalAudioSettingsChanged event
    Platform.OS === 'ios' && this._internalEvents.emit('onLocalVideoSettingsChanged', this);
  };

  /**
   * Stops local video.
   * If the callee changes video settings,
   * the caller is notified via the {@link DirectCallListener.onRemoteVideoSettingsChanged} listener.
   *
   * @since 1.0.0
   */
  public stopVideo = () => {
    this._binder.nativeModule.stopVideo(ControllableModuleType.DIRECT_CALL, this.callId);
    this._props.isLocalVideoEnabled = false;

    // NOTE: ios native doesn't have onLocalAudioSettingsChanged event
    Platform.OS === 'ios' && this._internalEvents.emit('onLocalVideoSettingsChanged', this);
  };

  /**
   * Toggles the selection between the front and the back camera.
   *
   * on Android, In case of more than two cameras, the next camera will be selected.
   * If the last camera is already selected, the first one will be selected again.
   *
   * @since 1.0.0
   */
  public switchCamera = async () => {
    await this._binder.nativeModule.switchCamera(ControllableModuleType.DIRECT_CALL, this.callId);
  };

  /**
   * Update local video view.
   * @see DirectCallVideoView.videoViewId
   *
   * @since 1.0.0
   */
  public updateLocalVideoView = (videoViewId: number) => {
    this._binder.nativeModule.updateLocalVideoView(this.callId, videoViewId);
  };

  /**
   * Update remote video view.
   * @see DirectCallVideoView.videoViewId
   *
   * @since 1.0.0
   */
  public updateRemoteVideoView = (videoViewId: number) => {
    this._binder.nativeModule.updateRemoteVideoView(this.callId, videoViewId);
  };
}
