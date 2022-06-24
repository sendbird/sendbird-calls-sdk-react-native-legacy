package com.sendbird.calls.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

// FIXME: Extends NativeRNSendbirdCallsSpec
class RNSendbirdCallsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return RNSendbirdCallsModuleImpl.NAME;
    }

    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {
        RNSendbirdCallsModuleImpl.multiply(a, b, promise);
    }
}
