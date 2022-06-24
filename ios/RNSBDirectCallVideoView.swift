//
//  RNSBDirectCallVideoView.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/11.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import React
import SendBirdCalls

enum ViewType: String {
    case remote
    case local
}

@objc(RNSBDirectCallVideoView)
class RNSBDirectCallVideoView: BaseVideoView {
    @objc var callId: String? = nil
    @objc var viewType: String = ViewType.local.rawValue
    
    private func getCall(id: String?) -> DirectCall? {
        guard let callId = callId else { return nil }
        
        if let call = SendBirdCall.getCall(forCallId: callId) {
            return call
        }
        
        if let uuid = UUID(uuidString: callId), let call = SendBirdCall.getCall(forUUID: uuid) {
            return call
        }
        
        return nil
    }
    
    
    override func didSetProps(_ changedProps: [String]!) {
        if changedProps.contains("viewType") {
            setViewType()
        }
        
        if changedProps.contains("callId") {
            setCallId()
        }
    }
    
    private func setViewType() {
        guard let call = getCall(id: self.callId),
              let viewType = ViewType(rawValue: self.viewType.lowercased()) else { return }
        
        switch(viewType){
        case .remote:
            call.updateRemoteVideoView(self.surface)
        case .local:
            call.updateLocalVideoView(self.surface)
        }
    }
    
    private func setCallId() {
        guard let call = getCall(id: self.callId),
              let viewType = ViewType(rawValue: self.viewType.lowercased()) else { return }
        
        switch(viewType){
        case .remote:
            call.updateRemoteVideoView(self.surface)
        case .local:
            call.updateLocalVideoView(self.surface)
        }
    }
    
}
