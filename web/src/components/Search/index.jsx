import React, { Component } from 'react'
import StorageList from '../../utils/StorageList'

import { List } from 'antd';
import { Link } from 'react-router-dom';
export default class index extends Component {

  state = {
    News: []
  }
  componentDidMount() {
    const NewsName = this.props.location.search;
    const Name = decodeURI(NewsName.slice(8));
    console.log(Name);
    const NewsList = StorageList.getList();
    //const News = NewsList[newsClass.slice(1)];
    //this.setState({News})
    //console.log(NewsList)
    const Data = []
    for(let item in NewsList){
      for(let el of NewsList[item]){
        Data.push(el)
      }
    }
    //console.log(Data);


    const res = Data.filter(item=>{
      return item.context.includes(Name)
    })
   this.setState({News: res})

  }

  render() {
    
    // const NewsList = StorageList.getList();
    // console.log(NewsList)
    // console.log(this.props)
    //console.log(this.state.News)
    const resultData = this.state.News;
    let result = Array.from(resultData)
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
