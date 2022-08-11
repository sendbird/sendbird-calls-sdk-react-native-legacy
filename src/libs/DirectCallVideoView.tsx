/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef } from 'react';
import { ViewProps, findNodeHandle, requireNativeComponent } from 'react-native';

import { BaseVideoViewProps } from '../types';
import { LINKING_ERROR } from '../utils/constants';

const MODULE_NAME = 'RNSBDirectCallVideoView';
const NativeViewModule = requireNativeComponent(MODULE_NAME);
if (!NativeViewModule) throw new Error(LINKING_ERROR);

export interface DirectCallVideoViewProps extends BaseVideoViewProps, ViewProps {
  viewType: 'local' | 'remote';
  callId?: string;
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

    const {
      android_zOrderMediaOverlay = false,
      mirror = this.props.viewType === 'local',
      resizeMode = 'cover',
      viewType,
      callId,
      style,
      ...rest
    } = this.props;

    return { zOrderMediaOverlay: android_zOrderMediaOverlay, mirror, resizeMode, viewType, callId, style, ...rest };
  }

  public get videoViewId() {
    return this.handle;
  }

  render() {
    return <NativeViewModule ref={this.ref as any} {...this.validProps} />;
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
