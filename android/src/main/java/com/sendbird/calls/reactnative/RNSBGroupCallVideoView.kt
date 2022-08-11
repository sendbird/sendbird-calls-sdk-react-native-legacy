package com.sendbird.calls.reactnative

import android.content.Context
import com.sendbird.calls.ParticipantState
import com.sendbird.calls.Room
import com.sendbird.calls.SendBirdCall
import com.sendbird.calls.reactnative.view.BaseVideoView

class RNSBGroupCallVideoView(context: Context) : BaseVideoView(context) {
    private var mRoomId: String? = null
    private var mParticipantId: String? = null
    private var mParticipantState = ParticipantState.ENTERED

    private fun getRoom(id: String?): Room? {
        val roomId = id ?: mRoomId ?: return null
        return SendBirdCall.getCachedRoomById(roomId)
    }

    fun updateView() {
        val participant = this.getRoom(mRoomId)?.participants?.find { participant -> participant.participantId == mParticipantId }
        participant?.videoView = mSurface
    }

    fun setParticipantId(participantId: String) {
        this.mParticipantId = participantId
        this.updateView()
    }

    fun setRoomId(roomId: String) {
        this.mRoomId = roomId
        this.updateView()
    }

    fun setParticipantState(state: ParticipantState) {
        this.mParticipantState = state
        this.updateView()
    }
}
