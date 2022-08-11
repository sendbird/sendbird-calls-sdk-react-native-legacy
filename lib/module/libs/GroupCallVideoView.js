function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef } from 'react';
import { findNodeHandle, requireNativeComponent } from 'react-native';
import { LINKING_ERROR } from '../utils/constants';
const MODULE_NAME = 'RNSBGroupCallVideoView';
const NativeViewModule = requireNativeComponent(MODULE_NAME);
if (!NativeViewModule) throw new Error(LINKING_ERROR);
export default class GroupCallVideoView extends React.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "ref", /*#__PURE__*/createRef());
  }

  get handle() {
    const nodeHandle = findNodeHandle(this.ref.current);

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
    return /*#__PURE__*/React.createElement(NativeViewModule, _extends({
      ref: this.ref
    }, this.validProps));
  }

}
//# sourceMappingURL=GroupCallVideoView.js.map