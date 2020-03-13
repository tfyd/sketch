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
import { ExpandableMessage } from '../../components/message/expandable-message';
import { Constant } from '../../../config/constant';

interface State {
  typeName:string;
  filteredFaqs:ResData.FAQ[];
}

export class FAQContent extends React.Component<MobileRouteProps, State> {
  public state:State = {
    typeName: '',
    filteredFaqs: [],
  };

  public async componentDidMount() {
    const data = await this.props.core.cache.FAQ.get();
    const { faqs } = data;
    const typeKey:string = this.props.match.params.key;
    // get type name
    const [ k1, k2] = typeKey.split('-');
    const typeName = Constant.FAQTypes[k1][k2];

    // backend key starts from 1
    // frontend starts from 0.
    const filteredFaqs = faqs.filter(
      (f) => f.attributes.key == `${(Number(k1)) + 1}-${(Number(k2)) + 1}` );
    this.setState({ typeName, filteredFaqs });
  }

  public render() {
    const { typeName, filteredFaqs } = this.state;
    return (<Page
        top={<NavBar goBack={this.props.core.route.back}>
          {typeName}
        </NavBar>}>

        { filteredFaqs.map((faq) => (
          <ExpandableMessage
            key={'faq' + faq.id}
            title={`Q: ${faq.attributes.question}`}
            uid={'pn' + faq.id}
            content={`A: ${faq.attributes.answer}`}
          />
        ))}
      </Page>);
  }
}