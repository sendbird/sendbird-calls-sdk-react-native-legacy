package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.DirectCallUserRole

fun DirectCallUserRole.asString() = when (this) {
    DirectCallUserRole.CALLER -> "CALLER"
    DirectCallUserRole.CALLEE -> "CALLEE"
}