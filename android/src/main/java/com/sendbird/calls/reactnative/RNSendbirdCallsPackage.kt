package com.sendbird.calls.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

//import com.facebook.react.BuildConfig
//import com.facebook.react.TurboReactPackage
//import com.facebook.react.module.model.ReactModuleInfo
//import com.facebook.react.module.model.ReactModuleInfoProvider

//class RNSendbirdCallsPackage() : TurboReactPackage() {
class RNSendbirdCallsPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(RNSendbirdCallsModule(reactContext))
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*,*>> {
        return listOf(RNSBDirectCallVideoViewManager(reactContext))
    }

//    override fun getModule(name: String?, reactContext: ReactApplicationContext): NativeModule? {
//        return if (name.equals(RNSendbirdCallsModuleImpl.NAME)) {
//            RNSendbirdCallsModule(reactContext);
//        } else {
//            null;
//        }
//    }
//
//    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
//        return ReactModuleInfoProvider {
//            val isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
//            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap();
//            moduleInfos[RNSendbirdCallsModuleImpl.NAME] = ReactModuleInfo(
//                    RNSendbirdCallsModuleImpl.NAME,
//                    RNSendbirdCallsModuleImpl.NAME,
//                    false,  // canOverrideExistingModule
//                    false,  // needsEagerInit
//                    true,  // hasConstants
//                    false,  // isCxxModule
//                    isTurboModule // isTurboModule
//            )
//            moduleInfos
//        }
//    }
}
