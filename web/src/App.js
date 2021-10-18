import React, { Component } from 'react'
import { Route, Switch, Redirect,  } from 'react-router-dom'
import DataUtils from './utils/DataUtils'
import StorageTag from './utils/StorageTag'
import StorageList from './utils/StorageList'
import http from './http/http'
import Nav from './pages/Nav'
import NewsList from './pages/NewsList'
import Home from './pages/Home'
import Footer from './components/Footer'
import { message } from 'antd';
import 'antd/dist/antd.css'
import News from './components/News'
import SearchData from './components/Search'




 
export default class App extends Component {

  async componentDidMount(){

    const Tag = await http.get('/newsclass')
    const List = await http.get('/newsClassTag')
    if(List.data.code === 200&&Tag.data.code === 200){
      // message.info('欢迎你的到来！！！')
      DataUtils.NewsList = List.data.newsList
      DataUtils.NewsTag = Tag.data.result
      StorageList.saveList(List.data.newsList)
      StorageTag.saveTag(Tag.data.result)
    }else{
      message.error('数据库链接失败？？？');
    }

    this.setState({})
    //console.log(List.data.newsList)
    //console.log(Tag.data.result)
    //console.log(this.state.NewsList)
    //console.log(this.state.NewsTag)
  };
 

  render() {
    const NavTagData = StorageTag.getTag()
    let NavTag = Array.from(NavTagData);
    //console.log(NavTag)
    //console.log(this)
    return (     
      <div>
          <Nav {...this.props}></Nav>
        <div style={{margin: '10px 0'}}>
          <Switch>
            <Route path="/home" component={Home}></Route>
            {
              NavTag.map((item) => {
                return (
                   <Route path={"/"+ item.news_className} component={NewsList} key={item.classify_id}></Route>
                )
          
              })
            }
             {
              NavTag.map((item) => {
                return  <Route path={"/news/"+ item.news_className} component={News} key={item.news_className}></Route>
        
              })
            }
            <Route path="/search" component={SearchData}></Route>
            
            <Redirect to="/home"/>
          </Switch>
        </div>
        <Footer/>
      </div>
    )
  }
}
