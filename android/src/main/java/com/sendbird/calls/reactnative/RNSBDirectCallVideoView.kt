package com.sendbird.calls.reactnative

import android.content.Context
import com.sendbird.calls.DirectCall
import com.sendbird.calls.SendBirdCall
import com.sendbird.calls.reactnative.view.BaseVideoView

enum class ViewType {
    LOCAL, REMOTE
}

class RNSBDirectCallVideoView(context: Context) : BaseVideoView(context) {
    private var mViewType = ViewType.LOCAL
    private var mCallId: String? = null

    private fun getCall(id: String?): DirectCall? {
        val callId = id ?: mCallId ?: return null
        return SendBirdCall.getCall(callId)
    }

    fun updateView() {
        val call = getCall(mCallId)
        when (mViewType) {
            ViewType.REMOTE -> call?.setRemoteVideoView(mSurface)
            ViewType.LOCAL -> call?.setLocalVideoView(mSurface)
        }
    }

    fun setZOrderMediaOverlay(overlay: Boolean) {
        mSurface.setZOrderMediaOverlay(overlay)
    }

    fun setViewType(viewType: ViewType) {
        this.mViewType = viewType
        this.updateView()
    }

    fun setCallId(callId: String) {
        this.mCallId = callId
        this.updateView()
    }
}