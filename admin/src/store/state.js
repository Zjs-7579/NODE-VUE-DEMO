export default {
  //用户信息
  User: JSON.parse( sessionStorage.getItem('User') || '[]' ),

  //管理员用户列表
  UserList: JSON.parse( sessionStorage.getItem('UserList') || '[]' ),

  //新闻标签信息
  TagNews: JSON.parse( sessionStorage.getItem('TagNews') || '[]' ),

  //新闻分类信息
  NewsClass: JSON.parse( sessionStorage.getItem('NewsClass') || '[]' ),

  //新闻发布开始状态
  StartText: [],

  //所有新闻分类文章,未综合
  NewsListAll: JSON.parse( sessionStorage.getItem('NewsListAll') || '{}' ),
  // NewsListAll: JSON.parse( sessionStorage.getItem('NewsListAll') || '{}' ),

  //新闻所有列表
  NewsList: JSON.parse( sessionStorage.getItem('NewsList') || '[]' ),

  //新闻已发布的新闻
  //SuccessNewsList: [],

  //未审阅的数据， flag为 1 
  ExamineList: JSON.parse( sessionStorage.getItem('ExamineList') || '[]' ),

  //审阅成功的数据， flag为 2
  SuccessList: JSON.parse( sessionStorage.getItem('SuccessList') || '[]' ),

  //未审阅失败的数据， flag为 3
  DefeatedList: JSON.parse( sessionStorage.getItem('DefeatedList') || '[]' ),
}