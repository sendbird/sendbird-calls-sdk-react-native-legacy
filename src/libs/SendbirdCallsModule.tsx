import { Platform } from 'react-native';

import pkg from '../../package.json';
import type {
  CallOptions,
  DirectCallLogQueryParams,
  DirectCallProperties,
  RoomListQueryParams,
  SendbirdCallsJavascriptSpec,
  User,
} from '../types';
import { NativeConstants, NativeQueryType, RoomType, SoundType } from '../types';
import { noop } from '../utils';
import { Logger } from '../utils/logger';
import { DirectCallLogListQuery, RoomListQuery } from './BridgedQuery';
import { DirectCall } from './DirectCall';
import NativeBinder, { CallsEvent, DefaultEventType } from './NativeBinder';
import { Room } from './Room';

/**
 * SendbirdCallsModule class for SendbirdCalls
 */
export default class SendbirdCallsModule implements SendbirdCallsJavascriptSpec {
  constructor(private binder: NativeBinder) {}

  private _applicationId = '';
  private _initialized = false;
  private _currentUser: User | null = null;
  private _onRinging: (props: DirectCallProperties) => void = noop;

  /**
   * Returns current React-Native SDK version.
   *
   * @since 1.0.0
   */
  public get VERSION() {
    return pkg.version;
  }

  /**
   * Returns current iOS/Android SDK version.
   *
   * @since 1.0.0
   */
  public get NATIVE_VERSION() {
    return this.getConstants()['NATIVE_SDK_VERSION'];
  }

  /**
   * Returns the SDK Logger
   *
   * @since 1.0.0
   */
  public get Logger() {
    return Logger;
  }

  /**
   * Returns current application ID.
   *
   * @since 1.0.0
   */
  public get applicationId() {
    return this._applicationId;
  }

  /**
   * Returns is SDK initialized.
   *
   * @since 1.0.0
   */
  public get initialized() {
    return this._initialized;
  }

  /**
   * Gets the current `User`.
   * Returns the current `User`. If SendBirdCall is not authenticated, `null` will be returned.
   *
   * @since 1.0.0
   */
  public get currentUser() {
    return this._currentUser;
  }

  /**
   * An enum that represents different types of a room.
   * Returns {@link RoomType}
   *
   * @since 1.0.0
   */
  public get RoomType() {
    return RoomType;
  }

  /**
   * Gets the constants from React-Native Native module
   * Returns the object
   *
   * @since 1.0.0
   */
  protected getConstants = (): NativeConstants => {
    // @ts-ignore
    return this.binder.nativeModule.getConstants?.() ?? { NATIVE_SDK_VERSION: '' };
  };

  /**
   * Adds sound used in DirectCall such as ringtone and some sound effects with its file name with extension
   *
   * @iOS bundle file name
   * @Android res/raw file name
   *
   * @since 1.0.0
   */
  public addDirectCallSound = (type: SoundType, fileName: string) => {
    let name = fileName;
    if (Platform.OS === 'android') {
      const idx = fileName.lastIndexOf('.');
      if (idx) name = fileName.slice(0, idx);
    }
    this.binder.nativeModule.addDirectCallSound(type, name);
  };

  /**
   * Removes sound used in {@link DirectCall} with {@link SoundType} value.
   *
   * @since 1.0.0
   */
  public removeDirectCallSound = (type: SoundType) => {
    this.binder.nativeModule.removeDirectCallSound(type);
  };

