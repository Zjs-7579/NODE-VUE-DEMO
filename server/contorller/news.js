const db = require('../moudule/db.js')

async function upnewclass(req, res) {

	//console.log(req.body)
	let sql = 'INSERT INTO news_class(classify_id, classify_name, news_className, type, flag) VALUES(?,?,?,?,?)';
	const sum = req.body.length;
	let num = 0;
	for (let item of req.body) {
		let paramse = [item.classify_id, item.classify_name, item.news_className, item.type, item.flag];
		await db(sql, paramse, (result)=>{
			if (result) {
				console.log(item.classify_name+'添加新闻分类成功')
				num++;
				if (num === sum) {
					res.json({
					code: 200,
					msg: '添加成功'
				})
			}		
			}else {
				res.json({
					code: 404,
					msg: '添加失败'
				})
			}
		});
	}
};

async function delnewclass(req, res) {
	const sql = `DELETE FROM news_class WHERE classify_id = ${req.body.classify_id}`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
			res.json({
				code: 200,
				msg: '删除成功'
			})
		}else {
			res.json({
				code: 404,
				msg: '删除数据出错'
			})
		}
	});

};

async function newsclass(req, res) {
	const sql = `SELECT * FROM news_class`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
			res.json({
				code: 200,
				msg: '查询成功',
				result: result
			})
		}else {
			res.json({
				code: 404,
				msg: '查询出错'
			})
		}
	});
}


async function uptagclass(req, res) {

	//console.log(req.body)
	let sql = 'INSERT INTO tag_news(tag_id, tag_name, type, tag_alias) VALUES(?,?,?,?)';
	const sum = req.body.length;
	let num = 0;
	for (let item of req.body) {
		let paramse = [item.tag_id, item.tag_name, item.type, item.tag_alias];
		await db(sql, paramse, (result)=>{
			if (result) {
				console.log(item.tag_name+'添加新闻标签成功')
				num++;
				if (num === sum) {
					res.json({
					code: 200,
					msg: '添加成功'
				})
			}		
			}else {
				res.json({
					code: 404,
					msg: '添加失败'
				})
			}
		});
	}
};
// async function getclass(req, res) {
// 	//DROP TABLE material_tracking;
// }

async function deltagclass(req, res) {
	const sql = `DELETE FROM tag_news WHERE tag_id = ${req.body.tag_id}`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
			res.json({
				code: 200,
				msg: '删除成功'
			})
		}else {
			res.json({
				code: 404,
				msg: '删除数据出错'
			})
		}
	});

};

async function tagnews(req, res) {
	const sql = `SELECT * FROM tag_news`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
			res.json({
				code: 200,
				msg: '查询成功',
				result: result
			})
		}else {
			res.json({
				code: 404,
				msg: '查询出错'
			})
		}
	});
}
module.exports = {
	upnewclass,
	delnewclass,
	newsclass,
	uptagclass,
	deltagclass,
	tagnews	
}