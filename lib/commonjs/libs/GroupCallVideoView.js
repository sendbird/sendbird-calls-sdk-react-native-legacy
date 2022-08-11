"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _constants = require("../utils/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MODULE_NAME = 'RNSBGroupCallVideoView';
const NativeViewModule = (0, _reactNative.requireNativeComponent)(MODULE_NAME);
if (!NativeViewModule) throw new Error(_constants.LINKING_ERROR);

class GroupCallVideoView extends _react.default.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "ref", /*#__PURE__*/(0, _react.createRef)());
  }

  get handle() {
    const nodeHandle = (0, _reactNative.findNodeHandle)(this.ref.current);

    if (nodeHandle == null || nodeHandle === -1) {
      throw new Error('Cannot found VideoView');
    }

    return nodeHandle;
  }

  get validProps() {
    const {
      android_zOrderMediaOverlay = false,
      mirror = false,
      resizeMode = 'contain',
      participant,
      roomId,
      style,
      ...rest
    } = this.props;
    return {
      zOrderMediaOverlay: android_zOrderMediaOverlay,
      mirror,
      resizeMode,
      participantId: participant === null || participant === void 0 ? void 0 : participant.participantId,
      roomId,
      state: participant === null || participant === void 0 ? void 0 : participant.state,
      style,
      ...rest
    };
  }

  get videoViewId() {
    return this.handle;
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(NativeViewModule, _extends({
      ref: this.ref
    }, this.validProps));
  }

}

exports.default = GroupCallVideoView;
//# sourceMappingURL=GroupCallVideoView.js.map