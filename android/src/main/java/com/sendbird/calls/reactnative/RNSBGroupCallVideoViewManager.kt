package com.sendbird.calls.reactnative

import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.sendbird.calls.ParticipantState

class RNSBGroupCallVideoViewManager(private val reactContext: ReactContext) : SimpleViewManager<RNSBGroupCallVideoView>() {
    override fun getName() = NAME
    override fun createViewInstance(context: ThemedReactContext) = RNSBGroupCallVideoView(context)

    @ReactProp(name = "zOrderMediaOverlay")
    fun setZOrderMediaOverlay(view: RNSBGroupCallVideoView, overlay: Boolean) {
        view.setZOrderMediaOverlay(overlay)
    }

    @ReactProp(name = "resizeMode")
    fun setResizeMode(view: RNSBGroupCallVideoView, mode: String) {
        view.setResizeMode(mode)
    }

    @ReactProp(name = "mirror")
    fun setMirror(view: RNSBGroupCallVideoView, enabled: Boolean) {
        view.setMirror(enabled)
    }

    @ReactProp(name = "participantId")
    fun setParticipantId(view: RNSBGroupCallVideoView, participantId: String) {
        view.setParticipantId(participantId)
    }

    @ReactProp(name = "roomId")
    fun setRoomId(view: RNSBGroupCallVideoView, roomId: String) {
        view.setRoomId(roomId)
    }

    @ReactProp(name = "state")
    fun setParticipantState(view: RNSBGroupCallVideoView, state: String) {
        ParticipantState.valueOf(state.uppercase()).let {
            view.setParticipantState(it)
        }
    }

    companion object {
        const val NAME = "RNSBGroupCallVideoView"
    }
}
