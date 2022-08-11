//
//  CallsModule+DirectCall.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/06.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls
import CallKit
import AVFoundation

protocol CallsDirectCallModuleProtocol: MediaDeviceControlProtocol {
    func accept(_ callId: String, _ options: [String: Any?], _ holdActiveCall: Bool, _ promise: Promise)
    func end(_ callId: String, _ promise: Promise)
    func updateLocalVideoView(_ callId: String, _ videoViewId: NSNumber)
    func updateRemoteVideoView(_ callId: String, _ videoViewId: NSNumber)
}

// MARK: DirectCallMethods
class CallsDirectCallModule: CallsBaseModule, CallsDirectCallModuleProtocol {
    func accept(_ callId: String, _ options: [String : Any?], _ holdActiveCall: Bool, _ promise: Promise) {
        if let directCall = try? CallsUtils.findDirectCallBy(callId) {
            let callOptions = CallsUtils.convertDictToCallOptions(options)
            let acceptParams = AcceptParams(callOptions: callOptions, holdActiveCall: holdActiveCall)
            
            directCall.accept(with: acceptParams)
            promise.resolve()
        } else {
            promise.reject(RNCallsInternalError.notFoundDirectCall("directCall/accept"))
        }
    }
    
    func end(_ callId: String, _ promise: Promise) {
        if let directCall = try? CallsUtils.findDirectCallBy(callId) {
            directCall.end {
                promise.resolve()
            }
        } else {
            promise.reject(RNCallsInternalError.notFoundDirectCall("directCall/end"))
        }
    }
    
    func updateLocalVideoView(_ callId: String, _ videoViewId: NSNumber) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            let videoView = try CallsUtils.findViewBy(CallsEvents.shared.bridge, videoViewId)
            directCall.updateLocalVideoView(videoView.surface)
        }
    }
    
    func updateRemoteVideoView(_ callId: String, _ videoViewId: NSNumber) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            let videoView = try CallsUtils.findViewBy(CallsEvents.shared.bridge, videoViewId)
            directCall.updateRemoteVideoView(videoView.surface)
        }
    }
}

// MARK: DirectCall MediaDeviceControl
extension CallsDirectCallModule {
    func switchCamera(_ type: String, _ callId: String, _ promise: Promise) {
        if let directCall = try? CallsUtils.findDirectCallBy(callId) {
            directCall.switchCamera { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        } else {
            promise.reject(RNCallsInternalError.notFoundDirectCall("directCall/switchCamera"))
        }
    }
    
    func startVideo(_ type: String, _ callId: String) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            directCall.startVideo()
        }
    }
    
    func stopVideo(_ type: String, _ callId: String) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            directCall.stopVideo()
        }
    }
    
    func muteMicrophone(_ type: String, _ callId: String) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            directCall.muteMicrophone()
        }
    }
    
    func unmuteMicrophone(_ type: String, _ callId: String) {
        CallsUtils.safeRun {
            let directCall = try CallsUtils.findDirectCallBy(callId)
            directCall.unmuteMicrophone()
        }
    }
    func selectVideoDevice(_ type: String, _ callId: String, _ device: [String: String], _ promise: Promise) {
        let from = "directCall/selectVideoDevice"
        guard let deviceId = device["deviceId"], let _ = device["position"] else {
            return promise.reject(RNCallsInternalError.invalidParams(from))
        }
        guard let directCall = try? CallsUtils.findDirectCallBy(callId) else {
            return promise.reject(RNCallsInternalError.notFoundDirectCall(from))
        }
        guard let videoDevice = directCall.availableVideoDevices.first(where: { $0.uniqueId == deviceId }) else {
            return promise.reject(RNCallsInternalError.notFoundVideoDevice(from))
        }
        
        directCall.selectVideoDevice(videoDevice) { error in
            if let error = error {
                promise.reject(error)
            } else {
                promise.resolve()
            }
        }
    }
    
}

// MARK: DirectCallDelegate
extension CallsDirectCallModule: DirectCallDelegate {
    func didAudioDeviceChange(_ call: DirectCall, session: AVAudioSession, previousRoute: AVAudioSessionRouteDescription, reason: AVAudioSession.RouteChangeReason) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onAudioDeviceChanged),
                                         CallsUtils.convertDirectCallToDict(call),
                                         [
                                            "reason": reason.rawValue,
                                            "currentRoute": CallsUtils.convertAVRouteToDict(session.currentRoute),
                                            "previousRoute": CallsUtils.convertAVRouteToDict(previousRoute)
                                         ])
        }
    }
    
    func didConnect(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onConnected),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    func didDeleteCustomItems(call: DirectCall, deletedKeys: [String]) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onCustomItemsDeleted),
                                         CallsUtils.convertDirectCallToDict(call),
                                         deletedKeys)
        }
    }
    
    func didUpdateCustomItems(call: DirectCall, updatedKeys: [String]) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onCustomItemsUpdated),
                                         CallsUtils.convertDirectCallToDict(call),
                                         updatedKeys)
        }
    }
    
    func didEnd(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onEnded),
                                         CallsUtils.convertDirectCallToDict(call))
            // Remove manually from native side
            call.delegate = nil
        }
    }
    
    func didEstablish(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onEstablished),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    // func didLocalVideoSettingsChange - Not implemented in iOS
    
    func didReconnect(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onReconnected),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    func didStartReconnecting(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onReconnecting),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    func didRemoteAudioSettingsChange(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onRemoteAudioSettingsChanged),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    func didRemoteRecordingStatusChange(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onRemoteRecordingStatusChanged),
                                         CallsUtils.convertDirectCallToDict(call))}
    }
    
    func didRemoteVideoSettingsChange(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onRemoteVideoSettingsChanged),
                                         CallsUtils.convertDirectCallToDict(call))
        }
    }
    
    func didUserHoldStatusChange(_ call: DirectCall, isLocalUser: Bool, isUserOnHold: Bool) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.directCall(.onUserHoldStatusChanged),
                                         CallsUtils.convertDirectCallToDict(call),
                                         [
                                            "isLocalUser": isLocalUser,
                                            "isUserOnHold": isUserOnHold
                                         ])
        }
    }
}
