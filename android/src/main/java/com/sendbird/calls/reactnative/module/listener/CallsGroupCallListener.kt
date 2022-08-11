package com.sendbird.calls.reactnative.module.listener

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.sendbird.calls.*
import com.sendbird.calls.reactnative.CallsEvents
import com.sendbird.calls.reactnative.extension.asString
import com.sendbird.calls.reactnative.module.CallsModule
import com.sendbird.calls.reactnative.utils.CallsUtils

class CallsGroupCallListener(private val root: CallsModule, private val room: Room): RoomListener {
    override fun onDeleted() {
        val from = "groupCall/onDeleted"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId})")
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_GROUP_CALL,
            CallsEvents.TYPE_GROUP_CALL_ON_DELETED,
            CallsUtils.convertRoomToJsMap(room)
        )
    }

    override fun onError(e: SendBirdException, participant: Participant?) {
        val from = "groupCall/onError"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) e($e) participant($participant)")
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_GROUP_CALL,
            CallsEvents.TYPE_GROUP_CALL_ON_ERROR,
            CallsUtils.convertRoomToJsMap(room),
            Arguments.createMap().apply {
                putMap("participant", CallsUtils.convertParticipantToJsMap(participant))
                putInt("errorCode", e.code)
                putString("errorMessage", e.message)
            }
        )
    }

    override fun onRemoteParticipantEntered(participant: RemoteParticipant) {
        val from = "groupCall/onRemoteParticipantEntered"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) participant($participant)")
        CallsUtils.convertParticipantToJsMap(participant)?.let {
            CallsEvents.sendEvent(
                root.reactContext,
                CallsEvents.EVENT_GROUP_CALL,
                CallsEvents.TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_ENTERED,
                CallsUtils.convertRoomToJsMap(room),
                Arguments.createMap().apply {
                    putMap("participant", it)
                }
            )
        }
    }

    override fun onRemoteParticipantExited(participant: RemoteParticipant) {
        val from = "groupCall/onRemoteParticipantExited"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) participant($participant)")
        CallsUtils.convertParticipantToJsMap(participant)?.let {
            CallsEvents.sendEvent(
                root.reactContext,
                CallsEvents.EVENT_GROUP_CALL,
                CallsEvents.TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_EXITED,
                CallsUtils.convertRoomToJsMap(room),
                Arguments.createMap().apply {
                    putMap("participant", it)
                }
            )
        }
    }

    override fun onRemoteParticipantStreamStarted(participant: RemoteParticipant) {
        val from = "groupCall/onRemoteParticipantStreamStarted"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) participant($participant)")
        CallsUtils.convertParticipantToJsMap(participant)?.let {
            CallsEvents.sendEvent(
                root.reactContext,
                CallsEvents.EVENT_GROUP_CALL,
                CallsEvents.TYPE_GROUP_CALL_ON_REMOTE_PARTICIPANT_STREAM_STARTED,
                CallsUtils.convertRoomToJsMap(room),
                Arguments.createMap().apply {
                    putMap("participant", it)
                }
            )
        }
    }

    override fun onAudioDeviceChanged(currentAudioDevice: AudioDevice?, availableAudioDevices: Set<AudioDevice>) {
        val from = "groupCall/onAudioDeviceChanged"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) currentAudioDevice($currentAudioDevice) availableAudioDevices($availableAudioDevices)")
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_GROUP_CALL,
            CallsEvents.TYPE_GROUP_CALL_ON_AUDIO_DEVICE_CHANGED,
            CallsUtils.convertRoomToJsMap(room),
            Arguments.createMap().apply {
                putString("currentAudioDevice", currentAudioDevice?.asString())
                putArray("availableAudioDevices", Arguments.fromList(availableAudioDevices.map { it.asString() }))
            }
        )
    }

    override fun onRemoteVideoSettingsChanged(participant: RemoteParticipant) {
        val from = "groupCall/onRemoteVideoSettingsChanged"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) participant($participant)")
        CallsUtils.convertParticipantToJsMap(participant)?.let {
            CallsEvents.sendEvent(
                root.reactContext,
                CallsEvents.EVENT_GROUP_CALL,
                CallsEvents.TYPE_GROUP_CALL_ON_REMOTE_VIDEO_SETTINGS_CHANGED,
                CallsUtils.convertRoomToJsMap(room),
                Arguments.createMap().apply {
                    putMap("participant", it)
                }
            )
        }
    }

    override fun onRemoteAudioSettingsChanged(participant: RemoteParticipant) {
        val from = "groupCall/onRemoteAudioSettingsChanged"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) participant($participant)")
        CallsUtils.convertParticipantToJsMap(participant)?.let {
            CallsEvents.sendEvent(
                root.reactContext,
                CallsEvents.EVENT_GROUP_CALL,
                CallsEvents.TYPE_GROUP_CALL_ON_REMOTE_AUDIO_SETTINGS_CHANGED,
                CallsUtils.convertRoomToJsMap(room),
                Arguments.createMap().apply {
                    putMap("participant", it)
                }
            )
        }
    }

    override fun onCustomItemsUpdated(updatedKeys: List<String>) {
        val from = "groupCall/onCustomItemsUpdated"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) updatedKeys(${updatedKeys.joinToString(", ")})")
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_GROUP_CALL,
            CallsEvents.TYPE_GROUP_CALL_ON_CUSTOM_ITEMS_UPDATED,
            CallsUtils.convertRoomToJsMap(room),
            Arguments.createMap().apply {
                putArray("updatedKeys", Arguments.fromList(updatedKeys))
            }
        )
    }

    override fun onCustomItemsDeleted(deletedKeys: List<String>) {
        val from = "groupCall/onCustomItemsDeleted"
        Log.d(CallsModule.NAME, "[GroupCallListener] $from -> roomId(${room.roomId}) updatedKeys(${deletedKeys.joinToString(", ")})")
        CallsEvents.sendEvent(
            root.reactContext,
            CallsEvents.EVENT_GROUP_CALL,
            CallsEvents.TYPE_GROUP_CALL_ON_CUSTOM_ITEMS_DELETED,
            CallsUtils.convertRoomToJsMap(room),
            Arguments.createMap().apply {
                putArray("deletedKeys", Arguments.fromList(deletedKeys))
            }
        )
    }

    companion object {
        private val listeners = mutableMapOf<String, CallsGroupCallListener>()
        fun get(root: CallsModule, room: Room): CallsGroupCallListener = listeners[room.roomId] ?: run {
            listeners[room.roomId] = CallsGroupCallListener(root, room)
            return listeners[room.roomId] as CallsGroupCallListener
        }
        fun invalidate() {
            listeners.values.forEach { it.room.removeAllListeners() }
            listeners.clear()
        }
    }
}
