package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.DirectCallEndResult

fun DirectCallEndResult.asString() = when (this) {
    DirectCallEndResult.NONE -> "NONE"
    DirectCallEndResult.NO_ANSWER -> "NO_ANSWER"
    DirectCallEndResult.CANCELED -> "CANCELED"
    DirectCallEndResult.DECLINED -> "DECLINED"
    DirectCallEndResult.COMPLETED -> "COMPLETED"
    DirectCallEndResult.TIMED_OUT -> "TIMED_OUT"
    DirectCallEndResult.CONNECTION_LOST -> "CONNECTION_LOST"
    DirectCallEndResult.UNKNOWN -> "UNKNOWN"
    DirectCallEndResult.DIAL_FAILED -> "DIAL_FAILED"
    DirectCallEndResult.ACCEPT_FAILED -> "ACCEPT_FAILED"
    DirectCallEndResult.OTHER_DEVICE_ACCEPTED -> "OTHER_DEVICE_ACCEPTED"
}