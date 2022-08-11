//
//  RNSBGroupCallVideoViewManager.swift
//  RNSendbirdCalls
//
//  Created by James Kim on 2022/07/12.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import React
import SendBirdCalls

@objc(RNSBGroupCallVideoViewManager)
class RNSBGroupCallVideoViewManager: RCTViewManager {
    override var methodQueue: DispatchQueue! {
        return DispatchQueue.main
    }
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    override func view() -> UIView! {
        return RNSBGroupCallVideoView()
    }
}
