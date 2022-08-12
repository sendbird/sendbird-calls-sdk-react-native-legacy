"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _package = _interopRequireDefault(require("../../package.json"));

var _types = require("../types");

var _utils = require("../utils");

var _logger = require("../utils/logger");

var _BridgedQuery = require("./BridgedQuery");

var _DirectCall = require("./DirectCall");

var _NativeBinder = require("./NativeBinder");

var _Room = require("./Room");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * SendbirdCallsModule class for SendbirdCalls
 */
class SendbirdCallsModule {
  constructor(binder) {
    var _this = this;

    this.binder = binder;

    _defineProperty(this, "_applicationId", '');

    _defineProperty(this, "_initialized", false);

    _defineProperty(this, "_currentUser", null);

    _defineProperty(this, "_onRinging", _utils.noop);

    _defineProperty(this, "getConstants", () => {
      var _this$binder$nativeMo, _this$binder$nativeMo2;

      // @ts-ignore
      return ((_this$binder$nativeMo = (_this$binder$nativeMo2 = this.binder.nativeModule).getConstants) === null || _this$binder$nativeMo === void 0 ? void 0 : _this$binder$nativeMo.call(_this$binder$nativeMo2)) ?? {
        NATIVE_SDK_VERSION: ''
      };
    });

    _defineProperty(this, "addDirectCallSound", (type, fileName) => {
      let name = fileName;

      if (_reactNative.Platform.OS === 'android') {
        const idx = fileName.lastIndexOf('.');
        if (idx) name = fileName.slice(0, idx);
      }

      this.binder.nativeModule.addDirectCallSound(type, name);
    });

    _defineProperty(this, "removeDirectCallSound", type => {
      this.binder.nativeModule.removeDirectCallSound(type);
    });

    _defineProperty(this, "setDirectCallDialingSoundOnWhenSilentOrVibrateMode", enabled => {
      this.binder.nativeModule.setDirectCallDialingSoundOnWhenSilentOrVibrateMode(enabled);
    });

    _defineProperty(this, "getCurrentUser", async () => {
      this._currentUser = await this.binder.nativeModule.getCurrentUser();
      return this.currentUser;
    });

    _defineProperty(this, "getDirectCall", async callId => {
      const callProps = await this.binder.nativeModule.getDirectCall(callId);
      return _DirectCall.DirectCall.get(this.binder, callProps);
    });

    _defineProperty(this, "initialize", appId => {
      if (this.initialized) {
        if (this.applicationId !== appId) {
          return this._init(appId);
        } else {
          return this.initialized;
        }
      } else {
        return this._init(appId);
      }
    });

    _defineProperty(this, "_init", appId => {
      this.Logger.debug('[SendbirdCalls]', 'initialize()');

      _DirectCall.DirectCall.poolRelease();

      _Room.Room.poolRelease();

      if (!this.initialized) {
        this.binder.addListener(_NativeBinder.CallsEvent.DEFAULT, _ref => {
          let {
            type,
            data
          } = _ref;

          if (type === _NativeBinder.DefaultEventType.ON_RINGING) {
            this.Logger.debug('[SendbirdCalls]', 'onRinging', data.callId);

            this._onRinging(data);
          }
        });
      }

      this.binder.nativeModule.initialize(appId);
      this._applicationId = appId;
      this._initialized = true;
      return this.initialized;
    });

    _defineProperty(this, "authenticate", async function (userId) {
      let accessToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _this._currentUser = await _this.binder.nativeModule.authenticate(userId, accessToken);
      return _this.currentUser;
    });

    _defineProperty(this, "deauthenticate", async () => {
      await this.binder.nativeModule.deauthenticate();
      this._currentUser = null;
    });

    _defineProperty(this, "registerPushToken", async function (token) {
      let unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      await _this.binder.nativeModule.registerPushToken(token, unique);
    });

    _defineProperty(this, "unregisterPushToken", async token => {
      await this.binder.nativeModule.unregisterPushToken(token);
    });

    _defineProperty(this, "ios_registerVoIPPushToken", async function (token) {
      let unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (_reactNative.Platform.OS !== 'ios') return;
      await _this.binder.nativeModule.registerVoIPPushToken(token, unique);
    });

    _defineProperty(this, "ios_unregisterVoIPPushToken", async token => {
      if (_reactNative.Platform.OS !== 'ios') return;
      await this.binder.nativeModule.unregisterVoIPPushToken(token);
    });

    _defineProperty(this, "ios_routePickerView", () => {
      if (_reactNative.Platform.OS !== 'ios') return;
      this.binder.nativeModule.routePickerView();
    });

    _defineProperty(this, "android_handleFirebaseMessageData", data => {
      if (_reactNative.Platform.OS !== 'android' || !(data !== null && data !== void 0 && data['sendbird_call'])) {
        return false;
      } else {
        this.binder.nativeModule.handleFirebaseMessageData(data);
        return true;
      }
    });

    _defineProperty(this, "createDirectCallLogListQuery", async function () {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const queryKey = await _this.binder.nativeModule.createDirectCallLogListQuery(params);
      return new _BridgedQuery.DirectCallLogListQuery(queryKey, _types.NativeQueryType.DIRECT_CALL_LOG, _this.binder);
    });

    _defineProperty(this, "createRoomListQuery", async function () {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const queryKey = await _this.binder.nativeModule.createRoomListQuery(params);
      return new _BridgedQuery.RoomListQuery(queryKey, _types.NativeQueryType.ROOM_LIST, _this.binder);
    });
  }

