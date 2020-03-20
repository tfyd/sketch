import React from 'react';
import { classnames } from '../../../utils/classname';
import './toast.scss';

type ToastType = 'error'|'warning'|'success'|'regular';

interface Props {
  visible?:boolean;
  type?:ToastType;
  content:string;
  onClose:() => void;
  style?:React.CSSProperties;
}

export class Toast extends React.Component<Props> {
  public render() {
    const toastType = this.props.type || 'regular';
    return this.props.visible && <div style={this.props.style}
      className={classnames('toast', toastType)}>
        <i className={classnames('fa fa-info-circle', 'icon-info')}/>
        <div className="content">{this.props.content}</div>
        <div onClick={this.props.onClose}>
          <i className="fa fa-times"/>
        </div>
    </div>;
  }
}