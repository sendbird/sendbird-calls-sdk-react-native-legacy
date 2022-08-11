package com.sendbird.calls.reactnative.view

import android.content.Context
import android.graphics.Color
import android.view.ViewGroup
import android.widget.RelativeLayout
import com.sendbird.calls.SendBirdVideoView
import org.webrtc.RendererCommon

open class BaseVideoView(context: Context) : RelativeLayout(context) {
    protected var mSurface: SendBirdVideoView
    protected var scalingType = RendererCommon.ScalingType.SCALE_ASPECT_FILL

    init {
        mSurface = SendBirdVideoView(context).apply {
            setBackgroundColor(Color.TRANSPARENT)
            setScalingType(scalingType)
            layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply {
                addRule(CENTER_IN_PARENT)
            }
        }
        this.addView(mSurface)
    }

    // BUG: https://github.com/facebook/react-native/issues/17968
    override fun requestLayout() {
        super.requestLayout()
        post {
            measure(
                MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
            )
            layout(left, top, right, bottom)
        }
    }

    private fun updateVideoSurfaceSizeManually() {
        when (scalingType) {
            RendererCommon.ScalingType.SCALE_ASPECT_FILL -> {
                mSurface.layout(0, 0, width, height)
            }
            else -> {
                // video frame ratio
                val videoAspectRatio = when (scalingType) {
                    RendererCommon.ScalingType.SCALE_ASPECT_FIT -> 1280f/720f
                    else -> 0.5625f
                }

                val frameDisplaySize = RendererCommon.getDisplaySize(
                    scalingType,
                    videoAspectRatio,
                    width, height
                )

                val l = (width - frameDisplaySize.x) / 2
                val t = (height - frameDisplaySize.y) / 2
                val r = l + frameDisplaySize.x
                val b = t + frameDisplaySize.y
                mSurface.layout(l, t, r, b)
            }
        }
    }

    fun setZOrderMediaOverlay(overlay: Boolean) {
        mSurface.setZOrderMediaOverlay(overlay)
    }

    fun setResizeMode(mode: String) {
        scalingType = when (mode) {
            "cover" -> RendererCommon.ScalingType.SCALE_ASPECT_FILL
            "contain" -> RendererCommon.ScalingType.SCALE_ASPECT_FIT
            "center" -> RendererCommon.ScalingType.SCALE_ASPECT_BALANCED
            else -> scalingType
        }
        mSurface.setScalingType(scalingType)
    }

    fun setMirror(enabled: Boolean) {
        mSurface.setMirror(enabled)
    }

    fun getSurface(): SendBirdVideoView {
        return mSurface
    }
}