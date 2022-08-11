import React from 'react';
import { ViewProps } from 'react-native';
import { BaseVideoViewProps } from '../types';
import { Participant } from './Participant';
export interface GroupCallVideoViewProps extends BaseVideoViewProps, ViewProps {
    participant?: Participant;
    roomId?: string;
}
export default class GroupCallVideoView extends React.PureComponent<GroupCallVideoViewProps> {
    private ref;
    private get handle();
    private get validProps();
    get videoViewId(): number;
    render(): JSX.Element;
}
