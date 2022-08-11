import type { DirectCallListener } from '../types';
export declare const noop: () => void;
export declare const noopDirectCallListener: DirectCallListener;
export declare const noopRoomListener: {
    onPropertyUpdatedManually: () => void;
    onDeleted: () => void;
    onError: () => void;
    onRemoteParticipantEntered: () => void;
    onRemoteParticipantExited: () => void;
    onRemoteParticipantStreamStarted: () => void;
    onAudioDeviceChanged: () => void;
    onRemoteVideoSettingsChanged: () => void;
    onRemoteAudioSettingsChanged: () => void;
    onCustomItemsUpdated: () => void;
    onCustomItemsDeleted: () => void;
};
