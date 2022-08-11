import type { AudioDevice, EnterParams, GroupCallMethods, RoomListener, RoomProperties } from '../types';
import type NativeBinder from './NativeBinder';
import { LocalParticipant, Participant } from './Participant';
export interface InternalEvents<T> {
    pool: Partial<T>[];
    emit: (event: keyof T, ...args: unknown[]) => void;
    add: (listener: Partial<T>) => () => void;
}
export declare class Room implements RoomProperties, GroupCallMethods {
    /** @internal **/
    private static pool;
    /** @internal **/
    static poolRelease(): void;
    /** @internal **/
    static get(binder: NativeBinder, props: RoomProperties): Room;
    constructor(binder: NativeBinder, props: RoomProperties);
    private _binder;
    private _props;
    private _localParticipant;
    private _participants;
    private _remoteParticipants;
    private _internalEvents;
    private _updateInternal;
    get roomId(): string;
    get state(): import("../types").RoomState;
    get type(): import("../types").RoomType;
    get customItems(): Record<string, string>;
    get participants(): Participant[];
    get localParticipant(): LocalParticipant | null;
    get remoteParticipants(): Participant[];
    get android_availableAudioDevices(): import("../types").AudioDeviceType[];
    get android_currentAudioDevice(): import("../types").AudioDeviceType | null;
    get createdAt(): number;
    get createdBy(): string;
    /**
     * Add GroupCall Room listener.
     * supports multiple listeners.
     *
     * @since 1.0.0
     */
    addListener: (listener: Partial<RoomListener>) => () => void;
    /**
     * Enter the room
     * Will trigger {@link RoomListener.onRemoteParticipantEntered} method of remote participants after successfully entering the room.
     * If a remote participant entered the room, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    enter: (options?: EnterParams) => Promise<void>;
    /**
     * Exit from the room
     * Will trigger {@link RoomListener.onRemoteParticipantExited} method of remote participants after successfully exiting the room.
     * If a remote participant exited the room, the local user will be notified via the same method.
     *
     * @since 1.0.0
     */
    exit(): void;
    /**
     * Selects audio device
     * Changes current audio device asynchronously.
     * Will trigger {@link RoomListener.onAudioDeviceChanged} method of the local participant after successfully changing the audio device.
     *
     * @platform Android
     * @since 1.0.0
     */
    android_selectAudioDevice: (device: AudioDevice) => Promise<void>;
}
