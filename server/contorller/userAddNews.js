const db = require('../moudule//db.js')

async function addnewsclass(req, res) {
	
	const paramse = [];
	
	if (req.body.newsclass_flag === '1') {
		const setupsql = `CREATE TABLE ${req.body.news_class} (id VARCHAR(255), news_class VARCHAR(255), 
						title VARCHAR(255),edit VARCHAR(255),source VARCHAR(255),
						tag VARCHAR(255),start_time VARCHAR(255),
	 					end_time VARCHAR(255),flag VARCHAR(255),pinned VARCHAR(255),
						context VARCHAR(10000),reviewer VARCHAR(255))`;
		await db(setupsql, paramse, (result)=>{
			if (result) {
			console.log(req.body.news_class+'创建表成功')	

		}else {
			console.log(req.body.news_class+'创建表失败')	
			
		}
			
				
		});



		const flag = '2';
		const setsql = `UPDATE news_class SET flag=${flag} WHERE news_className='${req.body.news_class}'`;
		await db(setsql, paramse, (result)=>{
			if (result) {
				console.log('数据更新成功')
				res.json({
					code: 200,
					msg: '数据更新成功'
				})
						
			}else {
				console.log('数据更新失败')
				res.json({
					code: 401,
					msg: '数据更新失败'
				})
			}
		});

	}

	

}




async function addnews(req, res) {
			let tag = req.body.tag.toString();
			let sql = `INSERT INTO ${req.body.news_class}(id, news_class, title, edit, source, tag, start_time, end_time, flag, pinned, context, reviewer) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
			let paramse = [req.body.id, req.body.news_class, req.body.title, req.body.edit, req.body.source, tag, req.body.start_time, '', req.body.flag, req.body.pinned?'1':'0', req.body.context, req.body.username];
			
			//let sql = `INSERT INTO ${req.body.news_class}(tag) VALUES(?)`;
			
			//let paramse= [tag];
			//console.log(sql)
			//console.log(paramse)
			await db(sql, paramse, (result)=>{
					if (result) {
						console.log(req.body.news_class+'添加新闻成功')
					
							res.json({
							code: 200,
							msg: '添加成功'
							})		
					}else {
						console.log(req.body.news_class+'添加新闻失败')
						res.json({
							code: 404,
							msg: '添加失败'
						})
					}
				});

}

module.exports = {
	addnewsclass,
	addnews
}