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
      return item.pinned === '1'&&item.flag === '2'
    })
    let Number = []
    for(let i=0;i<4;i++){
      const num = Math.floor(Math.random()*res.length);

      Number.push(num)
    }
    console.log(Number)
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
    let NewsData = Array.from(News)
    //console.log(NewsData)
    // var imgReg = /http.*?(?:.jpg|\/jpg)/gi;
    // let arr =[]
    // for (let i of NewsData) {
    //   arr.push(i.context.match(imgReg)[0])
      
    // }
    // console.log(arr)

    return (
      
      <div>
        <Carousel autoplay>
          {
            NewsData.map((data, index)=>{
              return (
                <div key={data.id} style={contentStyle} className="Carousel">
                  <h3>
                    <Link to={"/news/" + data.news_class + '?Id=' + data.id} style={{color: '#fff',fontSize: '35px'}}>{data.title}</Link> 
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
