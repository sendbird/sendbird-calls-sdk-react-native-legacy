//
//  CallsModule.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/03.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls
import CallKit
import React

class CallsBaseModule: NSObject {
    internal var root: CallsModule
    init(root: CallsModule) {
        self.root = root
    }
}

class CallsModule: SendBirdCallDelegate {
    internal var queries = CallsQueries()
    
    internal lazy var commonModule: CallsCommonModule = {
        CallsCommonModule(root: self)
    }()
    
    internal lazy var directCallModule: CallsDirectCallModule = {
        CallsDirectCallModule(root: self)
    }()
    
    internal lazy var groupCallModule: CallsGroupCallModule = {
        CallsGroupCallModule(root: self)
    }()
    
    internal var initialized: Bool {
        get {
            return SendBirdCall.appId != nil
        }
    }
    
    init() {
        SendBirdCall.addDelegate(self, identifier: "sendbird.call.listener")
    }
    
    func invalidate() {
        SendBirdCall.removeDirectCallSound(forType: .ringing)
        SendBirdCall.removeDirectCallSound(forType: .dialing)
        SendBirdCall.removeDirectCallSound(forType: .reconnected)
        SendBirdCall.removeDirectCallSound(forType: .reconnecting)
        
        if(initialized){
            SendBirdCall.deauthenticate(completionHandler: nil)
            SendBirdCall.removeAllDelegates()
            SendBirdCall.removeAllRecordingDelegates()
            SendBirdCall.getOngoingCalls().forEach { $0.end() }
            GroupCallDelegate.invalidate()
        }
    }
    
    func didStartRinging(_ call: DirectCall) {
        DispatchQueue.main.async {
            CallsEvents.shared.sendEvent(.default(.onRinging), CallsUtils.convertDirectCallToDict(call))
            call.delegate = self.directCallModule
        }
    }
}

// MARK: CommonModule extension
extension CallsModule: CallsCommonModuleProtocol {
    func addDirectCallSound(_ type: String, _ fileName: String) {
        commonModule.addDirectCallSound(type, fileName)
    }
    
    func removeDirectCallSound(_ type: String) {
        commonModule.removeDirectCallSound(type)
    }
    
    func setDirectCallDialingSoundOnWhenSilentOrVibrateMode(_ enabled: Bool) {
        commonModule.setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled)
    }
    
    func getCurrentUser(_ promise: Promise) {
        commonModule.getCurrentUser(promise)
    }
    
    func getOngoingCalls(_ promise: Promise) {
        commonModule.getOngoingCalls(promise)
    }
    
    func getDirectCall(_ callIdOrUUID: String, _ promise: Promise) {
        commonModule.getDirectCall(callIdOrUUID, promise)
    }
    
    func initialize(_ appId: String) -> Bool {
        return commonModule.initialize(appId)
    }
    
    func authenticate(_ authParams: [String: Any?], _ promise: Promise) {
        commonModule.authenticate(authParams, promise)
    }
    
    func deauthenticate(_ promise: Promise) {
        commonModule.deauthenticate(promise)
    }
    
    func registerPushToken(_ token: String, _ unique: Bool, _ promise: Promise) {
        commonModule.registerPushToken(token, unique, promise)
    }
    
    func unregisterPushToken(_ token: String, _ promise: Promise) {
        commonModule.unregisterPushToken(token, promise)
    }
    
    func registerVoIPPushToken(_ token: String, _ unique: Bool, _ promise: Promise) {
        commonModule.registerVoIPPushToken(token, unique, promise)
    }
    
    func unregisterVoIPPushToken(_ token: String, _ promise: Promise) {
        commonModule.unregisterVoIPPushToken(token, promise)
    }
    
    func dial(_ calleeId: String, _ isVideoCall: Bool, _ options: [String: Any?], _ promise: Promise) {
        commonModule.dial(calleeId, isVideoCall, options, promise)
    }
    
    func fetchRoomById(_ roomId: String, _ promise: Promise) {
        commonModule.fetchRoomById(roomId, promise)
    }
    
    func getCachedRoomById(_ roomId: String, _ promise: Promise) {
        commonModule.getCachedRoomById(roomId, promise)
    }
    
    func createRoom(_ params: [String: Any], _ promise: Promise) {
        commonModule.createRoom(params, promise)
    }
}

// MARK: MediaDeviceControl extension
extension CallsModule {
    func switchCamera(_ type: String, _ identifier: String, _ promise: Promise) {
        getControllableModule(type)?.switchCamera(type, identifier, promise)
    }
    
    func startVideo(_ type: String, _ identifier: String) {
        getControllableModule(type)?.startVideo(type, identifier)
    }
    
    func stopVideo(_ type: String, _ identifier: String) {
        getControllableModule(type)?.stopVideo(type, identifier)
    }
    
    func muteMicrophone(_ type: String, _ identifier: String) {
        getControllableModule(type)?.muteMicrophone(type, identifier)
    }
    
    func unmuteMicrophone(_ type: String, _ identifier: String) {
        getControllableModule(type)?.unmuteMicrophone(type, identifier)
    }
    
    func selectVideoDevice(_ type: String, _ identifier: String, _ device: [String: String], _ promise: Promise) {
        getControllableModule(type)?.selectVideoDevice(type, identifier, device, promise)
    }
    
    private func getControllableModule(_ type: String) -> MediaDeviceControlProtocol? {
        guard let type = ControllableModuleType(fromString: type) else { return nil }
        
        switch(type) {
        case .directCall:
            return directCallModule
        case .groupCall:
            return groupCallModule
        }
    }
}

// MARK: DirectCallModule extension
extension CallsModule: CallsDirectCallModuleProtocol {
    func accept(_ callId: String, _ options: [String : Any?], _ holdActiveCall: Bool, _ promise: Promise) {
        directCallModule.accept(callId, options, holdActiveCall, promise)
    }
    
    func end(_ callId: String, _ promise: Promise) {
        directCallModule.end(callId, promise)
    }
    
    func updateLocalVideoView(_ callId: String, _ videoViewId: NSNumber) {
        directCallModule.updateLocalVideoView(callId, videoViewId)
    }
    
    func updateRemoteVideoView(_ callId: String, _ videoViewId: NSNumber) {
        directCallModule.updateRemoteVideoView(callId, videoViewId)
    }
}

// MARK: GroupCallModule extension
extension CallsModule: CallsGroupCallModuleProtocol {
    func enter(_ roomId: String, _ options: [String : Any?], _ promise: Promise) {
        groupCallModule.enter(roomId, options, promise)
    }
    
    func exit(_ roomId: String) {
        groupCallModule.exit(roomId)
    }
}

// MARK: Queries extension
extension CallsModule {
    func createDirectCallLogListQuery(_ params: [String: Any], _ promise: Promise) {
        queries.createDirectCallLogListQuery(params, promise)
    }
    func createRoomListQuery(_ params: [String: Any], _ promise: Promise) {
        queries.createRoomListQuery(params, promise)
    }
    func queryNext(_ queryKey: String, _ type: String, _ promise: Promise) {
        queries.queryNext(queryKey, type, promise)
    }
    func queryRelease(_ querKey: String) {
        queries.queryRelease(querKey)
    }
}
