import React from 'react';
import { Animate } from './animate';
import { List } from './list';
import './popup-menu.scss';
import './picker.scss';

interface Item {
  label:string;
  value:string;
}

interface Column {
  prefix?:React.ReactNode;
  suffix?:React.ReactNode;
  column:(prevValues:string[]) => Item[];
}

interface Props {
  onClose:() => void;
  columns:Column[];
}

interface State {
  onClosing:boolean;
}

export class Picker extends React.Component<Props, State> {
  public readonly timeout = 500;

  public state:State = {
    onClosing: false,
  };

  public render() {
    const name = this.state.onClosing ? 'slideOutDown' : 'slideInUp';
    return <div className="popupMenu-wrapper picker">
      <div className="background" onClick={this.onClose}></div>
      <Animate name={name}  className="picker-animate" speed="faster">
        <div className="content">
          <div className="title">
            <div onClick={this.onClose}> 取消 </div>
            <div onClick={this.onClose}> 完成 </div>
          </div>
          <div className="columns-container">
            <div className="indicator-container">
              <div className="indicator"/>
            </div>
            <div className="columns" onClick={() => console.log('click')}>

            </div>
          </div>
        </div>
      </Animate>
    </div>;
  }

  public onClose = () => {
    this.setState({ onClosing: true }, () => requestAnimationFrame(this.waitClose));
  }

  public tick = 0;
  public waitClose = () => {
    this.tick += 1000 / 60;
    if (this.tick >= this.timeout) {
      this.props.onClose();
      return;
    }
    requestAnimationFrame(this.waitClose);
  }
}