import * as React from 'react';
import { classnames } from '../../../utils/classname';
import './tag.scss';

type TagColor = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger';

export class Tag extends React.Component<{
  // props
  children?:React.ReactNode;
  className?:string;
  style?:React.CSSProperties;
  onClick?:(selected:boolean, selectedId:string) => void;
  selected?:boolean;
  size?:'normal'|'medium'|'large'|'default';
  color?:TagColor;
  selectedColor?:TagColor;
  rounded?:boolean;
  tagId?: String;
  tagName?: String;
}, {
}> {
  public render () {
    return <span className={classnames(
        'tag',
        this.props.className,
        this.props.size,
        {'is-rounded': this.props.rounded},
        {[this.props.selectedColor || 'color-primary']: this.props.selected},
        {[this.props.color || '']: !this.props.selected},
      )}

      style={this.props.style}
      onClick={() => this.props.onClick}>{this.props.children}{this.props.tagName}</span>;
  }
}