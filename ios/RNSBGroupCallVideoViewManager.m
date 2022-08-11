//
//  RNSBGroupCallVideoViewManager.m
//  RNSendbirdCalls
//
//  Created by James Kim on 2022/07/12.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(RNSBGroupCallVideoView, RNSBGroupCallVideoViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(mirror, BOOL);
RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString);
RCT_EXPORT_VIEW_PROPERTY(roomId, NSString);
RCT_EXPORT_VIEW_PROPERTY(participantId, NSString);
RCT_EXPORT_VIEW_PROPERTY(state, NSString);

@end
