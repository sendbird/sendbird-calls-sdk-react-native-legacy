//
//  RNCallsInternalError.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/03.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation

let INTERNAL_ERROR_CODE = "RNCALLS_INTERNAL"
enum RNCallsInternalError: Error {
    case queryCreateFailure(_ from: String)
    case invalidParams(_ from: String)
    case notFoundVideoDevice(_ from: String)
    case notFoundVideoView(_ from: String)
    case notFoundDirectCall(_ from: String)
    case noResponse(_ from: String)
    case tokenParseFailure(_ from: String)
    case notFoundRoom(_ from: String)
    case unknown(_ from: String)
    
    var message: String {
        switch self {
        case let .queryCreateFailure(from: from):
            return "[\(from)] Create query failure"
        case let .invalidParams(from: from):
            return "[\(from)] Invalid parameters"
        case let .notFoundVideoDevice(from: from):
            return "[\(from)] Cannot found device with specific id]"
        case let .notFoundVideoView(from: from):
            return "[\(from)] Cannot found video view"
        case let .notFoundDirectCall(from: from):
            return "[\(from)] There is no DirectCall"
        case let .noResponse(from: from):
            return "[\(from)] There is no response"
        case let .tokenParseFailure(from: from):
            return "[\(from)] Failed to parse token, check token format"
        case let .notFoundRoom(from: from):
            return "[\(from)] There is no Room"
        case let .unknown(from: from):
            return "[\(from)] Unexpected error"
        }
    }
}
