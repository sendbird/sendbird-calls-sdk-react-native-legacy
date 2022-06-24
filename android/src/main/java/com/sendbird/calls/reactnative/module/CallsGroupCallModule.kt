package com.sendbird.calls.reactnative.module

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.sendbird.calls.*
import com.sendbird.calls.reactnative.RNCallsInternalError
import com.sendbird.calls.reactnative.extension.rejectCalls
import com.sendbird.calls.reactnative.utils.CallsUtils

class CallsGroupCallModule: GroupCallModule {
    override fun enter(roomId: String, options: ReadableMap, promise: Promise) {
        val from = "groupCall/enter"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from -> roomId($roomId) options(${options.toHashMap()})")
        SendBirdCall.getCachedRoomById(roomId)
            ?.let {
                val audioEnabled = CallsUtils.safeGet { options.getBoolean("audioEnabled") }
                val videoEnabled = CallsUtils.safeGet { options.getBoolean("videoEnabled") }

                val enterParams = EnterParams().apply {
                    audioEnabled?.let {
                        setAudioEnabled(it)
                    }
                    videoEnabled?.let {
                        setVideoEnabled(it)
                    }
                }

                it.enter(enterParams) { error ->
                    error
                        ?.let {
                            promise.rejectCalls(it)
                        }
                        ?: run {
                            promise.resolve(null)
                        }
                }
            }
            ?: run {
                promise.rejectCalls(RNCallsInternalError(from, RNCallsInternalError.Type.NOT_FOUND_ROOM))
            }
    }

    override fun exit(roomId: String) {
        val from = "groupCall/exit"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from -> roomId($roomId)")
        CallsUtils.safeRun {
            CallsUtils.findRoom(roomId, from).exit()
        }
    }

    override fun muteMicrophone(type: String, identifier: String) {
        val from = "groupCall/muteMicrophone"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findRoom(identifier, from).localParticipant?.muteMicrophone()
        }
    }

    override fun unmuteMicrophone(type: String, identifier: String) {
        val from = "groupCall/unmuteMicrophone"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findRoom(identifier, from).localParticipant?.unmuteMicrophone()
        }
    }

    override fun stopVideo(type: String, identifier: String) {
        val from = "groupCall/stopVideo"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findRoom(identifier, from).localParticipant?.stopVideo()
        }
    }

    override fun startVideo(type: String, identifier: String) {
        val from = "groupCall/startVideo"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun {
            CallsUtils.findRoom(identifier, from).localParticipant?.startVideo()
        }
    }

    override fun switchCamera(type: String, identifier: String, promise: Promise) {
        val from = "groupCall/switchCamera"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun(promise) {
            CallsUtils.findRoom(identifier, from).localParticipant?.switchCamera { error ->
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
        val from = "groupCall/switchCamera"
        Log.d(CallsModule.NAME, "[GroupCallModule] $from ($identifier)")

        CallsUtils.safeRun(promise) {
            val audioDevice = AudioDevice.valueOf(device)
            CallsUtils.findRoom(identifier, from).selectAudioDevice(audioDevice) { error ->
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

    override fun selectVideoDevice(
        type: String,
        identifier: String,
        device: ReadableMap,
        promise: Promise
    ) {
        // NOOP
        promise.resolve(null)
    }
}
