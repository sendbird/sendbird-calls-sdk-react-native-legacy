package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.AudioDevice

fun AudioDevice.asString() = when (this) {
    AudioDevice.EARPIECE -> "EARPIECE"
    AudioDevice.SPEAKERPHONE -> "SPEAKERPHONE"
    AudioDevice.WIRED_HEADSET -> "WIRED_HEADSET"
    AudioDevice.BLUETOOTH -> "BLUETOOTH"
}

