const db = require('../moudule//db.js')



async function upNewsFlag(req, res){
	console.log(req.body)
	const sql = `UPDATE ${req.body.news_class} SET flag='${req.body.flag}', end_time='${req.body.time}' WHERE id='${req.body.id}'`
	//const sql = `SELECT * FROM ${req.body.news_class}`
	const paramse = [];
	await db(sql, paramse, (result)=>{
		if (result) {
			res.json({
				code: 200,
				meg: '更新成功'
			})
		}else {
			res.json({
				code: 401,
				meg: '更新失败'
			})
		}
	});
	
	
};



module.exports = {
	upNewsFlag
}