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

interface State {
  faqs:ResData.FAQ[];
}

export class FAQContent extends React.Component<MobileRouteProps, State> {
  public render () {
    const { faqs, typeName } = this.props.location.state as any;
    const typeKey = this.props.match.params.key;
    const filteredFaqs = faqs.filter( (f) => f.attributes.key == typeKey );
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