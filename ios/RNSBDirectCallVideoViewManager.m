//
//  RNSBDirectCallVideoViewManager.m
//  RNSendbirdCalls
//
//  Created by Airen Kang on 2022/06/11.
//  Copyright © 2022 Sendbird. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(RNSBDirectCallVideoView, RNSBDirectCallVideoViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(viewType, NSString);
RCT_EXPORT_VIEW_PROPERTY(callId, NSString);

@end
