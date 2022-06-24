import type { User } from './User';
import { JSMediaDeviceControl } from './index';
export interface ParticipantProperties {
    participantId: string;
    user: User;
    state: ParticipantState;
    enteredAt: number;
    exitedAt: number;
    duration: number;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    updatedAt: number;
}
declare type JSLocalParticipantMediaDeviceControl = Pick<JSMediaDeviceControl, 'muteMicrophone' | 'unmuteMicrophone' | 'switchCamera' | 'startVideo' | 'stopVideo'>;
export declare type LocalParticipantMethods = JSLocalParticipantMediaDeviceControl;
export declare enum ParticipantState {
    ENTERED = "ENTERED",
    CONNECTED = "CONNECTED",
    EXITED = "EXITED"
}
export {};
