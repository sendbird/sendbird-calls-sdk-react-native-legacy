package com.sendbird.calls.reactnative.module.listener

import com.facebook.react.bridge.Arguments
import com.sendbird.calls.AudioDevice
import com.sendbird.calls.DirectCall
import com.sendbird.calls.handler.DirectCallListener
import com.sendbird.calls.reactnative.CallsEvents
import com.sendbird.calls.reactnative.extension.asString
import com.sendbird.calls.reactnative.module.CallsModule
import com.sendbird.calls.reactnative.utils.CallsUtils

class CallsDirectCallListener(private val root: CallsModule,): DirectCallListener() {
    override fun onAudioDeviceChanged(
        call: DirectCall,
        currentAudioDevice: AudioDevice?,
        availableAudioDevices: MutableSet<AudioDevice>
    ) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_AUDIO_DEVICE_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call),
            Arguments.createMap().apply {
                putString("currentAudioDevice", currentAudioDevice?.asString())
                putArray("availableAudioDevices", Arguments.fromList(availableAudioDevices.map { it.asString() }))
            }
        )
    }

    override fun onConnected(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_CONNECTED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onCustomItemsDeleted(call: DirectCall, deletedKeys: List<String>) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_CUSTOM_ITEMS_DELETED,
            CallsUtils.convertDirectCallToJsMap(call),
            deletedKeys
        )
    }

    override fun onCustomItemsUpdated(call: DirectCall, updatedKeys: List<String>) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_CUSTOM_ITEMS_UPDATED,
            CallsUtils.convertDirectCallToJsMap(call),
            updatedKeys
        )
    }

    override fun onEnded(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_ENDED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onEstablished(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_ESTABLISHED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onLocalVideoSettingsChanged(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_LOCAL_VIDEO_SETTINGS_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onReconnected(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_RECONNECTED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onReconnecting(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_RECONNECTING,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onRemoteAudioSettingsChanged(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_REMOTE_AUDIO_SETTINGS_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onRemoteRecordingStatusChanged(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_REMOTE_RECORDING_STATUS_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onRemoteVideoSettingsChanged(call: DirectCall) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_REMOTE_VIDEO_SETTINGS_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call)
        )
    }

    override fun onUserHoldStatusChanged(
        call: DirectCall,
        isLocalUser: Boolean,
        isUserOnHold: Boolean
    ) {
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_DIRECT_CALL,
            CallsEvents.TYPE_DIRECT_CALL_ON_USER_HOLD_STATUS_CHANGED,
            CallsUtils.convertDirectCallToJsMap(call),
            Arguments.createMap().apply {
                putBoolean("isLocalUser", isLocalUser)
                putBoolean("isUserOnHold", isUserOnHold)
            }
        )
    }
}