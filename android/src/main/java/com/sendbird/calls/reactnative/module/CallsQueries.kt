package com.sendbird.calls.reactnative.module

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray
import com.sendbird.calls.*
import com.sendbird.calls.reactnative.RNCallsInternalError
import com.sendbird.calls.reactnative.extension.rejectCalls
import com.sendbird.calls.reactnative.module.listener.CallsGroupCallListener
import com.sendbird.calls.reactnative.utils.CallsUtils

enum class QueryType {
    DIRECT_CALL_LOG,
    ROOM_LIST
}

class CallsQueries(private val root: CallsModule) {
    val directCallLogQueries = mutableMapOf<String, DirectCallLogListQuery>()
    val roomListQueries = mutableMapOf<String, RoomListQuery>()

    fun createDirectCallLogListQuery(params: ReadableMap, promise: Promise) {
        val queryParams = DirectCallLogListQuery.Params().apply {
            CallsUtils.safeGet {
                params.getInt("limit")
            }?.let { setLimit(it) }

            CallsUtils.safeGet {
                params.getString("myRole")?.let { DirectCallUserRole.valueOf(it) }
            }?.let { setMyRole(it) }

            CallsUtils.safeGet {
                params.getArray("endResults")?.toArrayList()?.map { DirectCallEndResult.valueOf(it as String) }
            }?.let { setEndResults(it) }
        }

        SendBirdCall.createDirectCallLogListQuery(queryParams).let {
            it.hashCode().toString().run {
                directCallLogQueries[this] = it
                promise.resolve(this)
            }
        }
    }

    fun createRoomListQuery(params: ReadableMap, promise: Promise) {
        val queryParams = RoomListQuery.Params().apply {
            CallsUtils.safeGet {
                params.getInt("limit")
            }?.let { setLimit(it) }

            CallsUtils.safeGet {
                params.getArray("createdByUserIds")?.toArrayList()?.map { it as String }
            }?.let { setCreatedByUserIds(it) }

            CallsUtils.safeGet {
                params.getArray("roomIds")?.toArrayList()?.map { it as String }
            }?.let { setRoomIds(it) }

            CallsUtils.safeGet {
                params.getString("state")?.let { RoomState.valueOf(it) }
            }?.let { setState(it) }

            CallsUtils.safeGet {
                params.getString("type")?.let { RoomType.valueOf(it) }
            }?.let { setType(it) }


            // FIXME: Range methods are internal. (reported issue)
//            val createdAtRange = CallsUtils.safeGet {
//                val range = Range()
//                val createdAt = params.getMap("createdAt") ?: WritableNativeMap()
//                CallsUtils
//                    .safeGet { createdAt.getDouble("lowerBound") }
//                    ?.let { range.greaterThanOrEqualTo(it.toLong()) }
//                CallsUtils
//                    .safeGet { createdAt.getDouble("upperBound") }
//                    ?.let { range.lessThanOrEqualTo(it.toLong()) }
//                range
//            }
//
//            val participantCountRange = CallsUtils.safeGet {
//                val range = Range()
//                val count = params.getMap("currentParticipantCount")
//                CallsUtils
//                    .safeGet { count?.getDouble("lowerBound") }
//                    ?.let { range.greaterThanOrEqualTo(it.toLong()) }
//                CallsUtils
//                    .safeGet { count?.getDouble("upperBound") }
//                    ?.let { range.lessThanOrEqualTo(it.toLong()) }
//                range
//            }
        }

        SendBirdCall.createRoomListQuery(queryParams).let {
            it.hashCode().toString().run {
                roomListQueries[this] = it
                promise.resolve(this)
            }
        }
    }

    fun queryNext(key: String, type: String, promise: Promise) {
        when (QueryType.valueOf(type)) {
            QueryType.DIRECT_CALL_LOG -> {
                directCallLogQueries[key]
                    ?.run {
                        this.next { list, error ->
                            error?.let {
                                promise.rejectCalls(error)
                            }
                            list?.let {
                                promise.resolve(CallsUtils.convertToJsMap(mapOf(
                                    "hasNext" to this.hasNext(),
                                    "result" to list.map {
                                        CallsUtils.convertDirectCallLogToJsMap(it)
                                    },
                                )))
                            }
                        }
                    }
                    ?: run {
                        promise.reject(RNCallsInternalError("queryNext", RNCallsInternalError.Type.NOT_FOUND_QUERY))
                    }
            }
            QueryType.ROOM_LIST -> {
                roomListQueries[key]
                    ?.run {
                        this.next { list, error ->
                            error
                                ?.let {
                                    promise.rejectCalls(it)
                                }
                                ?: run {
                                    promise.resolve(CallsUtils.convertToJsMap(mapOf(
                                        "hasNext" to this.hasNext(),
                                        "result" to list.map {
                                            it.addListener(it.roomId, CallsGroupCallListener.get(root, it))
                                            CallsUtils.convertRoomToJsMap(it)
                                        }
                                    )))
                                }
                        }
                    }
                    ?: run {
                        promise.reject(RNCallsInternalError("queryNext", RNCallsInternalError.Type.NOT_FOUND_QUERY))
                    }
            }
            else -> {
                promise.resolve(CallsUtils.convertToJsMap(mapOf(
                    "hasNext" to false,
                    "result" to WritableNativeArray()
                )))
            }
        }
    }
    fun queryRelease(key: String) {
        directCallLogQueries.remove(key)
        roomListQueries.remove(key)
    }
}
