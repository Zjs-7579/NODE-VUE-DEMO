const db = require('../moudule//db.js')


async function newsClassTag(req, res){
	const sql = `SELECT * FROM news_class`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		for(let item of result){
			if(item.flag === '2'){
				newsClass(res, item, result.length)
			}
		}
	});
	
	
};

let data = {};
let num = 0;	
async function newsClass(res, item, len) {
	const sql = `SELECT * FROM ${item.news_className}`;
	const paramse = [];
	const resultData = item.news_className;

	await db(sql, paramse, (result)=>{
		//const Data = {};
		if (result) {
			
			data[resultData] = result;
			num = num + 1;

			if (num === len) {
				res.json({
					code: 200,
					msg: '查询成功',
					newsList: data
				})

				num = 0
			}

			
			
		}else {
			res.json({
				code: 401,
				msg: '查询出错'
			})
		}


	});
};



async function delnews(req, res){
	const sql = `SELECT * FROM ${req.body.news_class} WHERE id = '${req.body.id}'`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
				res.json({
					code: 200,
					msg: '删除成功'
				})
			}else {
				res.json({
					code: 401,
					msg: '删除失败'
				})
			}
	});
	
	
};





module.exports = {
	//获取所有新闻列表
	newsClassTag,
	//删除新闻
	delnews
	
}