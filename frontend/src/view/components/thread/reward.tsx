import * as React from 'react';
import { Popup } from '../common/popup';
import './reward.scss';
import { Button } from '../common/button';
import { Colors } from '../../theme/theme';

type RewardType = 'salt'|'fish'|'ham';

interface Props {
  onClose:() => void;
  salt:number;
  fish:number;
  ham:number;
  onReward:(type:RewardType, value:number) => void;
}

interface State {
  value:string;
  selected?:RewardType;
}

export class Reward extends React.Component<Props, State> {
  public state:State = {
    value:'',
  };

  public rewards = [['salt', '盐粒'], ['fish', '咸鱼'], ['ham', '火腿']];

  public onSelect = (type:RewardType) => {
    this.setState({
      selected: type,
    });
  }

  public onInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value:event.target.value,
    });
  }

  public validate = () => {
    const count = parseInt(this.state.value);
    if (this.state.selected && this.rewards.findIndex((v) => v[0] === this.state.selected) >= 0
      && !isNaN(count) && count > 0 && count <= Math.min(100, this.props[this.state.selected])) {
        return count;
    }
    return -1;
  }

  public onConfirm = () => {
    const value = this.validate();
    if (value > 0) {
      this.props.onReward(this.state.selected as RewardType, value);
    }
  }

  public render () {
    const maxValue = this.state.selected ? Math.min(100, this.props[this.state.selected]) : 100;
    return <Popup onClose={this.props.onClose} className="reward-content"
      style={{
        backgroundColor: 'var(--color-bg-base)',
      }} width="327px">
      <div className="title"> 打赏 </div>
      <div className="tip"> 对同一贴一天内只能打赏一次哦！ </div>
      <div className="reward">
        {
          this.rewards.map(
            (value) => {
              const [rewardType, name] = value;
              return <div className="reward-item"
                onClick={() => this.onSelect(rewardType as RewardType)}>
                <input type="radio" name="reward" value={rewardType}
                  checked={this.state.selected === rewardType} readOnly/>
                {name} (余额 <span> {this.props[rewardType]} </span> )
              </div>;
            },
          )
        }
      </div>
      <input className="count" placeholder={`填写数量（1 - ${maxValue}）`}
        disabled={this.state.selected === undefined}
        value={this.state.value} onChange={this.onInput}
        type="number" min={1} max={maxValue}
      />
      <Button disabled={this.validate() <= 0} onClick={this.onConfirm}
        color={Colors.primary}>
        确认
      </Button>
    </Popup>;
  }
}