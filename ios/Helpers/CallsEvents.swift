//
//  CallsEvents.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/07.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import React

class CallsEvents {
    enum Event {
        case `default`(_ type: DefaultEventType)
        case directCall(_ type: DirectCallEventType)
        case groupCall(_ type: GroupCallEventType)
        
        var name: String {
            switch self {
            case .`default`:
                return "sendbird.call.default"
            case .directCall:
                return "sendbird.call.direct"
            case .groupCall:
                return "sendbird.call.group"
            }
        }
        
        var type: String {
            switch self {
            case let .default(type: type):
                return "\(self.name).\(type.rawValue)"
            case let .directCall(type: type):
                return "\(self.name).\(type.rawValue)"
            case let .groupCall(type: type):
                return "\(self.name).\(type.rawValue)"
            }
        }
    }
    
    enum DefaultEventType: String, CaseIterable {
        case onRinging
    }
    
    enum DirectCallEventType: String, CaseIterable {
        case onEstablished
        case onConnected
        case onReconnecting
        case onReconnected
        case onEnded
        case onRemoteAudioSettingsChanged
        case onRemoteVideoSettingsChanged
        case onLocalVideoSettingsChanged
        case onRemoteRecordingStatusChanged
        case onAudioDeviceChanged
        case onCustomItemsUpdated
        case onCustomItemsDeleted
        case onUserHoldStatusChanged
    }
    
    enum GroupCallEventType: String, CaseIterable {
        case onDeleted
        case onError
        case onRemoteParticipantEntered
        case onRemoteParticipantExited
        case onRemoteParticipantStreamStarted
        case onAudioDeviceChanged
        case onRemoteVideoSettingsChanged
        case onRemoteAudioSettingsChanged
        case onCustomItemsUpdated
        case onCustomItemsDeleted
    }
    
    static let shared = CallsEvents()
    
    var hasListeners = false
    var pendingEvents: [Dictionary<String, Any?>] = []
    var eventEmitter: RCTEventEmitter!
    var bridge: RCTBridge {
        get {
            self.eventEmitter.bridge
        }
    }
}

// MARK: RCTEventEmitter
extension CallsEvents {
    func startObserving() {
        hasListeners = true
        DispatchQueue.main.async {
            for event in self.pendingEvents {
                if let eventName = event["name"] as? CallsEvents.Event, let data = event["data"] as? Any {
                    self.sendEvent(eventName, data, event["additionalData"] ?? nil)
                }
            }
            self.pendingEvents.removeAll()
        }
    }
    
    func stopObserving() {
        hasListeners = false
    }
}

// MARK: Custom event sender
extension CallsEvents {
    func sendEvent(_ event: Event, _ data: Any) {
        if (hasListeners && eventEmitter != nil) {
            eventEmitter.sendEvent(withName: event.name, body: [
                "eventType": event.type,
                "data": data,
            ])
        } else {
            pendingEvents.append([
                "name": event,
                "data": data
            ])
        }
    }
    
    func sendEvent(_ event: Event, _ data: Any, _ additionalData: Any?) {
        if (hasListeners && eventEmitter != nil) {
            eventEmitter.sendEvent(withName: event.name, body: [
                "eventType": event.type,
                "data": data,
                "additionalData": additionalData ?? [:]
            ])
        } else {
            pendingEvents.append([
                "name": event,
                "data": data,
                "additionalData": additionalData
            ])
        }
    }
}
