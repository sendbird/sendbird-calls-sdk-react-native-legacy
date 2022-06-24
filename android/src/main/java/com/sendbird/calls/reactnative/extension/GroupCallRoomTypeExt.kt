package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.RoomType

fun RoomType.asString() = when (this) {
    RoomType.LARGE_ROOM_FOR_AUDIO_ONLY -> "LARGE_ROOM_FOR_AUDIO_ONLY"
    RoomType.SMALL_ROOM_FOR_VIDEO -> "SMALL_ROOM_FOR_VIDEO"
}
