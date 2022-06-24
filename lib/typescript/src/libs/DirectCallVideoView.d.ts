import React from 'react';
import { ViewProps } from 'react-native';
export interface DirectCallVideoViewProps extends ViewProps {
    viewType: 'local' | 'remote';
    callId?: string;
    android_zOrderMediaOverlay?: boolean;
}
export default class DirectCallVideoView extends React.PureComponent<DirectCallVideoViewProps> {
    private ref;
    private get handle();
    private get validProps();
    get videoViewId(): number;
    render(): JSX.Element;
}
