import type { AudioDevice, CallOptions, DirectCallListener, DirectCallMethods, DirectCallProperties, VideoDevice } from '../types';
import type NativeBinder from './NativeBinder';
export declare class DirectCall implements DirectCallProperties, DirectCallMethods {
    /** @internal **/
    private static pool;
    /** @internal **/
    static poolRelease(): void;
    /** @internal **/
    static get(binder: NativeBinder, props: DirectCallProperties): DirectCall;
    constructor(binder: NativeBinder, props: DirectCallProperties);
    private _binder;
    private _props;
    private _internalEvents;
    private _updateInternal;
    get ios_callUUID(): string | null;
    get android_availableAudioDevices(): import("../types").AudioDeviceType[];
    get android_currentAudioDevice(): import("../types").AudioDeviceType | null;
    get availableVideoDevices(): VideoDevice[];
    get callId(): string;
    get callLog(): import("../types").DirectCallLog | null;
    get callee(): import("../types").DirectCallUser | null;
    get caller(): import("../types").DirectCallUser | null;
    get currentVideoDevice(): VideoDevice | null;
    get customItems(): Record<string, string>;
    get startedAt(): number;
    get duration(): number;
    get endedBy(): import("../types").DirectCallUser | null;
    get isEnded(): boolean;
    get isLocalAudioEnabled(): boolean;
    get isLocalScreenShareEnabled(): boolean;
    get isLocalVideoEnabled(): boolean;
    get isOnHold(): boolean;
    get isOngoing(): boolean;
    get isRemoteAudioEnabled(): boolean;
    get isRemoteVideoEnabled(): boolean;
    get isVideoCall(): boolean;
    get localRecordingStatus(): import("../types").RecordingStatus;
    get localUser(): import("../types").DirectCallUser | null;
    get myRole(): import("../types").DirectCallUserRole | null;
    get remoteRecordingStatus(): import("../types").RecordingStatus;
    get remoteUser(): import("../types").DirectCallUser | null;
    get endResult(): import("../types").DirectCallEndResult;
    /**
     * Add DirectCall listener.
     * supports multiple listeners.
     *
     * @since 1.0.0
     */
    addListener: (listener: Partial<DirectCallListener>) => () => void;
    /**
     * Accepts call.
     *
     * @since 1.0.0
     */
    accept: (options?: CallOptions, holdActiveCall?: boolean) => Promise<void>;
    /**
     * Ends the call.
     * {@link DirectCallListener.onEnded} will be called after successful ending.
     * This listener will also be called when the remote user ends the call.
     *
     * @since 1.0.0
     */
    end: () => Promise<void>;
    /**
     * Selects video device.
     * Changes current video device asynchronously.
     *
     * @since 1.0.0
     */
    selectVideoDevice: (device: VideoDevice) => Promise<void>;
    /**
     * Selects audio device.
     *
     * @platform Android
     * @since 1.0.0
     */
    android_selectAudioDevice: (device: AudioDevice) => Promise<void>;
    /**
     * Mutes the audio of local user.
     * Will trigger {@link DirectCallListener.onRemoteAudioSettingsChanged} method of the remote user.
     * If the remote user changes their audio settings, local user will be notified via same delegate method.
     *
     * @since 1.0.0
     */
    muteMicrophone: () => void;
    /**
     * Unmutes the audio of local user.
     * Will trigger {@link DirectCallListener.onRemoteAudioSettingsChanged} method of the remote user.
     * If the remote user changes their audio settings, local user will be notified via same delegate method.
     *
     * @since 1.0.0
     */
    unmuteMicrophone: () => void;
    /**
     * Starts local video.
     * If the callee changes video settings,
     * the caller is notified via the {@link DirectCallListener.onRemoteVideoSettingsChanged} listener.
     *
     * @since 1.0.0
     */
    startVideo: () => void;
    /**
     * Stops local video.
     * If the callee changes video settings,
     * the caller is notified via the {@link DirectCallListener.onRemoteVideoSettingsChanged} listener.
     *
     * @since 1.0.0
     */
    stopVideo: () => void;
    /**
     * Toggles the selection between the front and the back camera.
     *
     * on Android, In case of more than two cameras, the next camera will be selected.
     * If the last camera is already selected, the first one will be selected again.
     *
     * @since 1.0.0
     */
    switchCamera: () => Promise<void>;
    /**
     * Update local video view.
     * @see DirectCallVideoView.videoViewId
     *
     * @since 1.0.0
     */
    updateLocalVideoView: (videoViewId: number) => void;
    /**
     * Update remote video view.
     * @see DirectCallVideoView.videoViewId
     *
     * @since 1.0.0
     */
    updateRemoteVideoView: (videoViewId: number) => void;
}
