import React, { Component } from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { BankOutlined} from '@ant-design/icons';
import StorageTag from '../../utils/StorageTag'
import './index.css'




export default class Nav extends Component {
 
    
  state = {
    current: 'mail',
    search: ''
  };

  // handleClick = e => {
  //   console.log('click ', e);
  //   this.setState({ current: e.key });
  // };

   
  onSearch = (e) => {
    this.setState({search: e.target.value})
		
  };

  render() {
    const {search} = this.state;
    const NavTagData = StorageTag.getTag()
    let NavTag = Array.from(NavTagData);
    return (
      <div className="nav">
        <div style={{flex: '6'}}>
          <Menu onClick={this.handleClick}  mode="horizontal">
            <Menu.Item key="home" icon={<BankOutlined/>}>
              <NavLink  to="/home" >首页</NavLink>
            </Menu.Item>
            {
              NavTag.map(item => {
                return (
                  <Menu.Item key={item.news_className}>
                    <NavLink  to={'/'+ item.news_className} >{item.classify_name}</NavLink>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>


         <div style={{flex: '1', margin: 'auto 0px'}}>
         
           
            <input type="text" placeholder="站内搜索" onChange={(e)=>this.onSearch(e)} style={{border: '1px solid #ccc',color: '#ccc'}}/>
            <button style={{border: 'none',backgroundColor: '#fff'}}>
            <NavLink to={'/search?search='+search}>搜索</NavLink>
            </button>
    
         </div>



      </div>
     
    );
  }
}