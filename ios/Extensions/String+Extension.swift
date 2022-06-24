//
//  String+Extension.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/05/04.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation

extension String {
    func toDataFromHexString() throws -> Data {
        if (!self.count.isMultiple(of: 2)) {
            throw RNCallsInternalError.tokenParseFailure("toDataFromHexString")
        }
        
        var hex = self
        var data = Data()
        
        while(hex.count > 0) {
            let subIndex = hex.index(hex.startIndex, offsetBy: 2)
            let c = String(hex[..<subIndex])
            hex = String(hex[subIndex...])
            var ch: UInt32 = 0
            Scanner(string: c).scanHexInt32(&ch)
            var char = UInt8(ch)
            data.append(&char, count: 1)
        }
        
        return data
    }
}
