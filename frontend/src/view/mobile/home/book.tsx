import * as React from 'react';
import { Core } from '../../../core/index';
import { Page } from '../../components/common';
import { BookProfile } from '../../components/book/book-profile';
import { BookChapters } from '../../components/book/book-chapters';
import { APIGet, ResData } from '../../../config/api';

interface Props {
    id:number;
    core:Core;
}

interface State {
    data:APIGet['/book/:id']['res']['data'];
}

export class Book extends React.Component<Props, State> {
    public state:State = {
        data: {
            thread: ResData.allocThread(),
            chapters: [],
            volumns: [],
            most_upvoted: ResData.allocPost(),
            top_review: null,
            paginate: ResData.allocThreadPaginate(),
        }
    };

    public async componentDidMount () {
        const res = await this.props.core.db.get('/book/:id', {
            id: this.props.id,
        });
        if (!res || !res.data) { return; }
        this.setState({data: res.data});
    }

    public render () {
        return (<Page>
            <BookProfile thread={this.state.data.thread} />
            <BookChapters chapters={this.state.data.chapters} />
        </Page>);
    }
}