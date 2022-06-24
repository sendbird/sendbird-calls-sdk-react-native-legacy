package com.sendbird.calls.reactnative

class RNCallsInternalError(from: String? = "unknown", private val type: Type) : Exception(type.message) {
    override val message = "[${from}] ${this.type.message}"
    val code = INTERNAL_ERROR_CODE

    enum class Type(val message: String) {
        // DirectCall
        NOT_FOUND_DIRECT_CALL("There is no DirectCall"),
        NOT_FOUND_VIDEO_DEVICE("Cannot found device with specific id"),
        NOT_FOUND_VIDEO_VIEW("Cannot found video view"),
        INVALID_PARAMS("Invalid parameters"),
        // GroupCall - Room
        NOT_FOUND_ROOM("There is no Room"),
        NOT_FOUND_PARTICIPANT("There is no participant"),
        // others
        NOT_FOUND_QUERY("Cannot found query"),
        UNKNOWN("Unknown error")
    }

    companion object {
        const val INTERNAL_ERROR_CODE = "RNCALLS_INTERNAL"
    }
}
