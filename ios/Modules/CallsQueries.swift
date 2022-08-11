//
//  CallsQueries.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/15.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import SendBirdCalls

enum QueryType {
    case directCallLog
    case roomList
    
    var asString: String {
        switch self {
        case .directCallLog:
            return "DIRECT_CALL_LOG"
        case .roomList:
            return "ROOM_LIST"
        }
    }
    
    init?(fromString: String) {
        switch fromString {
        case "DIRECT_CALL_LOG":
            self = .directCallLog
        case "ROOM_LIST":
            self = .roomList
        default:
            return nil
        }
    }
}

class CallsQueries: NSObject {
    var directCallLogQueries: [String: DirectCallLogListQuery] = [:]
    var roomListQueries: [String: RoomListQuery] = [:]
    
    func createDirectCallLogListQuery(_ params: [String: Any], _ promise: Promise) {
        let queryParams = DirectCallLogListQuery.Params()
        
        if let myRole = params["myRole"] as? String,
           let myRoleFilter = DirectCallLogListQuery.UserRoleFilter.init(fromString: myRole)  {
            queryParams.myRole = myRoleFilter
        }
        
        if let limit = params["limit"] as? NSNumber {
            queryParams.limit = Int32(truncating: limit)
        }
        
        if let endResults = params["endResults"] as? Array<String> {
            queryParams.endResults = endResults.map { DirectCallEndResult.init(fromString: $0) }
        }
        
        guard let query = SendBirdCall.createDirectCallLogListQuery(with: queryParams) else {
            return promise.reject(.queryCreateFailure("createDirectCallLogListQuery"))
        }
        
        let key = query.hash.description
        directCallLogQueries[key] = query
        promise.resolve(key)
    }
    
    func createRoomListQuery(_ params: [String: Any], _ promise: Promise) {
        let queryParams = RoomListQuery.Params()
        
        if let limit = params["limit"] as? NSNumber {
            queryParams.setLimit(UInt(truncating: limit))
        }
        
        if let createdByUserIds = params["createdByUserIds"] as? Array<String> {
            queryParams.setCreatedByUserIds(createdByUserIds)
        }
        
        if let roomIds = params["roomIds"] as? Array<String> {
            queryParams.setRoomIds(roomIds)
        }
        
        if let state = params["state"] as? String,
           let roomState = SendBirdCalls.Room.State(fromString: state) {
            queryParams.setState(roomState)
        }
        
        if let type = params["type"] as? String,
           let roomType = SendBirdCalls.RoomType(fromString: type) {
            queryParams.setType(roomType)
        }
        
        if let createdAt = params["createdAt"] as? [String: Any] {
            let range = SendBirdRange()
            if let lowerBound = createdAt["lowerBound"] as? NSNumber {
                range.lowerBound = Int64(truncating: lowerBound)
            }
            if let upperBound = createdAt["upperBound"] as? NSNumber {
                range.upperBound = Int64(truncating: upperBound)
            }
            queryParams.createdAtRange = range
        }
        
        if let count = params["currentParticipantCount"] as? [String: Any] {
            let range = SendBirdRange()
            if let lowerBound = count["lowerBound"] as? NSNumber {
                range.lowerBound = Int64(truncating: lowerBound)
            }
            if let upperBound = count["upperBound"] as? NSNumber {
                range.upperBound = Int64(truncating: upperBound)
            }
            queryParams.currentParticipantCountRange = range
        }
        
        guard let query = SendBirdCall.createRoomListQuery(with: queryParams) else {
            return promise.reject(.queryCreateFailure("createRoomListQuery"))
        }
        
        let key = query.hash.description
        roomListQueries[key] = query
        promise.resolve(key)
    }
    
    func queryNext(_ key: String, _ type: String, _ promise: Promise) {
        guard let type = QueryType(fromString: type) else {
            return promise.resolve([ "hasNext": false,"result": [] ])
        }
        
        switch type {
        case .directCallLog:
            guard let query = directCallLogQueries[key] else { return }
            query.next { list, error in
                if let error = error {
                    promise.reject(error)
                }
                
                if let list = list {
                    promise.resolve([
                        "hasNext": query.hasNext,
                        "result": list.map {
                            CallsUtils.convertDirectCallLogToDict($0)
                        }
                    ])
                }
            }
            
        case .roomList:
            guard let query = roomListQueries[key] else { return }
            query.next { list, error in
                if let error = error {
                    promise.reject(error)
                }
                
                if let list = list {
                    promise.resolve([
                        "hasNext": query.hasNext,
                        "result": list.map {
                            $0.addDelegate(GroupCallDelegate.get($0), identifier: $0.roomId)
                            CallsUtils.convertRoomToDict($0)
                        }
                    ])
                }
            }
        }
    }
    
    func queryRelease(_ key: String) {
        directCallLogQueries.removeValue(forKey: key)
        roomListQueries.removeValue(forKey: key)
    }
}
