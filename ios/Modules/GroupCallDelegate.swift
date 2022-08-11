//
//  GroupCallDelegate.swift
//  RNSendbirdCalls
//
//  Created by James Kim on 2022/07/05.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import SendBirdCalls
import AVFoundation

class GroupCallDelegate: RoomDelegate {
    static var delegates: [String: GroupCallDelegate] = [:]
    static func get(_ room: Room) -> GroupCallDelegate {
        if delegates[room.roomId] == nil {
            delegates[room.roomId] = GroupCallDelegate(room)
        }
        return delegates[room.roomId]!
    }
    static func invalidate() {
        GroupCallDelegate.delegates.values.forEach { $0.room.removeAllDelegates() }
        GroupCallDelegate.delegates.removeAll()
    }
    
    var room: Room
    init(_ room: Room) {
        self.room = room
    }
    
    func didDelete() {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onDeleted),
                                         CallsUtils.convertRoomToDict(self.room)!)
        }
    }
    
    func didReceiveError(_ error: SBCError, participant: Participant?) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onError),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant),
                                            "errorCode": String(error.errorCode.rawValue),
                                            "errorMessage": error.localizedDescription
                                         ])
        }
    }
    
    func didRemoteParticipantEnter(_ participant: RemoteParticipant) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onRemoteParticipantEntered),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant)
                                         ])
        }
    }
    
    func didRemoteParticipantExit(_ participant: RemoteParticipant) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onRemoteParticipantExited),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant)
                                         ])
        }
    }
    
    func didRemoteParticipantStreamStart(_ participant: RemoteParticipant) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onRemoteParticipantStreamStarted),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant)
                                         ])
        }
    }
       
    func didAudioDeviceChange(_ room: Room, session: AVAudioSession, previousRoute: AVAudioSessionRouteDescription, reason: AVAudioSession.RouteChangeReason) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onAudioDeviceChanged),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "reason": reason.rawValue,
                                            "currentRoute": CallsUtils.convertAVRouteToDict(session.currentRoute),
                                            "previousRoute": CallsUtils.convertAVRouteToDict(previousRoute)
                                         ])
        }
    }
    
    func didRemoteVideoSettingsChange(_ participant: RemoteParticipant) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onRemoteVideoSettingsChanged),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant)
                                         ])
        }
    }
    
    func didRemoteAudioSettingsChange(_ participant: RemoteParticipant) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onRemoteAudioSettingsChanged),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "participant": CallsUtils.convertParticipantToDict(participant)
                                         ])
        }
    }
    
    func didCustomItemsUpdate(updatedKeys: [String]) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onCustomItemsUpdated),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "updatedKeys": updatedKeys
                                         ])
        }
    }
    
    func didCustomItemsDelete(deletedKeys: [String]) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.groupCall(.onCustomItemsDeleted),
                                         CallsUtils.convertRoomToDict(self.room)!,
                                         [
                                            "deletedKeys": deletedKeys
                                         ])
        }
    }
}
