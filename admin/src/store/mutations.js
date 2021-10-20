export default {
  //把用户信息放在vuex状态管理里面
  get_user(state, data){
    state.User = data
  },

  //更新用户信息
  Up_StateUser(state, res){
    state.User[res.value] = res.data
  },

 //删除一条管理员信息
  Del_User(state, res){
    state.UserList.forEach((item, index)=>{
      if(item.id === res) {
        state.UserList.splice(index, 1)
      }
    })
  },
  //删除一条新闻文章
  Del_NewsList(state, res){
    state.NewsList.forEach((item, index)=>{
      if(item.id === res) {
        state.NewsList.splice(index, 1)
      }
    })
  },
  //数据库中获取新用户列表，更新状态
  get_UserList(state, res) {
    state.UserList = res
  },

  //提交分类，标签后更新页面信息状态
  get_UP_TAG_NEWCLASS(state){
    state.NewsClass.forEach(item => {
      item.type = 'success'
    });
    state.TagNews.forEach(item => {
      item.type = 'success'
    });
  },


  /*                                         新闻分类状态管理                        */

    //数据库中获取新闻分类列表，更新新闻分类状态
    get_NewsClassList(state, data){
      let result = data.filter(item=>{return item.flag === '2'})
      state.NewsClass = result
    },

    //把新的新闻分类更新到状态里面
    get_NewsClass(state, res){
      state.NewsClass = res
    },

    //删除一条新闻分类的数据
    del_NewsClass(state, num){
      state.NewsClass.splice(num, 1)
    },

/*                                         新闻标签状态管理                        */
    del_TagNews(state, num){
      state.TagNews.splice(num, 1)
    },
    get_TagNews(state, res){
      state.TagNews = res
    },
    get_TagClassList(state, data){
      state.TagNews = data
    },



    add_Text(state, data){
      state.StartText.push(data)
      state.NewsClass.forEach((item)=>{
        if(item.news_className === data.news_class){
          item.flag = "2"
        }
      });
    },



/*                                         新闻所有分类的文章                        */ 
    get_NewsListAll(state, res){
      state.NewsListAll = res
     
    },
    get_NewsState(state, res){
      state.NewsList = res.NewsList;
      state.ExamineList = res.ExamineList;
      state.SuccessList = res.SuccessList;
      state.DefeatedList = res.DefeatedList;
    },

    /*                                         审阅新闻的文章成功                        */ 
    Up_NewsFlag(state, res){
      state.ExamineList.forEach((item) => {
        if(item.id === res.id){
          item.flag = res.flag;
          if(res.flag === '2'){
            state.SuccessList.push(item)
          }else{
            state.DefeatedList.push(item)
          }
        }
      })
    }
}