  /**
   * Enables / disables dial sound used in {@link DirectCall} even when the device is in silent mode.
   * Call this method right after {@link addDirectCallSound}.
   *
   * @since 1.0.0
   */
  public setDirectCallDialingSoundOnWhenSilentOrVibrateMode = (enabled: boolean) => {
    this.binder.nativeModule.setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled);
  };

  /**
   * Gets the current `User` from native
   * Returns the current `User`. If SendBirdCall is not authenticated, `null` will be returned.
   *
   * @since 1.0.0
   */
  public getCurrentUser = async () => {
    this._currentUser = await this.binder.nativeModule.getCurrentUser();
    return this.currentUser;
  };

  /**
   * Returns all ongoing calls, including the active call and all calls on hold.
   *
   * @since 1.0.0
   */
  public getOngoingCalls(): Promise<DirectCallProperties[]> {
    return this.binder.nativeModule.getOngoingCalls();
  }

  /**
   * Gets call from call ID or call UUID
   *
   * @since 1.0.0
   */
  public getDirectCall = async (callId: string): Promise<DirectCall> => {
    const callProps = await this.binder.nativeModule.getDirectCall(callId);
    return DirectCall.get(this.binder, callProps);
  };

  /**
   * Initializes SendbirdCalls.
   *
   * @since 1.0.0
   */
  public initialize = (appId: string) => {
    if (this.initialized) {
      if (this.applicationId !== appId) {
        return this._init(appId);
      } else {
        return this.initialized;
      }
    } else {
      return this._init(appId);
    }
  };

  private _init = (appId: string) => {
    this.Logger.debug('[SendbirdCalls]', 'initialize()');

    DirectCall.poolRelease();
    Room.poolRelease();

    if (!this.initialized) {
      this.binder.addListener(CallsEvent.DEFAULT, ({ type, data }) => {
        if (type === DefaultEventType.ON_RINGING) {
          this.Logger.debug('[SendbirdCalls]', 'onRinging', data.callId);
          this._onRinging(data);
        }
      });
    }

    this.binder.nativeModule.initialize(appId);
    this._applicationId = appId;
    this._initialized = true;
    return this.initialized;
  };

  /**
   * Authenticates.
   *
   * @since 1.0.0
   */
  public authenticate = async (userId: string, accessToken: string | null = null) => {
    this._currentUser = await this.binder.nativeModule.authenticate(userId, accessToken);
    return this.currentUser as User;
  };

  /**
   * Deauthenticates.
   *
   * @since 1.0.0
   */
  public deauthenticate = async () => {
    await this.binder.nativeModule.deauthenticate();
    this._currentUser = null;
  };

  /**
   * Registers push token for current user.
   *
   * on iOS, push token means APNS token.
   * on Android, push token means FCM token.
   *
   * ```ts
   * if (Platform.OS === 'android') {
   *   const fcmToken = await messaging().getToken();
   *   await SendbirdCalls.registerPushToken(fcmToken);
   * }
   * if (Platform.OS === 'ios') {
   *   const apnsToken = await messaging().getAPNSToken();
   *   await SendbirdCalls.registerPushToken(apnsToken);
   * }
   * ```
   *
   * @since 1.0.0
   */
  public registerPushToken = async (token: string, unique = true) => {
    await this.binder.nativeModule.registerPushToken(token, unique);
  };

  /**
   * Unregisters push token for current user.
   *
   * @since 1.0.0
   */
  public unregisterPushToken = async (token: string) => {
    await this.binder.nativeModule.unregisterPushToken(token);
  };

  /**
   * Makes a call to user(callee) directly. (1:1 Call).
   * Use the {@link CallOptions} object to choose initial call configuration (e.g. muted/unmuted)
   *
   * @since 1.0.0
   */
  public dial(
    calleeUserId: string,
    isVideoCall: boolean,
    options: CallOptions = { audioEnabled: true, frontCamera: true, videoEnabled: true },
  ): Promise<DirectCallProperties> {
    return this.binder.nativeModule.dial(calleeUserId, isVideoCall, options);
  }

  /**
   * Creates a {@link Room} for group calls.
   *
   * @since 1.0.0
   */
  public createRoom(roomType: RoomType): Promise<Room> {
    return this.binder.nativeModule.createRoom(roomType).then((props) => Room.get(this.binder, props));
  }

  /**
   * Fetches a room instance from Sendbird server.
   *
   * @since 1.0.0
   */
  public fetchRoomById(roomId: string): Promise<Room> {
    return this.binder.nativeModule.fetchRoomById(roomId).then((props) => Room.get(this.binder, props));
  }

  /**
   * Gets a locally-cached room instance by room ID.
   *
   * @since 1.0.0
   */
  public getCachedRoomById(roomId: string): Promise<Room | null> {
    return this.binder.nativeModule
      .getCachedRoomById(roomId)
      .then((props) => (props ? Room.get(this.binder, props) : null));
  }

  /**
   * To receive native-like calls while an app is in the background or closed, a device registration token must be registered to the server.
   * Register a device push token after authentication has completed using the `SendbirdCalls.ios_registerVoIPPushToken()` method.
   *
   * @platform iOS
   * @since 1.0.0
   */
  public ios_registerVoIPPushToken = async (token: string, unique = true) => {
    if (Platform.OS !== 'ios') return;
    await this.binder.nativeModule.registerVoIPPushToken(token, unique);
  };

  /**
   * Unregisters a VoIP push token of specific device.
   * You will not receive VoIP push notification for a call anymore.
   *
   * @platform iOS
   * @since 1.0.0
   */
  public ios_unregisterVoIPPushToken = async (token: string) => {
    if (Platform.OS !== 'ios') return;
    await this.binder.nativeModule.unregisterVoIPPushToken(token);
  };

  /**
   * Show-up a view that allows user to change the system audio route.
   * [AVRoutePickerView](https://developer.apple.com/documentation/avkit/avroutepickerview) in iOS 11 or later
   *
   * @platform iOS
   * @since 1.0.0
   */
  public ios_routePickerView = () => {
    if (Platform.OS !== 'ios') return;
    this.binder.nativeModule.routePickerView();
  };

  /**
   * Handles Firebase message data.
   * Returns true if SendBird call message. Otherwise false.
   *
   * @platform Android
   * @since 1.0.0
   */
  public android_handleFirebaseMessageData = (data?: Record<string, string>) => {
    if (Platform.OS !== 'android' || !data?.['sendbird_call']) {
      return false;
    } else {
      this.binder.nativeModule.handleFirebaseMessageData(data);
      return true;
    }
  };

  /**
   * Set onRinging listener
   * A listener called when received dialing.
   */
  public onRinging(listener: (props: DirectCallProperties) => void) {
    this._onRinging = listener;
  }

  /**
   * Creates direct call log list query.
   *
   * @since 1.0.0
   */
  public createDirectCallLogListQuery = async (params: DirectCallLogQueryParams = {}) => {
    const queryKey = await this.binder.nativeModule.createDirectCallLogListQuery(params);
    return new DirectCallLogListQuery(queryKey, NativeQueryType.DIRECT_CALL_LOG, this.binder);
  };

  /**
   * Creates a query for room list with specified parameters.
   *
   * @since 1.0.0
   */
  public createRoomListQuery = async (params: RoomListQueryParams = {}) => {
    const queryKey = await this.binder.nativeModule.createRoomListQuery(params);
    return new RoomListQuery(queryKey, NativeQueryType.ROOM_LIST, this.binder);
  };
}
