import React from 'react';
import './number.scss';
import { classnames } from '../../../../utils/classname';

interface Props {
  value:string;
  onChange:(valid:boolean, value:string) => void;
  disabled?:boolean;
  placeholder?:string;
  min?:number;
  max?:number;
  fractionDigits?:number;
  style?:React.CSSProperties;
  className?:string;
}

export class InputNumber extends React.Component<Props> {
  public onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const value = parseFloat(text);
    const valid = !Number.isNaN(value) && value >= (this.props.min || -Infinity)
      && value <= (this.props.max || Infinity) &&
      value === parseFloat(value.toFixed(this.props.fractionDigits));
    this.props.onChange(valid, text);
  }

  public render() {
    return <input
      type="number"
      value={this.props.value}
      disabled={this.props.disabled}
      placeholder={this.props.placeholder}
      min={this.props.min}
      max={this.props.max}
      style={this.props.style}
      className={classnames('input-number', this.props.className)}
      onChange={this.onChange}
    />;
  }
}