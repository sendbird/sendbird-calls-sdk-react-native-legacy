package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.VideoDevice

fun VideoDevice.Position.asString() = when (this) {
    VideoDevice.Position.FRONT -> "FRONT"
    VideoDevice.Position.BACK -> "BACK"
    VideoDevice.Position.UNSPECIFIED -> "UNSPECIFIED"
}