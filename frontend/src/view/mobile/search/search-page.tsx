import React from 'react';
import { Page } from '../../components/common/page';
import { InputText } from '../../components/common/input/text';
import { Core } from '../../../core';
import './search-page.scss';
import { TagBasicList } from '../../components/home/tagbasic-list';

export class SearchPage extends React.Component<{
  // props
  core:Core;
}, {
  // state
  text:string;
}> {
  public state = {
    text: '',
  };

  public render () {
    return <Page className="search-page">
      <div className="search-bar">
          <div className="search-input">
              <InputText 
                value={this.state.text}
                label={<i className="fa fa-search"></i>}
                onConfirm={() => {}}
                onChange={(text) => this.setState({text})}
              ></InputText>
          </div>
          
          <div onClick={() => this.props.core.route.back()} className="cancel">
            取消
          </div>
      </div>

      <TagBasicList
          tagCategoryName={'最近搜索'}
          childTags={ [{tagId:'12', tagName:'星星'} , {tagId:'13' , tagName:'星星月亮'}]}
          tagSize={'normal'}
          tagColor={'white'}
          selectedColor={'danger'}
          showTrashbin={true}
          backgroundColor={'rgba(244,245,249,1)'}
          onClick={(selected, selectedId) => {console.log('selectedId' , selectedId); }}>
      </TagBasicList>

      <TagBasicList
          tagCategoryName={'热门推荐'}
          childTags={ [{tagId:'12', tagName:'好累'} , 
          {tagId:'13' , tagName:'考试好难'}, 
          {tagId:'13' , tagName:'考试好难'},
          {tagId:'14' , tagName:'考试好难'},
          {tagId:'15' , tagName:'考试好难'},
          {tagId:'16' , tagName:'考试好难'}]}
          tagSize={'normal'}
          tagColor={'white'}
          selectedColor={'danger'}
          showTrashbin={false}
          backgroundColor={'rgba(244,245,249,1)'}
          onClick={(selected, selectedId) => {console.log('selectedId' , selectedId); }}>
      </TagBasicList>


    </Page>;
  }
}

// TODO: Get list of tags