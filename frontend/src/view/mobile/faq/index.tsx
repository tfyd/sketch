import * as React from 'react';
import { MobileRouteProps } from '../router';
import { Page } from '../../components/common/page';
import { List } from '../../components/common/list';
import { NavBar } from '../../components/common/navbar';
import '../message/style.scss'; // TODO: extract common scss out
import './style.scss';
import { Menu, MenuItem } from '../../components/common/menu';
import { RoutePath } from '../../../config/route-path';
import { API, ResData } from '../../../config/api';

interface State {
  data:API.Get['/helpfaq'];
}

export class FAQ extends React.Component<MobileRouteProps, State> {
  public state:State = {
    data:{
      faqs: [],
      faq_keys: {},
    },
  };

  // TODO: save faq data in localStorage
  public async componentDidMount() {
    const { getFAQs } = this.props.core.db;
    const data = await getFAQs();
    this.setState({data});
    console.log(data);
  }

  private renderFAQGroup(faqGroup, id) {
    const history = this.props.core.history;
    const subTypes = Object.keys(faqGroup.children).sort();
    return (
      <div key={id} className="faqgroup">
        <div className="faqgroup-title">{`【${faqGroup.title}】`}</div>
        <Menu>
          { subTypes.map((subType) => (
            <MenuItem title={faqGroup.children[subType]}
              onClick={() =>
                history.push(
                  RoutePath.FAQContent.replace(':key', `${id}-${subType}`),{faqs: this.state.data.faqs, typeName: faqGroup.children[subType]})}
              key={subType} />))}
        </Menu>
      </div>
    );
  }
  public render () {
    const history = this.props.core.history;
    const { faq_keys } = this.state.data;
    const types = Object.keys(faq_keys).sort();
    return (<Page
        top={<NavBar goBack={this.props.core.route.back}>
          帮助FAQ
        </NavBar>}>

        { types.map((type) => (
          (this.renderFAQGroup(faq_keys[type], type))
        ))}
      </Page>);
  }
}