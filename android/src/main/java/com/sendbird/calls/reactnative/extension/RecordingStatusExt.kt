package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.RecordingStatus

fun RecordingStatus.asString() = when (this) {
    RecordingStatus.RECORDING -> "RECORDING"
    RecordingStatus.NONE -> "NONE"
}

