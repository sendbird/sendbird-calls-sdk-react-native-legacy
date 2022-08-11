import React from 'react';
import { ViewProps } from 'react-native';
import { BaseVideoViewProps } from '../types';
export interface DirectCallVideoViewProps extends BaseVideoViewProps, ViewProps {
    viewType: 'local' | 'remote';
    callId?: string;
}
export default class DirectCallVideoView extends React.PureComponent<DirectCallVideoViewProps> {
    private ref;
    private get handle();
    private get validProps();
    get videoViewId(): number;
    render(): JSX.Element;
}
