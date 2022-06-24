//
//  CallsMediaDeviceProtocol.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/23.
//

import Foundation

enum ControllableModuleType {
    case directCall
    case groupCall
    
    var asString: String {
        switch self {
        case .directCall:
            return "DIRECT_CALL"
        case .groupCall:
            return "GROUP_CALL"
        }
    }
    
    init?(fromString: String) {
        switch fromString {
        case "DIRECT_CALL":
            self = .directCall
        case "GROUP_CALL":
            self = .groupCall
        default:
            return nil
        }
    }
}

protocol MediaDeviceControlProtocol {
    func muteMicrophone(_ type: String, _ identifier: String)
    func unmuteMicrophone(_ type: String, _ identifier: String)
    func stopVideo(_ type: String, _ identifier: String)
    func startVideo(_ type: String, _ identifier: String)
    func switchCamera(_ type: String, _ identifier: String, _ promise: Promise)
    func selectVideoDevice(_ type: String, _ identifier: String, _ device: [String: String], _ promise: Promise)
}
