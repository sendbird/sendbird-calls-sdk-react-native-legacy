//
//  RNSBDirectCallVideoViewManager.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/11.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import React
import SendBirdCalls

@objc(RNSBDirectCallVideoViewManager)
class RNSBDirectCallVideoViewManager: RCTViewManager {
    override var methodQueue: DispatchQueue! {
        return DispatchQueue.main
    }
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    override func view() -> UIView! {
        return RNSBDirectCallVideoView()
    }
}
