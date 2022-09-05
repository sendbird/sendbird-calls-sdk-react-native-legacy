import type { AuthenticateParams, CallOptions, DirectCallLogQueryParams, DirectCallProperties, RoomListQueryParams, RoomParams, SendbirdCallListener, SendbirdCallsJavascriptSpec, User } from '../types';
import { NativeConstants, RoomState, RoomType, SoundType } from '../types';
import { DirectCallLogListQuery, RoomListQuery } from './BridgedQuery';
import { DirectCall } from './DirectCall';
import NativeBinder from './NativeBinder';
import { Room } from './Room';
/**
 * SendbirdCallsModule class for SendbirdCalls
 */
export default class SendbirdCallsModule implements SendbirdCallsJavascriptSpec {
    private binder;
    constructor(binder: NativeBinder);
    private _applicationId;
    private _initialized;
    private _currentUser;
    private _sendbirdCallListener;
    /**
     * Returns current React-Native SDK version.
     *
     * @since 1.0.0
     */
    get VERSION(): string;
    /**
     * Returns current iOS/Android SDK version.
     *
     * @since 1.0.0
     */
    get NATIVE_VERSION(): string;
    /**
     * Returns the SDK Logger
     *
     * @since 1.0.0
     */
    get Logger(): {
        setTitle(title: string): void;
        setLogLevel(lv: "none" | "error" | "warning" | "info"): void;
        getLogLevel(): "none" | "error" | "warning" | "info";
        error(...args: unknown[]): number;
        warn(...args: unknown[]): number;
        info(...args: unknown[]): number;
    };
    /**
     * Returns current application ID.
     *
     * @since 1.0.0
     */
    get applicationId(): string;
    /**
     * Returns is SDK initialized.
     *
     * @since 1.0.0
     */
    get initialized(): boolean;
    /**
     * Gets the current `User`.
     * Returns the current `User`. If SendbirdCalls is not authenticated, `null` will be returned.
     *
     * @since 1.0.0
     */
    get currentUser(): User | null;
    /**
     * An enum that represents different types of a room.
     * Returns {@link RoomType}
     *
     * @since 1.0.0
     */
    get RoomType(): typeof RoomType;
    /**
     * An enum that represents state of a room.
     * Returns {@link RoomState}
     *
     * @since 1.0.0
     */
    get RoomState(): typeof RoomState;
    /**
     * Gets the constants from React-Native Native module
     * Returns the object
     *
     * @since 1.0.0
     */
    protected getConstants: () => NativeConstants;
    /**
     * Adds sound used in DirectCall such as ringtone and some sound effects with its file name with extension
     *
     * @iOS bundle file name
     * @Android res/raw file name
     *
     * @since 1.0.0
     */
    addDirectCallSound: (type: SoundType, fileName: string) => void;
    /**
     * Removes sound used in {@link DirectCall} with {@link SoundType} value.
     *
     * @since 1.0.0
     */
    removeDirectCallSound: (type: SoundType) => void;
    /**
     * Enables / disables dial sound used in {@link DirectCall} even when the device is in silent mode.
     * Call this method right after {@link addDirectCallSound}.
     *
     * @since 1.0.0
     */
    setDirectCallDialingSoundOnWhenSilentOrVibrateMode: (enabled: boolean) => void;
    /**
     * Gets the current `User` from native
     * Returns the current `User`. If SendbirdCalls is not authenticated, `null` will be returned.
     *
     * @since 1.0.0
     */
    getCurrentUser: () => Promise<User | null>;
    /**
     * Returns all ongoing calls, including the active call and all calls on hold.
     *
     * @since 1.0.0
     */
    getOngoingCalls(): Promise<DirectCallProperties[]>;
    /**
     * Gets call from call ID or call UUID
     *
     * @since 1.0.0
     */
    getDirectCall: (callId: string) => Promise<DirectCall>;
    /**
     * Initializes SendbirdCalls.
     *
     * @since 1.0.0
     */
    initialize: (appId: string) => boolean;
    private _init;
    /**
     * Authenticates.
     *
     * @since 1.0.0
     */
    authenticate: (authParams: AuthenticateParams) => Promise<User>;
    /**
     * Deauthenticates.
     *
     * @since 1.0.0
     */
    deauthenticate: () => Promise<void>;
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
    registerPushToken: (token: string, unique?: boolean) => Promise<void>;
    /**
     * Unregisters push token for current user.
     *
     * @since 1.0.0
     */
    unregisterPushToken: (token: string) => Promise<void>;
    /**
     * Makes a call to user(callee) directly. (1:1 Call).
     * Use the {@link CallOptions} object to choose initial call configuration (e.g. muted/unmuted)
     *
     * @since 1.0.0
     */
    dial(calleeUserId: string, isVideoCall: boolean, options?: CallOptions): Promise<DirectCallProperties>;
    /**
     * Creates a {@link Room} for group calls.
     *
     * @since 1.0.0
     */
    createRoom(roomParams: RoomParams): Promise<Room>;
    /**
     * Fetches a room instance from Sendbird server.
     *
     * @since 1.0.0
     */
    fetchRoomById(roomId: string): Promise<Room>;
    /**
     * Gets a locally-cached room instance by room ID.
     *
     * @since 1.0.0
     */
    getCachedRoomById(roomId: string): Promise<Room | null>;
    /**
     * To receive native-like calls while an app is in the background or closed, a device registration token must be registered to the server.
     * Register a device push token after authentication has completed using the `SendbirdCalls.ios_registerVoIPPushToken()` method.
     *
     * @platform iOS
     * @since 1.0.0
     */
    ios_registerVoIPPushToken: (token: string, unique?: boolean) => Promise<void>;
    /**
     * Unregisters a VoIP push token of specific device.
     * You will not receive VoIP push notification for a call anymore.
     *
     * @platform iOS
     * @since 1.0.0
     */
    ios_unregisterVoIPPushToken: (token: string) => Promise<void>;
    /**
     * Show-up a view that allows user to change the system audio route.
     * [AVRoutePickerView](https://developer.apple.com/documentation/avkit/avroutepickerview) in iOS 11 or later
     *
     * @platform iOS
     * @since 1.0.0
     */
    ios_routePickerView: () => void;
    /**
     * Handles Firebase message data.
     * Returns true if Sendbird call message. Otherwise false.
     *
     * @platform Android
     * @since 1.0.0
     */
    android_handleFirebaseMessageData: (data?: Record<string, string> | undefined) => boolean;
    /**
     * Set SendbirdCall listener
     *
     * @since 1.0.0
     */
    setListener(listener: SendbirdCallListener): void;
    /**
     * Creates direct call log list query.
     *
     * @since 1.0.0
     */
    createDirectCallLogListQuery: (params?: DirectCallLogQueryParams) => Promise<DirectCallLogListQuery>;
    /**
     * Creates a query for room list with specified parameters.
     *
     * @since 1.0.0
     */
    createRoomListQuery: (params?: RoomListQueryParams) => Promise<RoomListQuery>;
}
