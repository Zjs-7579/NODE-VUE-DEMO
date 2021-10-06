import React, { Component } from 'react'
import { Carousel } from 'antd';
import StorageList from '../../utils/StorageList'
import { Link } from 'react-router-dom';
import './index.css'

const contentStyle = {
  height: '500px',
  lineHeight: '500px',
};

export default class Rotation extends Component {



  state = {
    News: [],
  }
  componentDidMount() {
    const NewsList = StorageList.getList();
    const Data = []
    for(let item in NewsList){
      for(let el of NewsList[item]){
        Data.push(el)
      }
    }
    //console.log(Data);


    const res = Data.filter(item=>{
      return item.pinned === '1'
    })
    let Number = []
    for(let i=0;i<4;i++){
      const num = Math.floor(Math.random()*res.length);

      Number.push(num)
    }
    //Math.floor(Math.random()*10);

   let List = [];

   for(let i=0;i<4;i++){
    List.push(res[Number[i]])
  }
   //console.log(List)
   
   this.setState({News: List})



  }


  render() {
    
    const {News} = this.state
 
    //console.log(this.state.News)
    return (
      
      <div>
        <Carousel autoplay>
          {
            News.map(item=>{
              return (
                <div key={item.id} style={contentStyle} className="Carousel">
                  <h3>
                    <Link to={'/news/'+item.news_class+'?Id='+item.id} style={{color: '#fff',fontSize: '35px'}}>{item.title}</Link> 
                 </h3>
                </div>
              )
            })
          }
      
   
        </Carousel>
      </div>
    )
  }
}
