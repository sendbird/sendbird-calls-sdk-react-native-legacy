package com.sendbird.calls.reactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.sendbird.calls.SendBirdCall
import com.sendbird.calls.reactnative.module.CallsModule
import com.sendbird.calls.reactnative.module.CallsModuleStruct

class RNSendbirdCallsModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext),
    CallsModuleStruct {
    private var module = CallsModule(reactContext)

    override fun getName(): String {
        return CallsModule.NAME
    }
    override fun getConstants(): Map<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants["NATIVE_SDK_VERSION"] = SendBirdCall.getSdkVersion()
        return constants
    }
    // For backward compat instead of invalidate
    @Deprecated("Deprecated in Java")
    override fun onCatalystInstanceDestroy() {
        this.module.invalidate(null)
        this.module = CallsModule(reactContext)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun handleFirebaseMessageData(data: ReadableMap) {
        val map = data.toHashMap() as Map<String, String>
        Log.d(CallsModule.NAME, "[RNSendbirdCallsModule] handleFirebaseMessageData() -> ${map}")
        SendBirdCall.handleFirebaseMessageData(map)
    }

    @ReactMethod
    override fun addDirectCallSound(type: String, fileName: String) = module.addDirectCallSound(type, fileName)
    @ReactMethod
    override fun removeDirectCallSound(type: String) = module.removeDirectCallSound(type)
    @ReactMethod
    override fun setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled: Boolean) = module.setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled)
    @ReactMethod
    override fun getCurrentUser(promise: Promise) = module.getCurrentUser(promise)
    @ReactMethod
    override fun getOngoingCalls(promise: Promise) = module.getOngoingCalls(promise)
    @ReactMethod
    override fun getDirectCall(callId: String, promise: Promise) = module.getDirectCall(callId, promise)
    @ReactMethod
    override fun initialize(appId: String) = module.initialize(appId)
    @ReactMethod
    override fun authenticate(authParams: ReadableMap, promise: Promise) = module.authenticate(authParams, promise)
    @ReactMethod
    override fun deauthenticate(promise: Promise) = module.deauthenticate(promise)
    @ReactMethod
    override fun registerPushToken(token: String, unique: Boolean, promise: Promise) = module.registerPushToken(token, unique, promise)
    @ReactMethod
    override fun unregisterPushToken(token: String, promise: Promise) = module.unregisterPushToken(token, promise)
    @ReactMethod
    override fun dial(calleeId: String, isVideoCall: Boolean, options: ReadableMap, promise: Promise) = module.dial(calleeId, isVideoCall, options, promise)
    @ReactMethod
    override fun createRoom(params: ReadableMap, promise: Promise) = module.createRoom(params, promise)
    @ReactMethod
    override fun fetchRoomById(roomId: String, promise: Promise) = module.fetchRoomById(roomId, promise)
    @ReactMethod
    override fun getCachedRoomById(roomId: String, promise: Promise) = module.getCachedRoomById(roomId, promise)

    /** MediaDevice Control **/
    @ReactMethod
    override fun muteMicrophone(type: String, identifier: String) = module.muteMicrophone(type, identifier)
    @ReactMethod
    override fun unmuteMicrophone(type: String, identifier: String) = module.unmuteMicrophone(type, identifier)
    @ReactMethod
    override fun stopVideo(type: String, identifier: String) = module.stopVideo(type, identifier)
    @ReactMethod
    override fun startVideo(type: String, identifier: String) = module.startVideo(type, identifier)
    @ReactMethod
    override fun switchCamera(type: String, identifier: String, promise: Promise) = module.switchCamera(type, identifier, promise)
    @ReactMethod
    override fun selectAudioDevice(type: String, identifier: String, device: String, promise: Promise) = module.selectAudioDevice(type, identifier, device, promise)
    @ReactMethod
    override fun selectVideoDevice(type: String, identifier: String, device: ReadableMap, promise: Promise) = module.selectVideoDevice(type, identifier, device, promise)

    /** DirectCall **/
    @ReactMethod
    override fun accept(callId: String, options: ReadableMap, holdActiveCall: Boolean, promise: Promise) = module.accept(callId, options, holdActiveCall, promise)
    @ReactMethod
    override fun end(callId: String, promise: Promise) = module.end(callId, promise)
    @ReactMethod
    override fun updateLocalVideoView(callId: String, videoViewId: Int) = module.updateLocalVideoView(callId, videoViewId)
    @ReactMethod
    override fun updateRemoteVideoView(callId: String, videoViewId: Int) = module.updateRemoteVideoView(callId, videoViewId)

    /** GroupCall - Room **/
    @ReactMethod
    override fun enter(roomId: String, options: ReadableMap, promise: Promise) = module.enter(roomId, options, promise)
    @ReactMethod
    override fun exit(roomId: String) = module.exit(roomId)

    /** Queries **/
    @ReactMethod
    fun createDirectCallLogListQuery(params: ReadableMap, promise: Promise) = module.createDirectCallLogListQuery(params, promise)
    @ReactMethod
    fun createRoomListQuery(params: ReadableMap, promise: Promise) = module.createRoomListQuery(params, promise)
    @ReactMethod
    fun queryNext(queryKey: String, type: String, promise: Promise) = module.queryNext(queryKey, type, promise)
    @ReactMethod
    fun queryRelease(queryKey: String) = module.queryRelease(queryKey)
}
