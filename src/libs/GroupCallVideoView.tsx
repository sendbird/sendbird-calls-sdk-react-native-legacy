/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef } from 'react';
import { ViewProps, findNodeHandle, requireNativeComponent } from 'react-native';

import { BaseVideoViewProps } from '../types';
import { LINKING_ERROR } from '../utils/constants';
import { Participant } from './Participant';

const MODULE_NAME = 'RNSBGroupCallVideoView';
const NativeViewModule = requireNativeComponent(MODULE_NAME);
if (!NativeViewModule) throw new Error(LINKING_ERROR);

export interface GroupCallVideoViewProps extends BaseVideoViewProps, ViewProps {
  participant?: Participant;
  roomId?: string;
}

export default class GroupCallVideoView extends React.PureComponent<GroupCallVideoViewProps> {
  private ref = createRef<any>();

  private get handle() {
    const nodeHandle = findNodeHandle(this.ref.current as any);
    if (nodeHandle == null || nodeHandle === -1) {
      throw new Error('Cannot found VideoView');
    }
    return nodeHandle;
  }

  private get validProps() {
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
      participantId: participant?.participantId,
      roomId,
      state: participant?.state,
      style,
      ...rest,
    };
  }

  public get videoViewId() {
    return this.handle;
  }

  render() {
    return <NativeViewModule ref={this.ref as any} {...this.validProps} />;
  }
}
