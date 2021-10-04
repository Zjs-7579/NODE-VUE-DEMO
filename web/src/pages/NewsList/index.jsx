import React, { Component } from 'react'
import StorageList from '../../utils/StorageList'

import { List } from 'antd';
import { Link } from 'react-router-dom';

export default class NewsList extends Component {

 state = {
   News: []
 };
  componentDidMount() {
    const newsClass = this.props.location.pathname;
    const NewsList = StorageList.getList();
    const News = NewsList[newsClass.slice(1)];
    this.setState({News})
  }
  render() {
    
    const result = this.state.News.filter(item=>{
      return item.flag === '2'
    })
    return (
      <div style={{textIndent: '1.5rem'}}>
        <h1>新闻列表</h1>
        <List
          itemLayout="horizontal"
          dataSource={result}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={'/news/'+item.news_class+'?Id='+item.id}>{item.title}</Link>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
