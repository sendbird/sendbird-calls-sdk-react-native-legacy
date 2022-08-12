import type { LocalParticipantMethods, ParticipantProperties, RoomListener } from '../types';
import type NativeBinder from './NativeBinder';
import { InternalEvents } from './Room';
export declare class LocalParticipant implements ParticipantProperties, LocalParticipantMethods {
    /** @internal **/
    static get(binder: NativeBinder, internalEvents: InternalEvents<RoomListener>, props: ParticipantProperties | null, roomId: string): LocalParticipant | null;
    constructor(binder: NativeBinder, internalEvents: InternalEvents<RoomListener>, props: ParticipantProperties, roomId: string);
    private _binder;
    private _props;
    private _internalEvents;
    private _roomId;
    private _updateInternal;
    get participantId(): string;
    get user(): import("../types").User;
    get state(): import("../types").ParticipantState;
    get enteredAt(): number;
    get exitedAt(): number;
    get duration(): number;
    get isAudioEnabled(): boolean;
    get isVideoEnabled(): boolean;
    get updatedAt(): number;
    /**
     * Mutes the audio of the local user.
     * Will trigger {@link RoomListener.onRemoteAudioSettingsChanged} method of remote participants.
     * If the remote user changes their audio settings, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    muteMicrophone: () => void;
    /**
     * Unmutes the audio of the local user.
     * Will trigger {@link RoomListener.onRemoteAudioSettingsChanged} method of remote participants.
     * If the remote user changes their audio settings, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    unmuteMicrophone: () => void;
    /**
     * Unmutes the audio of the local user.
     * Will trigger {@link RoomListener.onRemoteVideoSettingsChanged} method of remote participants.
     * If the remote user changes their video settings, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    stopVideo: () => void;
    /**
     * Unmutes the audio of the local user.
     * Will trigger {@link RoomListener.onRemoteVideoSettingsChanged} method of remote participants.
     * If the remote user changes their video settings, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    startVideo: () => void;
    /**
     * Toggles the selection between the front and the back camera.
     *
     * on Android, In case of more than two cameras, the next camera will be selected.
     * If the last camera is already selected, the first one will be selected again.
     *
     * @since 1.0.0
     */
    switchCamera: () => Promise<void>;
}
