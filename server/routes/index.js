module.exports = app => {
	
	const express = require('express');
	const router = express.Router();
	const userapi = require('../contorller/user.js')
	const newsapi = require('../contorller//news.js')
	const userAddNews = require('../contorller//userAddNews.js')
	const newsClass = require('../contorller//newsClass.js')
	const upNewsFlag = require('../contorller//upNewsFlag.js')
	
	app.use('/api', router)

	router.post('/login',userapi.login)
	router.post('/registered',userapi.registered)
	router.get('/userlist',userapi.userlist)
	//upuser
	router.post('/upuser',userapi.upuser)
	router.post('/deluser',userapi.deluser)




	router.post('/upnewsclass',newsapi.upnewclass)
	//delnewclass
	router.post('/delnewclass',newsapi.delnewclass)
	//newsclass
	router.get('/newsclass',newsapi.newsclass)
	//uptagclass
	router.post('/uptagclass',newsapi.uptagclass)
	//deltagclass
	router.post('/deltagclass',newsapi.deltagclass)
	//tagnews
	router.get('/tagnews',newsapi.tagnews)





	router.post('/addnewsclass',userAddNews.addnewsclass)
	//addnews
	router.post('/addnews',userAddNews.addnews)




	//所有新闻类型集合
	router.get('/newsclasstag',newsClass.newsClassTag)
	router.post('/delnews',newsClass.delnews)





	router.post('/upnewsflag',upNewsFlag.upNewsFlag)
	//errnewsflag
	//router.post('/errnewsflag',upNewsFlag.errNewsFlag)
}