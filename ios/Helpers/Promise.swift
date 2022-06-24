//
//  Promise.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/04.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls
import React

class Promise {
    private let resolveBlock: RCTPromiseResolveBlock
    private let rejectBlock: RCTPromiseRejectBlock
    
    init(_ resolve: @escaping RCTPromiseResolveBlock, _ reject: @escaping RCTPromiseRejectBlock) {
        self.resolveBlock = resolve
        self.rejectBlock = reject;
    }
    
    func resolve() {
        resolveBlock(nil)
    }
    
    func resolve(_ value: Any?) {
        resolveBlock(value)
    }
    
    func reject(_ error: RNCallsInternalError) {
        rejectBlock(INTERNAL_ERROR_CODE, error.message, error)
    }
    
    func reject(_ error: SBCError) {
        rejectBlock(String(error.errorCode.rawValue), error.localizedDescription, error)
    }
    
    func reject(_ error: NSError) {
        rejectBlock(INTERNAL_ERROR_CODE, error.localizedDescription, error)
    }
    
    func reject(_ error: Error) {
        rejectBlock(INTERNAL_ERROR_CODE, error.localizedDescription, error)
    }
}
