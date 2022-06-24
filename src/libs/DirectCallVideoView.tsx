/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef } from 'react';
import { View, ViewProps, findNodeHandle, requireNativeComponent } from 'react-native';

import { LINKING_ERROR } from '../utils/constants';

const MODULE_NAME = 'RNSBDirectCallVideoView';
const NativeViewModule = requireNativeComponent(MODULE_NAME);
if (!NativeViewModule) throw new Error(LINKING_ERROR);

export interface DirectCallVideoViewProps extends ViewProps {
  viewType: 'local' | 'remote';
  callId?: string;
  android_zOrderMediaOverlay?: boolean;
}
export default class DirectCallVideoView extends React.PureComponent<DirectCallVideoViewProps> {
  private ref = createRef<any>();

  private get handle() {
    const nodeHandle = findNodeHandle(this.ref.current as any);
    if (nodeHandle == null || nodeHandle === -1) {
      throw new Error('Cannot found VideoView');
    }
    return nodeHandle;
  }
  private get validProps() {
    if (__DEV__) {
      if (this.props.viewType !== 'local' && this.props.viewType !== 'remote') {
        throw new Error('DirectCallVideoView: Invalid ViewType props');
      }
    }

    return {
      viewType: this.props.viewType,
      callId: this.props.callId,
      zOrderMediaOverlay: this.props.android_zOrderMediaOverlay ?? false,
      style: { width: '100%', height: '100%' },
    };
  }

  public get videoViewId() {
    return this.handle;
  }

  render() {
    return (
      <View style={this.props.style}>
        <NativeViewModule ref={this.ref as any} {...this.validProps} />
      </View>
    );
  }
}

// const DirectCallVideoView = React.forwardRef(function DirectCallVideoView(props: Props, ref) {
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
