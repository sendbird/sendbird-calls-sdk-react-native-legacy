//
//  CallsModule+Common.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/03.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls
import PushKit

protocol CallsCommonModuleProtocol {
    func addDirectCallSound(_ type: String, _ fileName: String)
    func removeDirectCallSound(_ type: String)
    func setDirectCallDialingSoundOnWhenSilentOrVibrateMode(_ enabled: Bool)
    
    func getCurrentUser(_ promise: Promise)
    func getOngoingCalls(_ promise: Promise)
    func getDirectCall(_ callIdOrUUID: String, _ promise: Promise)
    
    func initialize(_ appId: String) -> Bool
    
    func authenticate(_ authParams: [String: Any?], _ promise: Promise)
    func deauthenticate(_ promise: Promise)
    
    func registerPushToken(_ token: String, _ unique: Bool, _ promise: Promise)
    func unregisterPushToken(_ token: String, _ promise: Promise)
    
    func registerVoIPPushToken(_ token: String, _ unique: Bool, _ promise: Promise)
    func unregisterVoIPPushToken(_ token: String, _ promise: Promise)
    
    func dial(_ calleeId: String, _ isVideoCall: Bool, _ options: [String: Any?], _ promise: Promise)
    
    func fetchRoomById(_ roomId: String, _ promise: Promise)
    func getCachedRoomById(_ roomId: String, _ promise: Promise)
    func createRoom(_ params: [String: Any], _ promise: Promise)
}

class CallsCommonModule: CallsBaseModule, CallsCommonModuleProtocol {
    func addDirectCallSound(_ type: String, _ fileName: String) {
        guard let soundType = SoundType(fromString: type) else { return }
        SendBirdCall.addDirectCallSound(fileName, forType: soundType)
    }
    
    func removeDirectCallSound(_ type: String) {
        guard let soundType = SoundType(fromString: type) else { return }
        SendBirdCall.removeDirectCallSound(forType: soundType)
    }
    
    func setDirectCallDialingSoundOnWhenSilentOrVibrateMode(_ enabled: Bool) {
        SendBirdCall.setDirectCallDialingSoundOnWhenSilentMode(isEnabled: enabled)
    }
    
    func getCurrentUser(_ promise: Promise) {
        DispatchQueue.main.async {
            guard let user = SendBirdCall.currentUser else {
                return promise.resolve()
            }
            promise.resolve(CallsUtils.convertUserToDict(user))
        }
    }
    
    func getOngoingCalls(_ promise: Promise) {
        DispatchQueue.main.async {
            let list = SendBirdCall.getOngoingCalls().map{ CallsUtils.convertDirectCallToDict($0) }
            promise.resolve(list)
        }
    }
    
    func getDirectCall(_ callIdOrUUID: String, _ promise: Promise) {
        DispatchQueue.main.async {
            do {
                let call = try CallsUtils.findDirectCallBy(callIdOrUUID)
                promise.resolve(CallsUtils.convertDirectCallToDict(call))
            } catch {
                promise.reject(error)
            }
        }
    }
    
    
    func initialize(_ appId: String) -> Bool {
        return SendBirdCall.configure(appId: appId)
    }
    
    func authenticate(_ authParams: [String: Any?], _ promise: Promise) {
        let userId = authParams["userId"] as! String
        let authenticateParams = AuthenticateParams(userId: userId)
        
        if let accessToken = authParams["accessToken"] as? String {
            authenticateParams.accessToken = accessToken
        }
        
        SendBirdCall.authenticate(with: authenticateParams) { user, error in
            if let error = error {
                promise.reject(error)
            } else if let user = user {
                promise.resolve(CallsUtils.convertUserToDict(user))
            }
        }
    }
    
    func deauthenticate(_ promise: Promise) {
        SendBirdCall.deauthenticate { error in
            if let error = error {
                promise.reject(error)
            } else {
                promise.resolve()
            }
        }
    }
    
    func registerPushToken(_ token: String, _ unique: Bool, _ promise: Promise) {
        if let dataToken = try? token.toDataFromHexString() {
            SendBirdCall.registerRemotePush(token: dataToken, unique: unique) { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        } else {
            promise.reject(RNCallsInternalError.tokenParseFailure("common/registerPushToken"))
        }
    }
    
    func unregisterPushToken(_ token: String, _ promise: Promise) {
        if let dataToken = try? token.toDataFromHexString() {
            SendBirdCall.unregisterRemotePush(token: dataToken) { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        } else {
            promise.reject(RNCallsInternalError.tokenParseFailure("common/unregisterPushToken"))
        }
    }
    
    func registerVoIPPushToken(_ token: String, _ unique: Bool, _ promise: Promise) {
        if let dataToken = try? token.toDataFromHexString() {
            SendBirdCall.registerVoIPPush(token: dataToken, unique: unique) { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
            }
        } else {
            promise.reject(RNCallsInternalError.tokenParseFailure("common/registerVoIPPushToken"))
        }
    }
    
    func unregisterVoIPPushToken(_ token: String, _ promise: Promise) {
        if let dataToken = try? token.toDataFromHexString() {
            SendBirdCall.unregisterVoIPPush(token: dataToken) { error in
                if let error = error {
                    promise.reject(error)
                } else {
                    promise.resolve()
                }
                
            }
        } else {
            promise.reject(RNCallsInternalError.tokenParseFailure("common/unregisterVoIPPushToken"))
        }
    }
    
    func dial(_ calleeId: String, _ isVideoCall: Bool, _ options: [String : Any?], _ promise: Promise) {
        let callOptions = CallsUtils.convertDictToCallOptions(options)
        
        let dialParams = DialParams(calleeId: calleeId, isVideoCall: isVideoCall, callOptions: callOptions)
        if let channelUrl = options["channelUrl"] as? String {
            dialParams.sendbirdChatOptions = SendBirdChatOptions(channelURL: channelUrl)
        }
        
        SendBirdCall.dial(with: dialParams) { directCall, error in
            if let error = error {
                promise.reject(error)
            } else if let directCall = directCall {
                directCall.delegate = self.root.directCallModule
                promise.resolve(CallsUtils.convertDirectCallToDict(directCall))
            }
        }
    }
    
    func fetchRoomById(_ roomId: String, _ promise: Promise) {
        SendBirdCall.fetchRoom(by: roomId) { room, error in
            if let error = error {
                promise.reject(error)
            } else if let room = room {
                room.addDelegate(GroupCallDelegate.get(room), identifier: room.roomId)
                promise.resolve(CallsUtils.convertRoomToDict(room))
            }
        }
    }
    
    func getCachedRoomById(_ roomId: String, _ promise: Promise) {
        guard let room = SendBirdCall.getCachedRoom(by: roomId) else {
            return promise.resolve(nil)
        }
        promise.resolve(CallsUtils.convertRoomToDict(room))
    }
    
    func createRoom(_ params: [String: Any], _ promise: Promise) {
        let from = "groupCall/createRoom"
        guard let roomTypeString = params["roomType"] as? String,
            let roomType = RoomType(fromString: roomTypeString) else {
            return promise.reject(RNCallsInternalError.invalidParams(from))
        }
        
        let roomParams = RoomParams(roomType: roomType)
        SendBirdCall.createRoom(with: roomParams) { room, error in
            if let error = error {
                promise.reject(error)
            } else if let room = room {
                room.addDelegate(GroupCallDelegate.get(room), identifier: room.roomId)
                promise.resolve(CallsUtils.convertRoomToDict(room))
            }
        }
    }
}
