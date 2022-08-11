//
//  CallsModule+GroupCall.swift
//  RNSendbirdCalls
//
//  Created by James Kim on 2022/07/03.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls
import CallKit

protocol CallsGroupCallModuleProtocol: MediaDeviceControlProtocol {
    func enter(_ roomId: String, _ options: [String: Any?], _ promise: Promise)
    func exit(_ roomId: String)
}

// MARK: GroupCallMethods
class CallsGroupCallModule: CallsBaseModule, CallsGroupCallModuleProtocol {
    func enter(_ roomId: String, _ options: [String: Any?], _ promise: Promise) {
        if let room = try? CallsUtils.findRoom(roomId) {
            var isAudioEnabled = true
            var isVideoEnabled = true
            
            if let audioEnabled = options["audioEnabled"] as? Bool { isAudioEnabled = audioEnabled }
            if let videoEnabled = options["videoEnabled"] as? Bool { isVideoEnabled = videoEnabled }
            
            let params = Room.EnterParams(isVideoEnabled: isVideoEnabled, isAudioEnabled: isAudioEnabled)
            
            room.enter(with: params) { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        } else {
            promise.reject(RNCallsInternalError.notFoundRoom("groupCall/enter"))
        }
    }
    
    func exit(_ roomId: String) {
        CallsUtils.safeRun {
            try CallsUtils.findRoom(roomId).exit()
        }
    }
}

// MARK: GroupCall MediaDeviceControl
extension CallsGroupCallModule {
    func switchCamera(_ type: String, _ roomId: String, _ promise: Promise) {
        CallsUtils.safeRun {
            let room = try CallsUtils.findRoom(roomId)
            room.localParticipant?.switchCamera { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        }
    }
    
    func startVideo(_ type: String, _ roomId: String) {
        CallsUtils.safeRun {
            let room = try CallsUtils.findRoom(roomId)
            room.localParticipant?.startVideo()
        }
    }
    
    func stopVideo(_ type: String, _ roomId: String) {
        CallsUtils.safeRun {
            let room = try CallsUtils.findRoom(roomId)
            room.localParticipant?.stopVideo()
        }
    }
    
    func muteMicrophone(_ type: String, _ roomId: String) {
        CallsUtils.safeRun {
            let room = try CallsUtils.findRoom(roomId)
            room.localParticipant?.muteMicrophone()
        }
    }
    
    func unmuteMicrophone(_ type: String, _ roomId: String) {
        CallsUtils.safeRun {
            let room = try CallsUtils.findRoom(roomId)
            room.localParticipant?.unmuteMicrophone()
        }
    }
    
    func selectVideoDevice(_ type: String, _ roomId: String, _ device: [String: String], _ promise: Promise) {
        // NOOP
        promise.resolve()
    }
}
