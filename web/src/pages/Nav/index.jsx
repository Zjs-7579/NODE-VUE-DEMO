import React, { Component } from 'react'
import { Menu, Input, Space } from 'antd';
import { Link } from 'react-router-dom'
import { BankOutlined} from '@ant-design/icons';
import StorageTag from '../../utils/StorageTag'
import './index.css'



const { Search } = Input;
export default class Nav extends Component {

  
  state = {
    current: 'mail',
  };

  // handleClick = e => {
  //   console.log('click ', e);
  //   this.setState({ current: e.key });
  // };

   
  onSearch = (value) => {
    
    //console.log(value)
    window.location.href = 'http://localhost:3000/search?search='+value
		
  };

  render() {
    const NavTag = StorageTag.getTag()
    const { current } = this.state;
    //console.log(this)
    //console.log(Nav)
    return (
      <div className="nav">
        <div style={{flex: '6'}}>
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<BankOutlined/>}>
              <Link  to="/home" >首页</Link>
            </Menu.Item>
            {
              NavTag.map(item => {
                return (
                  <Menu.Item key={item.news_className}>
                    <Link  to={'/'+ item.news_className} >{item.classify_name}</Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>


         <div style={{flex: '1', margin: 'auto 0px'}}>
         
            <Space direction="vertical">
              <Search placeholder="站内搜索" size="small" allowClear onSearch={this.onSearch} style={{ width: 200 }} />
            </Space>

    
         </div>



      </div>
     
    );
  }
}