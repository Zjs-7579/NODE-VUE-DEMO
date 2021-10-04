import React, { Component } from 'react'
import StorageList from '../../utils/StorageList'
import './index.css'

export default class index extends Component {
  render() {
    //console.log(this)
    console.log(this.props.location.pathname);
    console.log(this.props.location.search);

    const NewsClass = this.props.location.pathname.slice(6);
    const Id = this.props.location.search.slice(4);

    const NewsList = StorageList.getList();
    const result = NewsList[NewsClass].filter(
      item=>{
        return item.id === Id
      }
    )
    const time = new Date(result[0].end_time*1);
   
    const data = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
    //console.log(result)
     //console.log(result[0].end_time)
    return (
      <div className="NewsData">
        <h1>{result[0].title}</h1>
        <hr />
        <p><span>{data}</span><span>|</span><span>来源：{result[0].source}</span><span>|</span><span>编辑：{result[0].edit}</span></p>
        <br />
        <div dangerouslySetInnerHTML={{__html:result[0].context}}>
          
        </div>
        <br />
      
      </div>
    )
  }
}
