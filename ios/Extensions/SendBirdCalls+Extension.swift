//
//  SendBirdCalls+Extension.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/12.
//  Copyright © 2022 Sendbird Inc. All rights reserved.
//

import UIKit
import SendBirdCalls

// MARK: SendBirdCalls.SoundType
extension SendBirdCalls.SoundType {
    var asString: String {
        switch self {
        case .dialing:
            return "DIALING"
        case .ringing:
            return "RINGING"
        case .reconnecting:
            return "RECONNECTING"
        case .reconnected:
            return "RECONNECTED"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "DIALING":
            self = .dialing
        case "RINGING":
            self = .ringing
        case "RECONNECTING":
            self = .reconnecting
        case "RECONNECTED":
            self = .reconnected
        default:
            return nil
        }
    }
}

// MARK: SendBirdCalls.Participant.State
extension SendBirdCalls.Participant.State {
    var asString: String {
        switch self {
        case .connected:
            return "CONNECTED"
        case .entered:
            return "ENTERED"
        case .exited:
            return "EXITED"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "CONNECTED":
            self = .connected
        case "ENTERED":
            self = .entered
        case "EXITED":
            self = .exited
        default:
            return nil
        }
    }
}

// MARK: SendBirdCalls.RoomType
extension SendBirdCalls.RoomType {
    var asString: String {
        switch self {
        case .smallRoomForVideo:
            return "SMALL_ROOM_FOR_VIDEO"
        case .largeRoomForAudioOnly:
            return "LARGE_ROOM_FOR_AUDIO_ONLY"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "SMALL_ROOM_FOR_VIDEO":
            self = .smallRoomForVideo
        case "LARGE_ROOM_FOR_AUDIO_ONLY":
            self = .largeRoomForAudioOnly
        default:
            return nil
        }
    }
}

// MARK: SendBirdCalls.Room.State
extension SendBirdCalls.Room.State {
    var asString: String {
        switch self {
        case .deleted:
            return "DELETED"
        case .open:
            return "OPEN"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "DELETED":
            self = .deleted
        case "OPEN":
            self = .open
        default:
            return nil
        }
    }
}

// MARK: SendBirdCalls.DirectCallLogListQuery.UserRoleFilter
extension SendBirdCalls.DirectCallLogListQuery.UserRoleFilter {
    var asString: String {
        switch self {
        case .all:
            return "ALL"
        case .callee:
            return "CALLEE"
        case .caller:
            return "CALLER"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "ALL":
            self = .all
        case "CALLEE":
            self = .callee
        case "CALLER":
            self = .caller
        default:
            return nil
        }
    }
}

// MARK: RecordingStatus
extension RecordingStatus {
    var asString: String {
        switch self {
        case .recording:
            return "RECORDING"
        case .none:
            return "NONE"
        @unknown default:
            fatalError()
        }
    }
    init?(fromString: String) {
        switch fromString {
        case "RECORDING":
            self = .recording
        case "NONE":
            self = .none
        default:
            return nil
        }
    }
}


// MARK: VideoDevice.Position
extension VideoDevice.Position {
    var asString: String {
        switch self {
        case .back:
            return "BACK"
        case .front:
            return "FRONT"
        case .unspecified:
            return "UNSPECIFIED"
        @unknown default:
            fatalError()
        }
    }
    
    init?(fromString: String) {
        switch fromString {
        case "BACK":
            self = .back
        case "FRONT":
            self = .front
        default:
            return nil
        }
    }
}

// MARK: DirectCall.UserRole
extension DirectCall.UserRole {
    var asString: String {
        switch self {
        case .callee:
            return "CALLEE"
        case .caller:
            return "CALLER"
        @unknown default:
            fatalError()
        }
    }
    
    init?(fromString: String) {
        switch fromString {
        case "CALLEE":
            self = .callee
        case "CALLER":
            self = .caller
        default:
            return nil
        }
    }
}

// MARK: DirectCallEndResult
extension DirectCallEndResult {
    enum DirectCallEndResultHelper: String {
        case NONE
        case NO_ANSWER
        case CANCELED
        case DECLINED
        case COMPLETED
        case TIMED_OUT
        case CONNECTION_LOST
        case UNKNOWN
        case DIAL_FAILED
        case ACCEPT_FAILED
        case OTHER_DEVICE_ACCEPTED
        
        init(origin: DirectCallEndResult) {
            switch origin {
            case .none:
                self = .NONE
            case .noAnswer:
                self = .NO_ANSWER
            case .canceled:
                self = .CANCELED
            case .declined:
                self = .DECLINED
            case .completed:
                self = .COMPLETED
            case .timedOut:
                self = .TIMED_OUT
            case .connectionLost:
                self = .CONNECTION_LOST
            case .unknown:
                self = .UNKNOWN
            case .dialFailed:
                self = .DIAL_FAILED
            case .acceptFailed:
                self = .ACCEPT_FAILED
            case .otherDeviceAccepted:
                self = .OTHER_DEVICE_ACCEPTED
            @unknown default:
                self = .UNKNOWN
            }
        }
        
        var asOrigin: DirectCallEndResult {
            switch(self){
            case .NONE:
                return .none
            case .NO_ANSWER:
                return .noAnswer
            case .CANCELED:
                return .canceled
            case .DECLINED:
                return .declined
            case .COMPLETED:
                return .completed
            case .TIMED_OUT:
                return .timedOut
            case .CONNECTION_LOST:
                return .connectionLost
            case .UNKNOWN:
                return .unknown
            case .DIAL_FAILED:
                return .dialFailed
            case .ACCEPT_FAILED:
                return .acceptFailed
            case .OTHER_DEVICE_ACCEPTED:
                return .otherDeviceAccepted
            }
        }
    }
    
    var asString: String {
        return DirectCallEndResultHelper(origin: self).rawValue
    }
    init(fromString: String) {
        self = DirectCallEndResultHelper(rawValue: fromString)?.asOrigin ?? .unknown
    }
}
