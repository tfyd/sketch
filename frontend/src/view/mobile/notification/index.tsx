import * as React from 'react';
import { Core } from '../../../core';

interface Props {
    core:Core;
}

interface State {

}

export class Notification extends React.Component<Props, State> {
    public render () {
        return (<div>
            notification
        </div>);
    }
}