import React from 'react';
import { Animate } from './animate';
import { List } from './list';
import './popup-menu.scss';
import './picker.scss';

interface Item {
  label:React.ReactNode;
  value:string;
}

interface ColumnProp {
  itemHeight:number;
  height:number;
  items:Item[];
  onChange:(value:string) => void;
}

interface ColumnState {

}

class Cloumn extends React.Component<ColumnProp, ColumnState> {
  public render() {
    return <div className="column" style={{height: this.props.height}}>
      <div className="items"  style={{padding: `${(this.props.height - this.props.itemHeight) / 2}px 0`}}>
        {this.props.items.map((item) => <div className="item"
          style={{height: this.props.itemHeight, lineHeight: `${this.props.itemHeight}px`}} key={item.value}>
            {item.label}
        </div>)}
      </div>
    </div>;
  }
}

interface ColumnOpt {
  key:string;
  on:(prevValues:string[]) => Item[];
}

interface Props {
  itemHeight?:number;
  height?:number;
  onClose:() => void;
  columnOpts:ColumnOpt[];
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
    const itemHeight = this.props.itemHeight || 30;
    const height = this.props.height || 300;
    return <div className="popupMenu-wrapper picker">
      <div className="background" onClick={this.onClose}></div>
      <Animate name={name}  className="picker-animate" speed="faster">
        <div className="content">
          <div className="title">
            <div onClick={this.onClose}> 取消 </div>
            <div onClick={this.onClose}> 完成 </div>
          </div>
          <div className="columns-container"  style={{height: height}}>
            <div className="indicator-container">
              <div className="indicator" style={{height: itemHeight}}/>
            </div>
            <div className="columns">
              {this.props.columnOpts.map((opt) => {
                return <Cloumn items={opt.on([])} height={height}
                  itemHeight={itemHeight} onChange={() => {}} key={opt.key} />;
              })}
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