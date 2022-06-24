package com.sendbird.calls.reactnative.extension

import com.facebook.react.bridge.Promise
import com.sendbird.calls.SendBirdException
import com.sendbird.calls.reactnative.RNCallsInternalError


fun Promise.rejectCalls(exception: SendBirdException) {
    reject(exception.code.toString(), exception.message, exception)
}

fun Promise.rejectCalls(exception: RNCallsInternalError) {
    reject(exception.code, exception.message, exception)
}