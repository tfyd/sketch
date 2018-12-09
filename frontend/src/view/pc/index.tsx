import * as React from 'react';
import { Core } from '../../core';
import { Navbar } from './header';
import { AlertMsg } from '../components/alert-msg';
import { Content } from './content';
import { Footer } from './footer';
import './index.scss';

interface Props {
    core:Core;
}

export class Main_pc extends React.Component<Props, {}> {
    public render () {
        return (<div>
            <Navbar core={this.props.core} />
            <AlertMsg />
            <Content core={this.props.core} />
            <Footer core={this.props.core} />
        </div>);
    }
}