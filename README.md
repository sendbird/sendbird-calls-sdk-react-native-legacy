# [Sendbird](https://sendbird.com) Calls SDK for React-Native

<span>
<img src="https://img.shields.io/badge/React Native-0.60+-black?logo=react" alt="RN 0.60+" >
<img src="https://img.shields.io/badge/iOS-11+-lightgray?logo=apple" alt="iOS 11.0+" >
<img src="https://img.shields.io/badge/Android-21+-green?logo=android" alt="Android 21.0+" />
</span>

## Table of contents

1. [Introduction](#introduction)
1. [Before getting started](#before-getting-started)
1. [Getting started](#getting-started)
1. [Configuring the application for the SDK](#configuring-the-application-for-the-sdk)
1. [Making your first call](#making-your-first-call)
1. [Implementation direct call guide](#implementation-direct-call-guide)
1. [Making your first group call](#making-your-first-group-call)
1. [Implementation group call guide](#implementation-group-call-guide)
1. [Appendix](#appendix)

<br />

## Introduction

**Sendbird Calls** is the latest addition to our product portfolio. It enables real-time calls between users within a Sendbird application. SDKs are provided for iOS, Android, and JavaScript. Using any one of these, developers can quickly integrate voice and video call functions into their own client apps, allowing users to make and receive web-based real-time voice and video calls on the Sendbird platform.

> If you need any help in resolving any issues or have questions, please visit [our community](https://community.sendbird.com)

### How it works

Sendbird Calls SDK for React-Native provides a module to make and receive voice and video calls. **Direct calls** in the SDK refers to one-to-one calls. To make a direct voice or video call, the caller specifies the user ID of the intended callee, and dials. Upon dialing, all of the callee’s authenticated devices will receive notifications for an incoming call. The callee then can choose to accept the call from any one of the devices. When the call is accepted, a connection is established between the devices of the caller and the callee. This marks the start of a direct call.

**Group calls** in the SDK refers to many-to-many calls. One person creates a room, and multiple people can join the room by using the room ID of the created room.

In both **Direct calls** and **Group calls**, participants can control audio devices like mute or unmute audio and video devices such as toggle between the front and rear camera. With this, they're possible to participate in the calls using both or only one of them.

The [Sendbird Dashboard](https://dashboard.sendbird.com/auth/signin) displays **Direct calls** logs in the Calls menu for dashboard owners and admins to review. And you can see the created **Group calls** room information and the entering and exiting times of users who participated in the room.

### More about Sendbird Calls SDK for React-Native

Find out more about Sendbird Calls for React-Native on Calls SDK for React-Native doc.

<br />

## Before getting started

This section shows the prerequisites you need to check to use Sendbird Calls SDK for React-Native.

### Requirements

- React-Native 0.60 or higher
- iOS 11.0 or higher
- Android 5.0 (API level 21) or higher

### SDK dependencies

- [Sendbird Calls SDK for iOS](https://github.com/sendbird/sendbird-calls-ios), which can be integrated by `CocoaPods`
- [Sendbird Calls SDK for Android](https://github.com/sendbird/sendbird-calls-android), which can be integrated by `Gradle`

<br />

## Getting started

This section gives you information you need to get started with Sendbird Calls SDK for React-Native.

### Install Calls SDK

### React-Native

```shell
npm i @sendbird/calls-react-native
npx pod-install
```

<br />

## Configuring the application for the SDK

## iOS

### Background Mode

To support background operation, VoIP-enabled apps must have `Background Mode` enabled in the **Xcode Project** > **Signing & Capabilities** pane. Select the checkbox for **Voice over IP**.

To receive push notifications, the app also must have **Push Notifications** enabled in the **Xcode Project** > **Signing & Capabilities** pane.

> For more information about VoIP push notification and PushKit, see Apple's [CallKit](https://developer.apple.com/documentation/callkit) and [PushKit](https://developer.apple.com/documentation/pushkit)

### Configure the app’s Info.plist File

iOS requires that apps display authorization message to grant the app access to the camera and microphone.

- Microphone-enabled apps must include the [NSMicrophoneUsageDescription](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW25) key in the app’s `Info.plist` file.
- Camera-enabled apps must include the [NSCameraUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nscamerausagedescription) key in the app’s `Info.plist` file.

## Android

### (Optional) Configure ProGuard to shrink code and resources

When you build your APK with `minifyEnabled true`, add the following line to the module's ProGuard rules file.

```
# SendBird Calls SDK
-keep class com.sendbird.calls.** { *; }
-keep class org.webrtc.** { *; }
-dontwarn org.webrtc.**
-keepattributes InnerClasses
```

<br />

## Getting Permissions

The SDK requires system permissions. The following permissions allow the SDK to access the microphone and use audio.

- Camera
- Microphone
- Bluetooth (Android)

We recommend [`react-native-permissions`](https://github.com/zoontek/react-native-permissions) library

```ts
import Permissions, { PERMISSIONS } from 'react-native-permissions';

const CALL_PERMISSIONS = Platform.select({
  android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.BLUETOOTH_CONNECT],
  ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
  default: [],
});

const result = await Permissions.requestMultiple(CALL_PERMISSIONS);
```

## Making your first direct call

Follow the step-by-step instructions below to authenticate and make your first direct call.

### Step 1: Initialize the SendbirdCall instance in a client app

As shown below, the `SendbirdCalls` instance must be initiated when a client app is launched.
Initialize the `SendbirdCalls` instance with the `APP_ID` of the Sendbird application you would like to use to make a call.

```ts
import { SendbirdCalls } from '@sendbird/calls-react-native';

SendbirdCalls.initialize(APP_ID);
```

> Note: If another initialization with another `APP_ID` takes place, all existing data in the app will be deleted and the `SendbirdCalls` instance will be initialized with the new `APP_ID`.

### Step 2: Authenticate a user and register a push token

In order to make and receive calls, authenticate the user with SendBird server with the `SendbirdCalls.authenticate()` method and **register a push token** to Sendbird.

#### iOS

Register a VoIP push token by using the `SendbirdCalls.ios_registerVoIPPushToken()` method after authentication has completed.
VoIP Push Notification will also enable receiving calls even when the app is in the background or terminated state.
A valid APNS certificate also needs to be registered on the [Sendbird Dashboard](https://dashboard.sendbird.com/auth/signin): **Application** > **Settings** > **Notifications** > **Add certificate**.
For more details on registering push tokens, refer to Calls SDK for React-Native doc.

> **NOTE**: In order to receive incoming calls to a user's device, you must implement either VoIP notifications or remote notifications.
> If you want to register a APNS token, you can register APNS token by using `SendbirdCalls.registerPushToken()` method
>
> refer to Calls SDK for iOS doc.

#### Android

Register a FCM push token by using the `SendbirdCalls.registerPushToken()` method after authentication has completed.
Push Notification will also enable receiving calls even when the app is in the background or closed entirely.

```ts
import { SendbirdCalls } from '@sendbird/calls-react-native';
import RNVoipPushNotification from 'react-native-voip-push-notification';
import messaging from '@react-native-firebase/messaging';

// Authenticate
SendbirdCalls.authenticate({
    userId: USER_ID,
    accessToken: ACCESS_TOKEN,
})
    .then(user => {
        // The user has been authenticated successfully
    })
    .catch(error => {
        // error
    })

// Update FCM push token
if (Platform.OS === 'android') {
    const fcmToken = await messaging().getToken();
    await SendbirdCalls.registerPushToken(fcmToken);
    // The FCM Push Token has been registered successfully
}

// Update VoIP push token
if (Platform.OS === 'ios') {
    RNVoipPushNotification.addEventListener('register', async (voipToken) => {
        await SendbirdCalls.ios_registerVoIPPushToken(voipToken)
        // The VoIP Push Token has been registered successfully
    });
    RNVoipPushNotification.registerVoipToken();
}
```

### Step 3: Add an event handler

The SDK provides two types of event handlers for various events that client apps may respond to: `SendbirdCallListener` Listener and `DirectCallListener`

#### - SendbirdCallListener

Register a device-specific `onRinging` event handler using the `SendbirdCalls.setListener()` method.
It is recommended to add the event handler during initialization because it is a prerequisite for detecting onRinging event.
The code below shows the way device-wide events such as incoming calls are handled once `SendbirdCallListener.onRinging` is added.

```ts
SendbirdCalls.setListener({
  onRinging(callProps: DirectCallProperties) {
    // Process incoming call
  },
});
```

| Listener  | Invoked when                                        |
| --------- | --------------------------------------------------- |
| onRinging | Incoming calls are received in the callee’s device. |

> **NOTE**: You can set up only one SendbirdCallListener.

#### - DirectCallListener

Register a call-specific `DirectCallListener` event handler using the `DirectCall.addListener()` method.
Responding to call-specific events, such as establishing a successful call connection, is then handled as shown below:

```ts
const unsubscribe = directCall.addListener({
  onEstablished: (call: DirectCallProperties) => {},

  onConnected: (call: DirectCallProperties) => {},

  onEnded: (call: DirectCallProperties) => {},

  onRemoteAudioSettingsChanged: (call: DirectCallProperties) => {},

  onRemoteVideoSettingsChanged: (call: DirectCallProperties) => {},

  onCustomItemsUpdated: (call: DirectCallProperties, updatedKeys: string[]) => {},

  onCustomItemsDeleted: (call: DirectCallProperties, deletedKeys: string[]) => {},

  onReconnecting: (call: DirectCallProperties) => {},

  onReconnected: (call: DirectCallProperties) => {},

  onAudioDeviceChanged: (call: DirectCallProperties, info: AudioDeviceChangedInfo) => {},

  onRemoteRecordingStatusChanged: (call: DirectCallProperties) => {},

  onUserHoldStatusChanged: (call: DirectCallProperties, isLocalUser: boolean, isUserOnHold: boolean) => {},

  onLocalVideoSettingsChanged: (call: DirectCallProperties) => {},
});

unsubscribe();
```

> **NOTE** Don't forget remove the listener.
> For example, you can call `unsubscribe()` from `onEnded` of listener you set or clean-up of `useEffect`.

<br/>

| Method                           | Invocation criteria                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onEstablished()                  | The callee accepted the call using the method `directCall.accept()`. However, neither the caller or callee’s devices are connected to media devices yet.                                                                                                                                                          |
| onConnected()                    | A connection is established between the caller and callee’s media devices such as microphones and speakers. The voice or video call can begin.                                                                                                                                                                    |
| onEnded()                        | The call is ended on either the caller or the callee’s devices. When the `directCall.end()` method is used from either party, a call ends. directCall.end event listener is also invoked if the call is ended for other reasons. Refer to Call results in Appendix for all possible reasons for call termination. |
| onRemoteAudioSettingsChanged()   | The other party changed their audio settings.                                                                                                                                                                                                                                                                     |
| onRemoteVideoSettingsChanged()   | The other party changed their video settings.                                                                                                                                                                                                                                                                     |
| onCustomItemsUpdated()           | One or more of `DirectCall`’s custom items (metadata) have been updated.                                                                                                                                                                                                                                          |
| onCustomItemsDeleted()           | One or more of `DirectCall`’s custom items (metadata) have been deleted.                                                                                                                                                                                                                                          |
| onReconnecting()                 | `DirectCall` started attempting to reconnect to the other party after a media connection disruption.                                                                                                                                                                                                              |
| onReconnected()                  | The disrupted media connection reestablished.                                                                                                                                                                                                                                                                     |
| onAudioDeviceChanged()           | The audio device used in the call has changed.                                                                                                                                                                                                                                                                    |
| onRemoteRecordingStatusChanged() | The other user's recording status has been changed.                                                                                                                                                                                                                                                               |
| onUserHoldStatusChanged()        | The local or remote user puts a call on hold or removes a hold from a call.                                                                                                                                                                                                                                       |
| onLocalVideoSettingsChanged()    | The local user's video settings has been changed.                                                                                                                                                                                                                                                                 |

### Step 4: Make a call

First, prepare the call parameters to initiate a call.
The parameter contains the initial call configuration, such as callee’s user id, audio or video capabilities, and `CallOptions` object.
Once prepared, the call parameters are then passed into the `SendbirdCalls.dial()` method to start the call.

> **NOTE**: For reduce the event delay between Native and JavaScript, SDK does not convert `DirectCallProperties` to `DirectCall` on `SendbirdCallListener.onRinging` or `SendbirdCalls.Dial`.
> So you need to get `DirectCall` using `SendbirdCalls.getDirectCall()` after receiving the event or call method.

```ts
const callOptions: CallOptions = {
    audioEnabled: true,
    videoEnabled: true,
    frontCamera: true,
}

const callProps = await SendbirdCalls.dial(CALLEE_ID, IS_VIDEO_CALL, callOptions);

const directCall = await SendbirdCalls.getDirectCall(callProps.callId);
directCall.addListener({
    // ...
});
```

### Step 5: Receive a call

Register `SendbirdCallListener` first to receive incoming calls.
Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods.
If the call is accepted, a media session will automatically be established by the SDK.

Before accepting any calls, the `DirectCall.addListener` must be registered upfront in the `SendbirdCallListener.onRinging`.
Once registered, `DirectCallListener` enables reacting to in-call events through listener methods.

```ts
SendbirdCalls.setListener({
  async onRinging(callProps: DirectCallProperties) {
    const directCall = await SendbirdCalls.getDirectCall(callProps.callId);

    const unsubscribe = directCall.addListener({
      onEnded(call) {
        unsubscribe();
      },
    });

    directCall.accept();
  },
});
```

<br />

## Implementation direct call guide

### Make a call

Register `SendbirdCallLisetner` first to receive incoming calls.
Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods.
If the call is accepted, a media session will automatically be established by the SDK.

Before accepting any calls, the `DirectCall.addListener` must be registered upfront in the `SendbirdCallListener.onRinging`.
Once registered, `DirectCallListener` enables reacting to in-call events through listener methods.

```ts
SendbirdCalls.setListener({
  async onRinging(callProps: DirectCallProperties) {
    const directCall = await SendbirdCalls.getDirectCall(callProps.callId);

    const unsubscribe = directCall.addListener({
      onEnded(call) {
        unsubscribe();
      },
    });

    directCall.accept();
  },
});
```

### Receive a call

Register `SendbirdCallListener` first to receive incoming calls.
Accept or decline incoming calls using the `directCall.accept()` or the `directCall.end()` methods.
If the call is accepted, a media session will automatically be established by the SDK.

Before accepting any calls, the `DirectCall.addListener` must be registered upfront in the `SendbirdCallListener.onRinging`.
Once registered, `DirectCallListener` enables reacting to in-call events through listener methods.

```ts
SendbirdCalls.setListener({
  async onRinging(callProps) {
    const directCall = await SendbirdCalls.getDirectCall(callProps.callId);

    const unsubscribe = directCall.addListener({
      onEnded(call) {
        unsubscribe();
      },
    });

    directCall.accept();
  },
});
```

### Receive a call in background

#### iOS

When the app is in the foreground, incoming call events are received through the SDK’s persistent internal server connection.
However, when the app is terminated or in the background, incoming calls are received through PushKit.
PushKit messages received by the `Native iOS SDK` must be delivered to the `SendBirdCall.pushRegistry(_:didReceiveIncomingPushWith:for:)` method.

> **NOTE**: in objective-c, `[SBCSendBirdCall pushRegistry:_ didReceiveIncomingPushWith:for:]`

So you should implement native features that `CallKit` and `PushKit(VoIP Push)` to your react-native app.
(e.g. [`react-native-callkeep`](https://github.com/react-native-webrtc/react-native-callkeep), [`react-native-voip-push-notification`](https://github.com/react-native-webrtc/react-native-voip-push-notification))

```objc
// AppDelegate.h

#import <PushKit/PushKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, PKPushRegistryDelegate>
```

```objc
// AppDelegate.m

#import <RNCallKeep.h>
#import <SendBirdCalls/SendBirdCalls-Swift.h>

// ...

- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)())completion
{
  [SBCSendBirdCall pushRegistry:registry didReceiveIncomingPushWith:payload for:type completionHandler:^(NSUUID * _Nullable uuid) {

    // IMPORTANT: Incoming calls MUST be reported when receiving a PushKit push.
    //  If you don't report to CallKit, the app will be terminated.

    if(uuid != nil) {

      // Report valid call

      SBCDirectCall* call = [SBCSendBirdCall callForUUID: uuid];
      [RNCallKeep reportNewIncomingCall: [uuid UUIDString]
                                 handle: [[call remoteUser] userId]
                             handleType: @"generic"
                               hasVideo: [call isVideoCall]
                    localizedCallerName: [[call remoteUser] nickname]
                        supportsHolding: YES
                           supportsDTMF: YES
                       supportsGrouping: YES
                     supportsUngrouping: YES
                            fromPushKit: YES
                                payload: [payload dictionaryPayload]
                  withCompletionHandler: completion];
    } else {

      // Report and end invalid call

      NSUUID* uuid = [NSUUID alloc];
      NSString* uuidString = [uuid UUIDString];

      [RNCallKeep reportNewIncomingCall: uuidString
                                 handle: @"invalid"
                             handleType: @"generic"
                               hasVideo: NO
                    localizedCallerName: @"invalid"
                        supportsHolding: NO
                           supportsDTMF: NO
                       supportsGrouping: NO
                     supportsUngrouping: NO
                            fromPushKit: YES
                                payload: [payload dictionaryPayload]
                  withCompletionHandler: completion];
      [RNCallKeep endCallWithUUID:uuidString reason:1];
    }
  }];
}
```

```ts
import RNCallKeep from 'react-native-callkeep';
import RNVoipPushNotification from 'react-native-voip-push-notification';

SendbirdCalls.setListener({
  async onRinging(callProps) {
    const directCall = await SendbirdCalls.getDirectCall(callProps.callId);

    // handle incoming call with CallKit (react-native-callkeep)
    RNCallKeep.addEventListener('answerCall', async () => {
      directCall.accept();
    });
    RNCallKeep.addEventListener('endCall', async () => {
      directCall.end();
    });

    const unsubscribe = directCall.addListener({
      onEnded() {
        RNCallKeep.removeEventListener('answerCall');
        RNCallKeep.removeEventListener('endCall');
        RNCallKeep.endAllCalls();
        unsubscribe();
      },
    });

    RNCallKeep.displayIncomingCall(
      callProps.ios_callUUID,
      callProps.remoteUser?.userId,
      callProps.remoteUser?.nickname ?? 'Unknown',
      'generic',
      callProps.isVideoCall,
    );
  },
});

RNVoipPushNotification.registerVoipToken();
```

#### Android

When the app is in the foreground, incoming call events are received through the SDK’s persistent internal server connection.
However, when the app is closed or in the background, incoming calls are received through the Firebase Cloud Messaging’s (FCM) push notifications.
The FCM messages received by SendbirdCalls must be delivered to the SDK through the `SendbirdCalls.android_handleFirebaseMessageData()` method.

```ts
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

SendbirdCalls.setListener({
  async onRinging(callProps) {
    const directCall = await SendbirdCalls.getDirectCall(callProps.callId);

    // handle incoming call with what you want (e.g. Notifee foreground service)
  },
});

const firebaseListener = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  SendbirdCalls.android_handleFirebaseMessageData(message.data);
};
messaging().setBackgroundMessageHandler(firebaseListener);
messaging().onMessage(firebaseListener);
```

### Handle a current call

During an ongoing call, a caller may mute or unmute their microphone by using the `directCall.muteMicrophone()` or `directCall.unmuteMicrophone()` methods.
`DirectCallListener.onRemoteAudioSettingsChanged()` listener method will notify any changes that a remote user makes on audio settings to the local user.

The caller may start or stop video using the `directCall.startVideo()` or `directCall.stopVideo()` methods.
If the remote user changes the video settings, the local user will be notified through the `DirectCallListener.onRemoteVideoSettingsChanged()` listener.
The current video device can be changed by using the `directCall.selectVideoDevice()` or `directCall.switchCamera()`.

```swift
// mute my microphone
directCall.muteMicrophone();

// unmute my microphone
directCall.unmuteMicrophone();

// starts to show video
directCall.startVideo();

// stops showing video
directCall.stopVideo();

// changes current video device
directCall.selectVideoDevice(VIDEO_DEVICE).catch(error => {
})

// receives the event
directCall.addListener({
  ...

  onRemoteAudioSettingsChanged: (callProps: DirectCallProperties) => {
    if (callProps.isRemoteAudioEnabled) {
        // The peer has been unmuted.
        // Consider displaying an unmuted icon.
    } else {
        // The peer has been muted.
        // Consider displaying and toggling a muted icon.
    }
  },

  onRemoteVideoSettingsChanged: (callProps: DirectCallProperties) => {
    if (callProps.isRemoteVideoEnabled) {
        // The peer has started video.
    } else {
        // The peer has stopped video.
    }
  },
});
```

### End a call

A caller may end a call using the `directCall.end()` method. The event will then be processed through the `DirectCallListener.onEnded()` listener.
This listener is also triggered if the remote user ends the call.

```ts
// End a call
call.end();

// receives the event
directCall.addListener({
    ...

        onEnded: (callProps: DirectCallProperties) => {
    // Consider releasing or destroying call-related view from here.
},
});
```

### Unregister a push token and deauthenticate a user

#### - Unregister one or all VoIP push tokens

> **Warning**: unregister all is not supported yet.

Users will no longer receive call notifications after the VoIP push token has been unregistered
through the `unregisterPushToken(TOKEN)` or `unregisterVoIPPushToken(TOKEN)` method before deauthenticate.

[//]: # 'To stop sending notifications to all of the user’s logged in devices, call the `unregisterAllVoIPPushTokens(completionHandler:)` method.'

```ts
const unregisterPushToken = () => {
  SendbirdCalls.unregisterPushToken(TOKEN);

  // or

  SendbirdCalls.ios_unregisterVoIPPushToken(TOKEN);
};
```

#### - Deauthenticate a user

When users log out of their call client apps, they must be deauthenticated with `SendbirdCalls.deauthenticate()` method.

```ts
const signOut = () => {
  SendbirdCalls.deauthenticate();
};
```

### Display Video

```tsx
import { DirectCallVideoView } from '@sendbird/calls-react-native';

const YourApp = () => {
  const directCall = useDirectCall(callId);

  return (
    <View>
      {/* Remote video view */}
      <DirectCallVideoView viewType={'remote'} callId={directCall.callId} />

      {/* Local video view */}
      <DirectCallVideoView viewType={'local'} callId={directCall.callId} />
    </View>
  );
};
```

### Mirror a DirectCallVideoView

```tsx
const VideoView = () => {
  return <DirectCallVideoView mirror={false} callId={'CALL_ID'} viewType={'remote'} />;
};
```

### Retrieve a call information

The local or remote user’s information is available via the `directCall.localUser` and `directCall.remoteUser` properties.

### Retrieve call history

Sendbird server automatically stores details of calls, which can be retrieved later to display call history for users.
A user’s call history is available through a `DirectCallLogListQuery` instance.

```tsx
import { DirectCallEndResult, DirectCallLogListQuery, SendbirdCalls } from '@sendbird/calls-react-native';

const useCallHistory = () => {
  const [history, setHistory] = useState<DirectCallLog[]>([]);
  const query = useRef<DirectCallLogListQuery>();

  useEffect(() => {
    const effect = async () => {
      query.current = await SendbirdCalls.createDirectCallLogListQuery({
        myRole: 'ALL',
        endResults: [
          DirectCallEndResult.COMPLETED,
          DirectCallEndResult.CANCELED,
          DirectCallEndResult.DECLINED,
          DirectCallEndResult.DIAL_FAILED,
          DirectCallEndResult.ACCEPT_FAILED,
        ],
        limit: 20,
      });

      const data = await query.current.next();
      setHistory(data);
    };

    effect();

    return () => {
      query.current.release();
    };
  }, []);

  return {
    next: async () => {
      if (query.hasNext) {
        const data = await query.current.next();
        setHistory((prev) => prev.concat(...data));
      }
    },
    history,
  };
};
```

| Params     | Description                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit      | Specifies the number of call history entries to return at once.                                                                                                                                                                                                                       |
| myRole     | Returns the call history of the specified role. For example, the `params.myRole = CALLEE` returns only the callee’s call history.)                                                                                                                                                    |
| endResults | Filters the results based on the call end result such as `COMPLETED`,`NO_ANSWER`, etc. If multiple values are specified, they are processed as an `OR` condition. For example, for `endResults: [NO_ANSWER]`, only the history entries that resulted in `NO_ANSWER` will be returned. |

| Method    | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| next()    | Used to query the call history from Sendbird Calls server.                  |
| hasNext   | If **true**, there are additional call history entries yet to be retrieved. |
| isLoading | If **true**, the call history is being retrieved from the server.           |

### Timeout options

> **Warning**: Not supported yet.

The following table lists a set of methods of the `SendbirdCalls` class.

### Sound effects

You should add files to your native project
for Android, add your files to `res/raw/{filename}.mp3`
for iOS, when you add files to a project, xcode automatically added to the bundled resources (Build Phases > Copy Bundle Resources)

#### - Sound types

| Type         | Description                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| dialing      | Refers to a sound that is played on a caller’s side when the caller makes a call to a callee.                                                     |
| ringing      | Refers to a sound that is played on a callee’s side when receiving a call.                                                                        |
| reconnecting | Refers to a sound that is played when a connection is lost, but immediately tries to reconnect. Users are also allowed to customize the ringtone. |
| reconnnected | Refers to a sound that is played when a connection is re-established.                                                                             |

#### - Add sound

| Method             | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| addDirectCallSound | Adds a specific sound to a direct call such as a ringtone or an alert tone with an Android resource ID. |

| Parameter | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| soundType | SoundType | Specifies the sound type to be used according to the event. |
| fileName  | int       | Specifies the Android resource ID.                          |

#### - Remove sound

| Method                | Description                                  |
| --------------------- | -------------------------------------------- |
| removeDirectCallSound | Removes a specific sound from a direct call. |

| Parameter | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| soundType | SoundType | Specifies the sound type to be used according to the event. |

<br />

### Call results

Information relating the end result of a call can be obtained at any time through the `directCall.endResult` property, best invoked within the `onEnded()` listener.

| DirectCallEndResult   | Description                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NO_ANSWER             | The callee failed to either accept or decline the call within a specific amount of time.                                                                          |
| CANCELED              | The caller canceled the call before the callee could accept or decline.                                                                                           |
| DECLINED              | The callee declined the call.                                                                                                                                     |
| COMPLETED             | The call ended after either party ended it                                                                                                                        |
| TIMED_OUT             | Sendbird Calls server failed to establish a media session between the caller and callee within a specific amount of time.                                         |
| CONNECTION_LOST       | The data stream from either the caller or the callee has stopped due to a `WebRTC` connection issue.                                                              |
| DIAL_FAILED           | The `dial()` method call has failed.                                                                                                                              |
| ACCEPT_FAILED         | The `accept()` method call has failed.                                                                                                                            |
| OTHER_DEVICE_ACCEPTED | The incoming call was accepted on a different device. This device received an incoming call notification, but the call ended when a different device accepted it. |
| NONE                  | Default value of the endResult.                                                                                                                                   |
| UNKNOWN               | Ended with unknown reason.                                                                                                                                        |

<br />

## Making your first group call

Follow the step-by-step instructions below to authenticate and make your first group call.

### Step 1: Initialize the SendbirdCall instance in a client app

As shown below, the `SendbirdCalls` instance must be initiated when a client app is launched.
Initialize the `SendbirdCalls` instance with the `APP_ID` of the Sendbird application you would like to use to make a call.

```ts
import { SendbirdCalls } from '@sendbird/calls-react-native';

SendbirdCalls.initialize(APP_ID);
```

> Note: If another initialization with another `APP_ID` takes place, all existing data in the app will be deleted and the `SendbirdCalls` instance will be initialized with the new `APP_ID`.

### Step 2: Authenticate a user

In order to participate in the group calls, authenticate the user with SendBird server with the `SendbirdCalls.authenticate()` method.

```ts
import { SendbirdCalls } from '@sendbird/calls-react-native';

// Authenticate
SendbirdCalls.authenticate({
  userId: USER_ID,
  accessToken: ACCESS_TOKEN,
})
  .then((user) => {
    // The user has been authenticated successfully
  })
  .catch((error) => {
    // error
  });
```

### Step 3: Create a room

By calling the `SendbirdCalls.createRoom()` by passing `SMALL_ROOM_FOR_VIDEO` as the parameter, you can create a room for up to 6 participants to make a video call. When a room is created, the status of the room becomes `OPEN` and `ROOM_ID` is generated.

```ts
const room = await SendbirdCalls.createRoom(SendbirdCalls.RoomType.SMALL_ROOM_FOR_VIDEO);
```

> **Note**: Share the room ID with other users for them to enter the room from the client app.

### Step 4: Enter a room

A user can search a room with a specific `ROOM_ID` to participate in a group call at any time.

#### - retrieve a room instance

To enter a room, you must first acquire the room instance from Sendbird server with the room ID. To fetch the most up-to-date room instance from Sendbird server, use the `SendbirdCalls.fetchRoomById()` method. Also, you can use the `SendbirdCalls.getCachedRoomById()` method that returns the most recently cached room instance from Sendbird Calls SDK.

```ts
// get room instance using ROOM_ID
const room = await SendbirdCalls.fetchRoomById(ROOM_ID);

// get cached room instance using ROOM_ID
const room = await SendbirdCalls.getCachedRoomById(ROOM_ID);
```

#### - enter a room

Once the room is retrieved, call the `enter()` method to enter the room. An object that sets whether to use video and audio is passed to `enter()` as a parameter. If no parameters are passed, both audio and video are enabled as default.

When a user enters a room, a participant is created with a unique `participant ID` to represent the user in the room.

If you create a room using `SendbirdCalls.createRoom()`, you can use the returned room instance without needing to get a room instance.

```ts
const enterParams: EnterParams = {
    audioEnabled: true,
    videoEnabled: true,
}
await room.enter(enterParams)
```

> **NOTE**: If there is no room whose ID is room ID passed as a parameter among the cached room instances, `SendbirdCalls.getCachedRoomById()` returns `null`. So you should need to check the returned value before calling `enter()`.

### Step 5: Handle events in a room

A user can receive events of a room that they are currently participating. Users will be notified when other participants enter or leave the room, change their media settings, or when the room is deleted.

#### - Add event listener

Add an event listener for the user to receive events that occur in a room that the user joins as a participant.

```ts
const unsubscribe = room.addListener({
  onRemoteParticipantEntered: (participant: Participant) => {},

  onRemoteParticipantExited: (participant: Participant) => {},

  onRemoteParticipantStreamStarted: (participant: Participant) => {},

  onRemoteVideoSettingsChanged: (participant: Participant) => {},

  onRemoteAudioSettingsChanged: (participant: Participant) => {},

  onAudioDeviceChanged: (info: AudioDeviceChangedInfo) => {},

  onCustomItemsUpdated: (updatedKeys: string[]) => {},

  onCustomItemsDeleted: (deletedKeys: string[]) => {},

  onDeleted: () => {},

  onError: (e: SendbirdError, participant: Participant | null) => {},
});

unsubscribe();
```

> **NOTE** Don't forget to remove the listener.
> For example, you can call `unsubscribe()` from clean-up of `useEffect`.

<br/>

| Method                             | Invocation criteria                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| onRemoteParticipantEntered()       | Invoked when a remote participant has entered a room.                           |
| onRemoteParticipantExited()        | Invoked when a remote participant has exited a room.                            |
| onRemoteParticipantStreamStarted() | Invoked when a remote participant has started media streaming.                  |
| onRemoteVideoSettingsChanged()     | Invoked when a remote participant's video settings have changed.                |
| onRemoteAudioSettingsChanged()     | Invoked when a remote participant's audio settings have changed.                |
| onAudioDeviceChanged()             | Invoked when the audio device used in the call has changed.                     |
| onCustomItemsUpdated()             | Invoked when one or more of `Room`’s custom items (metadata) have been updated. |
| onCustomItemsDeleted()             | Invoked when one or more of `Room`’s custom items (metadata) have been deleted. |
| onDeleted()                        | Invoked when `Room` is deleted.                                                 |
| onError()                          | Invoked when a participant stream is lost due to reconnection failure.          |

<br />

### Step 6: Exit a room

To leave a room, call `exit()`. On the room handlers of the remaining participants, the `onRemoteParticipantExited()` method will be called.

```ts
room.exit();
```

<br />

## Implementation group call guide

### Create a room

A room is a must to use a **Group calls** to talk to multiple people. You can create a new room using `SendbirdCalls.createRoom()`. Once the room is created, you must use `enter()` to enter the room. And then you have to share the `ROOM_ID` of the room with other users in order for other participants can enter the room.

```ts
const room = await SendbirdCalls.createRoom(SendbirdCalls.RoomType.SMALL_ROOM_FOR_VIDEO);
await room.enter();
```

### Handle events in a room

A user can receive events of a room that they are currently participating. Users will be notified when other participants enter or leave the room, change their media settings, or when the room is deleted.

You don't need to define all events method, you just need to define the methods you want to implement. And, don't forget to remove the listener. For example, you can call `unsubscribe()` from clean-up of `useEffect`.

```tsx
useEffect(() => {
  const unsubscribe = room.addListener({
    onRemoteParticipantEntered: (participant: Participant) => {},

    onRemoteParticipantExited: (participant: Participant) => {},

    onRemoteParticipantStreamStarted: (participant: Participant) => {},

    ...
  });

  return unsubscribe();
}, []);
```

### Enter a room

Use `SendbirdCalls.fetchRoomById()` with `ROOM_ID` to get the room instance you want to enter. Or, if you have fetched the room before, you can use `SendbirdCalls.getCachedRoomById()` to get a cached room instance. Then call the `enter()` method to enter the room.

When a user enters a room, a participant is created with a unique `participant ID` to represent the user in the room. When the remote user enters the room, the `onRemoteParticipantEntered()` listener method is called. And then when the participant has started media streaming, `onRemoteParticipantStreamStarted()` listener method is called.

> **NOTE**: If there is no room whose ID is room ID passed as a parameter among the cached room instances, `SendbirdCalls.getCachedRoomById()` returns `null`. So you should need to check the returned value.

```ts
// get room instance using ROOM_ID
const room = await SendbirdCalls.fetchRoomById(ROOM_ID);
await room.enter()

// get cached room instance using ROOM_ID
const room = await SendbirdCalls.getCachedRoomById(ROOM_ID);
await room?.enter()

// receives the event
room.addListener({
  onRemoteParticipantEntered: (participant: Participant) => {
    // the remote participant entered the room
  },

  onRemoteParticipantStreamStarted: (participant: Participant) => {
    // the remote participant has started media streaming
  },

  ...
});
```

### Handle a current call

Participants can mute or unmute their microphones using the `room.localParticipant.muteMicrophone()` or `room.localParticipant.unmuteMicrophone()` methods.
`onRemoteAudioSettingsChanged()` listener method is invoked whenever the remote participant's audio settings change.

You can also use the `room.localParticipant.startVideo()` and `room.localParticipant.stopVideo()` methods to turn video off or on. `onRemoteVideoSettingsChanged()` method is invoked whenever the remote participant's video settings change.

If you want to switch to using the device's front and back cameras, call `room.localParticipant.switchCamera()`.

```ts
// mute my microphone
room.localParticipant.muteMicrophone();

// unmute my microphone
room.localParticipant.unmuteMicrophone();

// starts to show video
room.localParticipant.startVideo();

// stops showing video
room.localParticipant.stopVideo();

// changes current video device
room.localParticipant.switchCamera();

// receives the event
room.addListener({
  onRemoteVideoSettingsChanged: (participant: Participant) => {
    if (participant.isVideoEnabled) {
      // remote Participant has started video.
    } else {
      // remote Participant has stopped video.
    }
  },

  onRemoteAudioSettingsChanged: (participant: Participant) => {
    if (participant.isAudioEnabled) {
      // remote Participant has been unmuted.
      // Consider displaying an unmuted icon.
    } else {
      // remote Participant has been muted.
      // Consider displaying and toggling a muted icon.
    }
  },

  ...
});
```

### Exit a room

Participants can use the `exit()` method to leave the room and end the group call. When the remote participant leaves the room, the `onRemoteParticipantExited()` listener method is called.

```ts
// Exit a room
room.exit();

// receives the event
room.addListener({
  onRemoteParticipantExited: (participant: Participant) => {
    // Consider destroying the remote participant's view.
  },

  ...
});
```

## Display Video

By passing the `participant` instance and `ROOM_ID` to the `GroupCallVideoView` component, you can display the streamed view on the screen. Group calls can have up to 6 people, so you should need to think about how to arrange views on the screen depending on the number of participants.

```tsx
import { GroupCallVideoView, SendbirdCalls } from '@sendbird/calls-react-native';

const YourApp = () => {
  const room = await SendbirdCalls.getCachedRoomById(ROOM_ID);

  return (
    <View>
      {room.participants.map((participant) => (
        <GroupCallVideoView
          participant={participant}
          roomId={room.roomId}
          resizeMode={'contain'}
          style={{}}
        />
      )}
    </View>
  );
};
```

<br/>

| Props       | Description                                           |
| ----------- | ----------------------------------------------------- |
| participant | participant instance to display on screen             |
| roomId      | ID of the participating room                          |
| resizeMode  | how to resize the image. 'contain', 'cover', 'center' |
| style       | style object for component                            |

### Retrieve a participant information

The local or remote participant’s information is available via the `room.participants` or `room.localParticipant` and `room.remoteParticipants` properties.

<br />

## Appendix

### Encoding Configurations

#### iOS

| Category           | Value      | Note                                                  |
| ------------------ | ---------- | ----------------------------------------------------- |
| Frames per second  | 24 fps     |                                                       |
| Maximum resolution | 720p       | 1280x720 px; standard HD                              |
| Audio Codec        | OPUS       |                                                       |
| Video Codec        | H.264, VP8 | H.264 is used between iOS devices as a default codec. |

#### Android

| Category           | Value | Note                    |
| ------------------ | ----- | ----------------------- |
| Frames per second  | 24    |                         |
| Maximum resolution | 720p  | 1280 x 720; standard HD |
| Audio codec        | OPUS  |                         |
| Video codec        | VP8   |                         |

### SDK Sizes

#### iOS

| File               | Raw Files | Compiled Size |
| ------------------ | --------- | ------------- |
| Calls SDK (1.7.0)  | 77.1 MB   | 2.32 MB       |
| WebRTC SDK (1.3.0) | 1.18 GB   | 6.32 MB       |

(Xcode 12.3, Any iOS Device (arm64))

#### Android

| File       | Raw files | Compiled size |
| ---------- | --------- | ------------- |
| Calls SDK  | 1.77MB    | 1.18MB        |
| WebRTC SDK | 26.8MB    | 12MB          |

### Call relay protocol

Sendbird Calls is based on WebRTC to enable real-time calls between users with P2P connections, but sometimes connectivity issues may occur for users due to network policies that won’t allow WebRTC communications through Firewalls and NATs (Network Address Translators). For this, Sendbird Calls uses two different types of protocols, **Session Traversal Utilities for NAT (STUN)** and **Traversal Using Relays around NAT (TURN)**. **STUN** and **TURN** are protocols that support establishing a connection between users.

> **Note**: See our [GitHub page](https://github.com/sendbird/guidelines-calls/tree/master/Recommendation%20on%20firewall%20configuration) to learn about the requirements and how to use the Calls SDKs behind a firewall.

---

#### How STUN and TURN works

Session Traversal Utilities for NAT (STUN) is a protocol that helps hosts to discover the presence of a NAT and the IP address, which eventually makes the connection between two endpoints. Traversal Using Relays around NAT (TURN) is a protocol that serves as a relay extension for data between two parties.

Sendbird Calls first try to make a P2P connection directly using the Calls SDK. If a user is behind a NAT/Firewall, Calls will discover the host's public IP address as a location to establish connection using STUN. In most cases, STUN server is only used during the connection setup and once the session has been established, media will flow directly between two users. If the NAT/Firewall still won't allow the two users to connect directly, TURN server will be used to make a connection to relay the media data between two users. Most of the WebRTC traffic is connected with STUN.

_- Last Updated: June 17th, 2022_

<br />
