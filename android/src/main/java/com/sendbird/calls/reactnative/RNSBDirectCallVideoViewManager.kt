package com.sendbird.calls.reactnative

import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNSBDirectCallVideoViewManager(private val reactContext: ReactContext) : SimpleViewManager<RNSBDirectCallVideoView>() {
    override fun getName() = NAME
    override fun createViewInstance(context: ThemedReactContext) = RNSBDirectCallVideoView(context)

    @ReactProp(name = "resizeMode")
    fun setResizeMode(view: RNSBDirectCallVideoView, mode: String) {
        view.setResizeMode(mode)
    }

    @ReactProp(name = "zOrderMediaOverlay")
    fun setZOrderMediaOverlay(view: RNSBDirectCallVideoView, overlay: Boolean) {
        view.setZOrderMediaOverlay(overlay)
    }

    @ReactProp(name = "mirror")
    fun setMirror(view: RNSBDirectCallVideoView, enabled: Boolean) {
        view.setMirror(enabled)
    }

    @ReactProp(name = "viewType")
    fun setViewType(view: RNSBDirectCallVideoView, type: String) {
        val viewType = ViewType.valueOf(type.uppercase())
        view.setViewType(viewType)
    }

    @ReactProp(name = "callId")
    fun setCallId(view: RNSBDirectCallVideoView, callId: String) {
        view.setCallId(callId)
    }

    companion object {
        const val NAME = "RNSBDirectCallVideoView"
    }
}