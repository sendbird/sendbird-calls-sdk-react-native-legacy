package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.SendBirdCall.SoundType

fun SoundType.asString() = when (this) {
    SoundType.DIALING -> "DIALING"
    SoundType.RINGING -> "RINGING"
    SoundType.RECONNECTING -> "RECONNECTING"
    SoundType.RECONNECTED -> "RECONNECTED"
}

