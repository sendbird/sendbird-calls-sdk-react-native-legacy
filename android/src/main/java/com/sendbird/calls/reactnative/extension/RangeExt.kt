package com.sendbird.calls.reactnative.extension

import com.sendbird.calls.Range

fun Range.Companion.rangeFromReactNative(lowerBound: Double?, upperBound: Double?): Range? {
    if (lowerBound != null && upperBound != null) {
        return range(lowerBound.toLong(), upperBound.toLong())
    } else if (lowerBound != null && upperBound == null) {
        return greaterThanOrEqualTo(lowerBound.toLong())
    } else if (lowerBound == null && upperBound != null) {
        return lessThanOrEqualTo(upperBound.toLong())
    } else {
        return null
    }
}