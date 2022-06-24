package com.sendbird.calls.reactnative

import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNSBDirectCallVideoViewManager(private val reactContext: ReactContext) : SimpleViewManager<RNSBDirectCallVideoView>() {
    override fun getName() = NAME
    override fun createViewInstance(context: ThemedReactContext) = RNSBDirectCallVideoView(context)

    @ReactProp(name = "viewType")
    fun setViewType(view: RNSBDirectCallVideoView, type: String) {
        val viewType = ViewType.valueOf(type.uppercase())
        view.setViewType(viewType)
    }

    @ReactProp(name = "callId")
    fun setCallId(view: RNSBDirectCallVideoView, callId: String) {
        view.setCallId(callId)
    }

    @ReactProp(name = "zOrderMediaOverlay")
    fun setZOrderMediaOverlay(view: RNSBDirectCallVideoView, overlay: Boolean) {
        view.setZOrderMediaOverlay(overlay)
    }

    companion object {
        const val NAME = "RNSBDirectCallVideoView"
    }
}