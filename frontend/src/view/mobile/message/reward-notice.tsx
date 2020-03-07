import * as React from 'react';
import { API, ResData, ReqData } from '../../../config/api';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { NavBar } from '../../components/common/navbar';
import { List } from '../../components/common/list';
import { MarkAllAsRead } from './mark-all-as-read';
import ClampLines from 'react-clamp-lines';

interface State {
  rewardsReceived:API.Get['/user/$0/reward_received'];
  rewardsSent:API.Get['/user/$0/reward_sent'];
}

const config = {
  rewardableType: {
    post: '帖子',
    quote: '题头',
    status: '动态',
    thread: '主题',
  },
  rewardType: {
    salt: '盐粒',
    fish: '咸鱼',
    ham: '火腿',
  },
};

export class RewardNotice extends React.Component<MobileRouteProps, State> {
  public state:State = {
    rewardsReceived: [],
    rewardsSent: [],
  };

  public async componentDidMount() {
    const { getUserRewardsReceived, getUserRewardsSent } = this.props.core.db;
    const fetchRewardsReceived = getUserRewardsReceived()
      .catch((e) => {
        console.log(e);
        return this.state.rewardsReceived;
      });
    const fetchRewardsSent = getUserRewardsSent()
      .catch((e) => {
        console.log(e);
        return this.state.rewardsSent;
      });
    const [rewardsReceived, rewardsSent] = await Promise.all([fetchRewardsReceived, fetchRewardsSent]);
    this.setState({rewardsReceived, rewardsSent});
    console.log(rewardsReceived, rewardsSent);
  }

  public render () {
    return (<Page className="msg-page"
        top={<NavBar goBack={this.props.core.route.back}>
          打赏提醒
        </NavBar>}>

        < MarkAllAsRead />

        { this.renderRewards() }
      </Page>);
  }

  private renderReward(reward) {
    const { author, receiver, id, attributes } = reward;
    const authorName = author ? author.attributes.name : '你';
    const receiverName = receiver ? receiver.attributes.name : '你';
    const {rewardable_type, reward_type, reward_value} = attributes;
    const brief = '等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API等待API';
    // TODO: implement seen and mark as read
    const seen = Math.random() > 0.5;

    return (
      <List.Item key={id}>
        <div className="item-container">
          <div className="item-first-line">
            <div className={seen ? '' : 'unread'}>{authorName}打赏了{receiverName}的{config.rewardableType[rewardable_type]}{reward_value}{config.rewardType[reward_type]}</div>
          </div>
          <div className="item-brief">
            <ClampLines
            text={brief}
            id={'reward' + id}
            lines={2}
            ellipsis="..."
            buttons={false}
            innerElement="p"/>
          </div>
        </div>
      </List.Item>);
  }

  private getRewards() {
    return [...this.state.rewardsReceived, ...this.state.rewardsSent]
      .sort((r1, r2) => {
        const d1 = new Date(r1.attributes.created_at);
        const d2 = new Date(r2.attributes.created_at);
        return (d2.getTime() - d1.getTime());
      });
  }
  private renderRewards () {
    const rewards = this.getRewards();
    return (
      <List>
        {rewards.map((d) => this.renderReward(d))}
      </List>
            );
  }
}