package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.ParticipantState

fun ParticipantState.asString() = when (this) {
    ParticipantState.ENTERED -> "ENTERED"
    ParticipantState.CONNECTED -> "CONNECTED"
    ParticipantState.EXITED -> "EXITED"
}
