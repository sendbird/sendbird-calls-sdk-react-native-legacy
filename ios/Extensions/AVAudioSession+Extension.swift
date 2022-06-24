//
//  AVAudioSession+Extension.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/11.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import AVFAudio

extension AVAudioSession.Port {
    func asString() -> String {
        switch(self) {
            // Input Ports
        case .lineIn:
            return "lineIn"
        case .builtInMic:
            return "builtInMic"
        case .headsetMic:
            return "headsetMic"
            
            // Output Ports
        case .lineOut:
            return "lineOut"
        case .headphones:
            return "headphones"
        case .bluetoothA2DP:
            return "bluetoothA2DP"
        case .builtInReceiver:
            return "builtInReceiver"
        case .builtInSpeaker:
            return "builtInSpeaker"
        case .HDMI:
            return "HDMI"
        case .airPlay:
            return "airPlay"
        case .bluetoothLE:
            return "bluetoothLE"
            
            // I/O Ports
        case .usbAudio:
            return "usbAudio"
        case .carAudio:
            return "carAudio"
            
        default:
            if #available(iOS 14.0, *) {
                // I/O Ports
                switch(self) {
                case .bluetoothHFP:
                    return "bluetoothHFP"
                case .virtual:
                    return "virtual"
                case .PCI:
                    return "PCI"
                case .fireWire:
                    return "fireWire"
                case .displayPort:
                    return "displayPort"
                case .AVB:
                    return "AVB"
                case .thunderbolt:
                    return "thunderbolt"
                default:
                    return self.rawValue
                }
            } else {
                return self.rawValue
            }
        }
    }
}
