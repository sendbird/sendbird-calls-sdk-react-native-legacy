import type { DirectCallListener } from '@sendbird/calls-react-native';
export declare const noop: () => void;
export declare const noopDirectCallListener: DirectCallListener;
export declare const noopRoomListener: {
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
