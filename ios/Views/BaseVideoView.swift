//
//  BaseVideoView.swift
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/03.
//  Copyright © 2022 Sendbird. All rights reserved.
//

import Foundation
import SendBirdCalls

class BaseVideoView: UIView {
    var surface = SendBirdVideoView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        surface.clipsToBounds = true
        surface.embed(in: self)
        surface.backgroundColor = .clear
    }
    
    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
