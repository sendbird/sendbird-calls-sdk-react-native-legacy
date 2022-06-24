package com.sendbird.calls.reactnative.module

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.sendbird.calls.AcceptParams
import com.sendbird.calls.AudioDevice
import com.sendbird.calls.CallOptions
import com.sendbird.calls.reactnative.RNCallsInternalError
import com.sendbird.calls.reactnative.extension.rejectCalls
import com.sendbird.calls.reactnative.utils.CallsUtils

class CallsDirectCallModule(private val root: CallsModule): DirectCallModule {
    override fun accept(callId: String, options: ReadableMap, holdActiveCall: Boolean, promise: Promise) {
        Log.d(CallsModule.NAME, "[DirectCallModule] accept() -> $callId")
        Log.d(CallsModule.NAME, "[DirectCallModule] accept options -> ${options.toHashMap()}")

        CallsUtils.safeRun(promise) {
            val from = "directCall/accept"
            val call = CallsUtils.findDirectCall(callId, from)

            val localVideoViewId = CallsUtils.safeGet { options.getInt("localVideoViewId") }
            val remoteVideoViewId = CallsUtils.safeGet { options.getInt("remoteVideoViewId") }

            val audioEnabled = CallsUtils.safeGet { options.getBoolean("audioEnabled") }
            val videoEnabled = CallsUtils.safeGet { options.getBoolean("videoEnabled") }
            val frontCamera = CallsUtils.safeGet { options.getBoolean("frontCamera") }

            val acceptParams = AcceptParams().apply {
                setHoldActiveCall(holdActiveCall)
                setCallOptions(CallOptions().apply {
                    localVideoViewId?.let {
                        val surface = CallsUtils.findVideoView(root.reactContext, it, from).getSurface()
                        setLocalVideoView(surface)
                    }
                    remoteVideoViewId?.let {
                        val surface = CallsUtils.findVideoView(root.reactContext, it, from).getSurface()
                        setRemoteVideoView(surface)
                    }
                    audioEnabled?.let {
                        setAudioEnabled(it)
                    }
                    videoEnabled?.let {
                        setVideoEnabled(it)
                    }
                    frontCamera?.let {
                        setFrontCameraAsDefault(it)
                    }
                })
            }
            call.accept(acceptParams)
            promise.resolve(null)
        }
    }

    override fun end(callId: String, promise: Promise) {
        Log.d(CallsModule.NAME, "[DirectCallModule] end() -> $callId")

        CallsUtils.safeRun(promise) {
            val from = "directCall/end"
            CallsUtils.findDirectCall(callId, from).end()
            promise.resolve(null)
        }
    }

    override fun updateLocalVideoView(callId: String, videoViewId: Int) {
        Log.d(CallsModule.NAME, "[DirectCallModule] updateLocalVideoView() -> $callId / $videoViewId")

        CallsUtils.safeRun {
            val from = "directCall/updateLocalVideoView"
            val call = CallsUtils.findDirectCall(callId, from)
            val view = CallsUtils.findVideoView(root.reactContext, videoViewId, from)
            call.setLocalVideoView(view.getSurface())
        }
    }

    override fun updateRemoteVideoView(callId: String, videoViewId: Int) {
        Log.d(CallsModule.NAME, "[DirectCallModule] updateRemoteVideoView() -> $callId / $videoViewId")

        CallsUtils.safeRun {
            val from = "directCall/updateRemoteVideoView"
            val call = CallsUtils.findDirectCall(callId, from)
            val view = CallsUtils.findVideoView(root.reactContext, videoViewId, from)
            call.setRemoteVideoView(view.getSurface())
        }
    }

    override fun selectVideoDevice(type: String, identifier: String, device: ReadableMap, promise: Promise)  {
        CallsUtils.safeRun(promise) {
            val from = "directCall/selectVideoDevice"
            val call = CallsUtils.findDirectCall(identifier, from)
            val deviceId = CallsUtils.safeGet { device.getString("deviceId") }

            call.availableVideoDevices
                .find {
                    it.deviceName === deviceId
                }
                ?.let {
                    call.selectVideoDevice(it) { error ->
                        error
                            ?.let {
                                promise.rejectCalls(error)
                            }
                            ?: run {
                                promise.resolve(null)
                            }
                    }
                }
                ?: run {
                    promise.reject(RNCallsInternalError(from, RNCallsInternalError.Type.NOT_FOUND_VIDEO_DEVICE))
                }
        }
    }
    
    override fun muteMicrophone(type: String, identifier: String) {
        val from = "directCall/muteMicrophone"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findDirectCall(identifier, from).muteMicrophone()
        }
    }

    override fun unmuteMicrophone(type: String, identifier: String) {
        val from = "directCall/unmuteMicrophone"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findDirectCall(identifier, from).unmuteMicrophone()
        }
    }

    override fun stopVideo(type: String, identifier: String) {
        val from = "directCall/stopVideo"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findDirectCall(identifier, from).stopVideo()
        }
    }

    override fun startVideo(type: String, identifier: String) {
        val from = "directCall/startVideo"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findDirectCall(identifier, from).startVideo()
        }
    }

    override fun switchCamera(type: String, identifier: String, promise: Promise) {
        val from = "directCall/switchCamera"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun(promise) {
            CallsUtils.findDirectCall(identifier, from).switchCamera { error ->
                error
                    ?.let {
                        promise.rejectCalls(it)
                    }
                    ?: run {
                        promise.resolve(null)
                    }
            }
        }
    }

    override fun selectAudioDevice(type: String, identifier: String, device: String, promise: Promise) {
        val from = "directCall/switchCamera"
        Log.d(CallsModule.NAME, "[DirectCallModule] $from ($identifier)")

        CallsUtils.safeRun(promise) {
            val audioDevice = AudioDevice.valueOf(device)

            CallsUtils.findDirectCall(identifier, from).selectAudioDevice(audioDevice) { error ->
                error
                    ?.let {
                        promise.rejectCalls(it)
                    }
                    ?: run {
                        promise.resolve(null)
                    }
            }
        }
    }
}
