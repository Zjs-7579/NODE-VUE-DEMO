export default {
  //获取用户信息
  getUser({commit}, res) {
    let data = res.data.result
    commit('get_user', data)
  },
  //更新用户信息
  UpStateUser({commit}, res){
    //console.log(res)
    commit('Up_StateUser', res)
  },
   //删除一条管理员信息
  DelUser({commit}, res){
    //console.log(res)
    commit('Del_User', res)
  },
  //删除一条新闻文章
  DelNewsList({commit}, res){
    //console.log(res)
    commit('Del_NewsList', res)
  },
   //接收数据库中管理员的信息
   getUserList({commit}, res) {
     //const res = res.data
    commit('get_UserList', res)
   },

   //提交分类，标签后更新页面信息状态
  UP_TAG_NEWCLASS({commit}){
    commit('get_UP_TAG_NEWCLASS')
  },

  /*                                         新闻分类状态管理                        */
  //更新新闻分类的类别,并且更新数据库里面的新闻分类列表
  getNewsClass({commit}, res) {
    commit('get_NewsClass', res)
  },

  //删除一条新闻分类的数据
  delNewsClass({commit}, num){
    commit('del_NewsClass', num)
  },
  //数据库中获取新闻分类列表，更新新闻分类状态
  getNewsClassList({commit}, res){
    let data = res.data.result
    commit('get_NewsClassList', data)
  },

/*                                         新闻标签状态管理                        */
  delTagNews({commit}, num){
    commit('del_TagNews', num)
  },

  getTagNews({commit}, res) {
    commit('get_TagNews', res)
  },
  getTagClassList({commit}, res){
    let data = res.data.result
    commit('get_TagClassList', data)
  },




/*                                         新闻发布，文字待审阅状态                        */
  addText({commit}, res){
    commit('add_Text', res)
  },




/*                                         新闻所有分类的文章                        */ 
  getNewsListAll({commit}, res){
    commit('get_NewsListAll', res);
  },
/*                                         审阅新闻的文章成功                        */ 
  UpNewsFlag({commit}, res){
    console.log(res)
    commit('Up_NewsFlag', res);
  },

}