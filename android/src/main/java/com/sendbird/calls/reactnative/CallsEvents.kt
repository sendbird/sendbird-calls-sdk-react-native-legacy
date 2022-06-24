package com.sendbird.calls.reactnative

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.sendbird.calls.reactnative.module.CallsModule
import com.sendbird.calls.reactnative.utils.CallsUtils

fun defaultType(type: String): String {
    return "${CallsEvents.EVENT_DEFAULT}.${type}"
}
fun directCallType(type: String): String {
    return "${CallsEvents.EVENT_DIRECT_CALL}.${type}"
}

fun groupCallType(type: String): String {
    return "${CallsEvents.EVENT_GROUP_CALL}.${type}"
}

class CallsEvents {
    companion object {
        /**
         * Event
         * EVENT_{EVENT}
         * */
        const val EVENT_DEFAULT = "sendbird.call.default"
        const val EVENT_DIRECT_CALL = "sendbird.call.direct"
        const val EVENT_GROUP_CALL = "sendbird.call.group"

        /**
         * Event Type
         * TYPE_{EVENT}_{TYPE}
         * */
        // Direct
        val TYPE_DEFAULT_ON_RINGING = defaultType("onRinging")
        val TYPE_DIRECT_CALL_ON_ESTABLISHED = directCallType("onEstablished")
        val TYPE_DIRECT_CALL_ON_CONNECTED = directCallType("onConnected")
        val TYPE_DIRECT_CALL_ON_RECONNECTING = directCallType("onReconnecting")
        val TYPE_DIRECT_CALL_ON_RECONNECTED = directCallType("onReconnected")
        val TYPE_DIRECT_CALL_ON_ENDED = directCallType("onEnded")
        val TYPE_DIRECT_CALL_ON_REMOTE_AUDIO_SETTINGS_CHANGED = directCallType("onRemoteAudioSettingsChanged")
        val TYPE_DIRECT_CALL_ON_REMOTE_VIDEO_SETTINGS_CHANGED = directCallType("onRemoteVideoSettingsChanged")
        val TYPE_DIRECT_CALL_ON_LOCAL_VIDEO_SETTINGS_CHANGED = directCallType("onLocalVideoSettingsChanged")
        val TYPE_DIRECT_CALL_ON_REMOTE_RECORDING_STATUS_CHANGED = directCallType("onRemoteRecordingStatusChanged")
        val TYPE_DIRECT_CALL_ON_AUDIO_DEVICE_CHANGED = directCallType("onAudioDeviceChanged")
        val TYPE_DIRECT_CALL_ON_CUSTOM_ITEMS_UPDATED = directCallType("onCustomItemsUpdated")
        val TYPE_DIRECT_CALL_ON_CUSTOM_ITEMS_DELETED = directCallType("onCustomItemsDeleted")
        val TYPE_DIRECT_CALL_ON_USER_HOLD_STATUS_CHANGED = directCallType("onUserHoldStatusChanged")
        // Group
        val TYPE_GROUP_CALL_ON_DELETED = groupCallType("onDeleted")
        val TYPE_GROUP_CALL_ON_ERROR = groupCallType("onError")
        val TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_ENTERED = groupCallType("onRemoteParticipantEntered")
        val TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_EXITED = groupCallType("onRemoteParticipantExited")
        val TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_STREAM_STARTED = groupCallType("onRemoteParticipantStreamStarted")
        val TYPE_GROUP_CALL_ON_AUDIO_DEVICE_CHANGED = groupCallType("onAudioDeviceChanged")
        val TYPE_GROUP_CALL_ON_REMOTE_VIDEO_SETTINGS_CHANGED = groupCallType("onRemoteVideoSettingsChanged")
        val TYPE_GROUP_CALL_ON_REMOTE_AUDIO_SETTINGS_CHANGED = groupCallType("onRemoteAudioSettingsChanged")
        val TYPE_GROUP_CALL_ON_CUSTOM_ITEMS_UPDATED = groupCallType("onCustomItemsUpdated")
        val TYPE_GROUP_CALL_ON_CUSTOM_ITEMS_DELETED = groupCallType("onCustomItemsDeleted")

        fun sendEvent(reactContext: ReactContext, event: String, eventType: String, data: WritableMap) {
            Log.d(CallsModule.NAME, "[CallsEvents] sendEvent() $event++$eventType")

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(event, Arguments.createMap().apply {
                    putString("eventType", eventType)
                    putMap("data", data)
                })
        }

        fun sendEvent(reactContext: ReactContext, event: String, eventType: String, data: List<*>) {
            Log.d(CallsModule.NAME, "[CallsEvents] sendEvent() $event++$eventType")

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(event, Arguments.createMap().apply {
                    putString("eventType", eventType)
                    CallsUtils.insertMap(this, "data", data)
                })
        }

        fun sendEvent(reactContext: ReactContext, event: String, eventType: String, data: WritableMap, additionalData: Any) {
            Log.d(CallsModule.NAME, "[CallsEvents] sendEvent() $event++$eventType")

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(event, Arguments.createMap().apply {
                    putString("eventType", eventType)
                    putMap("data", data)
                    CallsUtils.insertMap(this, "additionalData", additionalData)
                })
        }
    }
}
