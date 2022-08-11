function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef } from 'react';
import { findNodeHandle, requireNativeComponent } from 'react-native';
import { LINKING_ERROR } from '../utils/constants';
const MODULE_NAME = 'RNSBDirectCallVideoView';
const NativeViewModule = requireNativeComponent(MODULE_NAME);
if (!NativeViewModule) throw new Error(LINKING_ERROR);
export default class DirectCallVideoView extends React.PureComponent {
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
    if (__DEV__) {
      if (this.props.viewType !== 'local' && this.props.viewType !== 'remote') {
        throw new Error('DirectCallVideoView: Invalid ViewType props');
      }
    }

    const {
      android_zOrderMediaOverlay = false,
      mirror = this.props.viewType === 'local',
      resizeMode = 'cover',
      viewType,
      callId,
      style,
      ...rest
    } = this.props;
    return {
      zOrderMediaOverlay: android_zOrderMediaOverlay,
      mirror,
      resizeMode,
      viewType,
      callId,
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

} // const DirectCallVideoView = React.forwardRef(function DirectCallVideoView(props: Props, ref) {
//   const _nativeRef = useRef<any>();
//
//   const validProps = useMemo(() => {
//     if (props.viewType !== 'local' && props.viewType !== 'remote') {
//       throw new Error('DirectCallVideoView: Invalid ViewType props');
//     }
//
//     return { ...props, style: { width: '100%', height: '100%' } };
//   }, [props.viewType]);
//
//   useImperativeHandle(
//     ref,
//     () => {
//       const videoViewId = findNodeHandle(_nativeRef.current);
//       if (!videoViewId) throw new Error('Cannot found VideoView');
//
//       return { videoViewId };
//     },
//     [],
//   );
//
//   return (
//     <View style={props.style}>
//       <NativeViewModule ref={_nativeRef} {...validProps} />
//     </View>
//   );
// });
//
// export default DirectCallVideoView;
//# sourceMappingURL=DirectCallVideoView.js.map