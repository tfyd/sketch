import * as React from 'react';
import { Popup } from '../common/popup';
import './reward.scss';

interface Props {
  onClose:() => void;
  salt:number;
  fish:number;
  ham:number;
  onReward:(type:'salt'|'fish'|'ham', value:number) => void;
}

interface State {
  value:number;
}

export class Reward extends React.Component<Props, State> {
  public state:State = {
    value:0,
  };

  public render () {
    return <Popup onClose={this.props.onClose} >
     <div className="reward-content">
       <div className="title"> 打赏 </div>
       <div className="tip"> 对同一贴一天内只能打赏一次哦！ </div>
     </div>
    </Popup>;
  }
}