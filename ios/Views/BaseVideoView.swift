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
    @objc var resizeMode: String = "cover"
    @objc var mirror: Bool = false
    
    var surface = SendBirdVideoView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        surface.clipsToBounds = true
        surface.backgroundColor = .clear
        surface.videoContentMode = .scaleAspectFill
        surface.embed(in: self)
    }
    
    override func didSetProps(_ changedProps: [String]!) {
        if changedProps.contains("resizeMode") {
            setResizeMode()
        }
        
        if changedProps.contains("mirror") {
            setMirror()
        }
    }
    
    func setResizeMode() {
        DispatchQueue.main.async {
            switch self.resizeMode {
            case "cover":
                self.surface.videoContentMode = .scaleAspectFill
            case "contain":
                self.surface.videoContentMode = .scaleAspectFit
            case "center":
                self.surface.videoContentMode = .center
            default: ()
            }
        }
    }
    
    func setMirror() {
        DispatchQueue.main.async {
            switch self.mirror {
            case true:
                self.surface.transform = CGAffineTransform(scaleX: -1.0, y: 1.0)
            case false:
                self.surface.transform = CGAffineTransform(scaleX: 1.0, y: 1.0)
            }
        }
    }
    
    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
