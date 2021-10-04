import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';
import {Link} from 'react-router-dom'
import StorageList from '../../utils/StorageList'
import './index.css'
const { Meta } = Card;
export default class index extends Component {


  state = {
    News: []
  }
  componentDidMount() {
    
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
      return item.pinned === '0'
    })

    if(res.length>8){
      res.length = 8
    }
   this.setState({News: res})

  }

  render() {
    const result = this.state.News;
    return (
      <div className="site-card-wrapper">
        <h1 style={{fontSize: '25px',  fontWeight:'bold',padding: '15px 0'}}>热点新闻</h1>
        <Row gutter={63}>
          {
            result.map(item=>{
              return (
                <Col span={6} key={item.id}>
                    <Card
                      hoverable
                      style={{ width: 275 }}
                      cover={<img alt="example" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0198695bfcc585a80121ab5dd9d66d.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635947772&t=fbe6ed69921e2013a5b1cc8294790597" />}
                    >
                      <Link to={'/news/'+item.news_class+'?Id='+item.id}><Meta title={item.title} /></Link>
                    
                  </Card>
                  <br />
                  <br />
                </Col>
                
              )
            })
          }
          
         
        </Row>
      </div>
    )
  }
}