  /**
   * Returns current React-Native SDK version.
   *
   * @since 1.0.0
   */
  get VERSION() {
    return _package.default.version;
  }
  /**
   * Returns current iOS/Android SDK version.
   *
   * @since 1.0.0
   */


  get NATIVE_VERSION() {
    return this.getConstants()['NATIVE_SDK_VERSION'];
  }
  /**
   * Returns the SDK Logger
   *
   * @since 1.0.0
   */


  get Logger() {
    return _logger.Logger;
  }
  /**
   * Returns current application ID.
   *
   * @since 1.0.0
   */


  get applicationId() {
    return this._applicationId;
  }
  /**
   * Returns is SDK initialized.
   *
   * @since 1.0.0
   */


  get initialized() {
    return this._initialized;
  }
  /**
   * Gets the current `User`.
   * Returns the current `User`. If SendBirdCall is not authenticated, `null` will be returned.
   *
   * @since 1.0.0
   */


  get currentUser() {
    return this._currentUser;
  }
  /**
   * An enum that represents different types of a room.
   * Returns {@link RoomType}
   *
   * @since 1.0.0
   */


  get RoomType() {
    return _types.RoomType;
  }
  /**
   * Gets the constants from React-Native Native module
   * Returns the object
   *
   * @since 1.0.0
   */


  /**
   * Returns all ongoing calls, including the active call and all calls on hold.
   *
   * @since 1.0.0
   */
  getOngoingCalls() {
    return this.binder.nativeModule.getOngoingCalls();
  }
  /**
   * Gets call from call ID or call UUID
   *
   * @since 1.0.0
   */


  /**
   * Makes a call to user(callee) directly. (1:1 Call).
   * Use the {@link CallOptions} object to choose initial call configuration (e.g. muted/unmuted)
   *
   * @since 1.0.0
   */
  dial(calleeUserId, isVideoCall) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      audioEnabled: true,
      frontCamera: true,
      videoEnabled: true
    };
    return this.binder.nativeModule.dial(calleeUserId, isVideoCall, options);
  }
  /**
   * Creates a {@link Room} for group calls.
   *
   * @since 1.0.0
   */


  createRoom(roomParams) {
    return this.binder.nativeModule.createRoom(roomParams).then(props => _Room.Room.get(this.binder, props));
  }
  /**
   * Fetches a room instance from Sendbird server.
   *
   * @since 1.0.0
   */


  fetchRoomById(roomId) {
    return this.binder.nativeModule.fetchRoomById(roomId).then(props => _Room.Room.get(this.binder, props));
  }
  /**
   * Gets a locally-cached room instance by room ID.
   *
   * @since 1.0.0
   */


  getCachedRoomById(roomId) {
    return this.binder.nativeModule.getCachedRoomById(roomId).then(props => props ? _Room.Room.get(this.binder, props) : null);
  }
  /**
   * To receive native-like calls while an app is in the background or closed, a device registration token must be registered to the server.
   * Register a device push token after authentication has completed using the `SendbirdCalls.ios_registerVoIPPushToken()` method.
   *
   * @platform iOS
   * @since 1.0.0
   */


  /**
   * Set onRinging listener
   * A listener called when received dialing.
   */
  onRinging(listener) {
    this._onRinging = listener;
  }
  /**
   * Creates direct call log list query.
   *
   * @since 1.0.0
   */


}

exports.default = SendbirdCallsModule;
//# sourceMappingURL=SendbirdCallsModule.js.map