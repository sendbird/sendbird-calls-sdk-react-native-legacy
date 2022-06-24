package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.RoomState

fun RoomState.asString() = when (this) {
    RoomState.OPEN -> "OPEN"
    RoomState.DELETED -> "DELETED"
}
