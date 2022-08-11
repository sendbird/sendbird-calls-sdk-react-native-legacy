import type { LocalParticipantMethods, ParticipantProperties, RoomListener } from '../types';
import type NativeBinder from './NativeBinder';
import type { InternalEvents } from './Room';
export declare class Participant implements ParticipantProperties {
    /** @internal **/
    static get(props: ParticipantProperties | null, _binder?: NativeBinder, _internalEvents?: InternalEvents<RoomListener>, _roomId?: string): Participant | null;
    constructor(props: ParticipantProperties);
    protected _props: ParticipantProperties;
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
}
export declare class LocalParticipant extends Participant implements LocalParticipantMethods {
    /** @internal **/
    static get(props: ParticipantProperties | null, binder: NativeBinder, internalEvents: InternalEvents<RoomListener>, roomId: string): LocalParticipant | null;
    constructor(props: ParticipantProperties, binder: NativeBinder, internalEvents: InternalEvents<RoomListener>, roomId: string);
    private _binder;
    private _internalEvents;
    private _roomId;
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
