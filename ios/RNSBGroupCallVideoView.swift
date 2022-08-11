//
//  RNSBGroupCallVideoView.swift
//  RNSendbirdCalls
//
//  Created by James Kim on 2022/07/12.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import React
import SendBirdCalls

@objc(RNSBGroupCallVideoView)
class RNSBGroupCallVideoView: BaseVideoView {
    @objc var roomId: String? = nil
    @objc var participantId: String? = nil
    @objc var state: String = SendBirdCalls.Participant.State.entered.asString
    
    private func getRoom(id: String?) -> Room? {
        guard let roomId = roomId else { return nil }
        
        if let room = SendBirdCall.getCachedRoom(by: roomId) {
            return room
        }
                
        return nil
    }
    
    
    override func didSetProps(_ changedProps: [String]!) {
        super.didSetProps(changedProps)
        
        if changedProps.contains("roomId") {
            updateView()
        }
        
        if changedProps.contains("participantId") {
            updateView()
        }
        
        if changedProps.contains("state") {
            if SendBirdCalls.Participant.State.init(fromString: self.state.uppercased()) != nil {
                updateView()
            }
        }
    }
    
    private func updateView() {
        guard let room = getRoom(id: self.roomId) else { return }
        guard let participant = room.participants.first(where: { $0.participantId == self.participantId }) else { return }
        participant.videoView = self.surface
    }

}
