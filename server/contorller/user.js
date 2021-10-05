const db = require('../moudule//db.js')

async function login(req, res) {
	const sql = 'SELECT * FROM admin';
	const paramse = [];
	
	await db(sql, paramse, (result)=>{
		const user = result.filter((item)=>{
			return item.username === req.body.username &&
					item.password === req.body.password;
		});

		if (user.length) {
			res.json({
				code: 200,
				msg: '登录成功',
				flag: user[0].root_flag,
				result: {
					id: user[0].id,
					username: user[0].username,
					call: user[0].root_call,
					email: user[0].root_email,
					address: user[0].root_address
				}
			})
		}else {
			res.json({
				code: 404,
				msg: '账户或密码错误'
			})
		}

	})
};

async function registered(req, res) {
	const check = 'SELECT * FROM admin';
	const data = [];
	console.log(req);
	await db(check, data, (result)=>{
		//console.log(result);
		// for(let item of result){
		// 	if (item.username === req.body.username) {
		// 		res.json({
		// 			code: 401,
		// 			msg: '账号已存在'
		// 		})
		// 	}
		// }
		// 
		const data  = result.filter(function(el) {
			return el.username === req.body.username;
		});

		if (data.length) {
			res.json({
					code: 401,
					msg: '账号已存在'
				})
		}else {
			registeredUser(req, res)
		}
	});

	//console.log(SameUser);

	
};


async function registeredUser(req, res) {
	const sql = 'INSERT INTO admin(id,username,password,root_call,root_email,root_address,root_flag) VALUES(?,?,?,?,?,?,?)';
	const paramse = [req.body.id,req.body.username,req.body.pass,req.body.call,req.body.email,req.body.address,req.body.flag];
	await db(sql, paramse, (result)=>{
			if (result) {
				res.json({
					code: 200,
					msg: '注册成功'
				})
			}else {
				res.json({
					code: 404,
					msg: '注册失败'
				})
			}
		})
}


async function userlist(req, res){
	const sql = 'SELECT * FROM admin';
	const paramse = [];
	await db(sql, paramse, (result)=>{
		const data = result.filter(function(el) {
				return el.root_flag == 1;
			});

		data.forEach( function(el) {
			delete el.password
		});

		if (result) {
			res.json({
				code: 200,
				msg: '查询成功',
				userlist: data
			})
		}else {
			res.json({
				code: 401,
				msg: '查询失败'
			})
		}

	})
}

async function upuser(req, res){
	//console.log(req.body);
	//const sql = 'SELECT * FROM admin';
	if(req.body.password){
		const sql = `SELECT * FROM admin WHERE id='${req.body.id}'`;
		const paramse = [];
		await db(sql, paramse, (result)=>{
			//console.log(result)
			if (result) {
				if (result[0].password === req.body.password) {
				//console.log('111')
					upPassWord(req.body, res)
				}else {
					//console.log('2222')
					res.json({
						code: 403,
						meg: '密码错误, 不能修改',
						result: {
							id: result[0].id,
							username: result[0].username,
							call: result[0].root_call,
							email: result[0].root_email,
							address: result[0].root_address
						}
					});
				}
			}else {
				res.json({
						code: 401,
						meg: '数据库链接错误'
					});
			}

		});
	}else {
		

		const sql = `UPDATE admin SET username='${req.body.username}', root_call='${req.body.call}', root_email='${req.body.email}', root_address='${req.body.address}' WHERE id='${req.body.id}'`
		const paramse = [];
		await db(sql, paramse, (result)=>{
			if (result) {
				res.json({
					code: 200,
					msg: '更改数据成功'
				})
			}else {
				res.json({
					code: 401,
					msg: '更改数据失败'
				})
			}

		})

	}
	



	
		
	
};
async function upPassWord(data, res) {
	// const newsomepassworde = data.newsomepassworde;
	// newsomepassworde.toString();
	console.log(data);
	//console.log(data.newsomepassworde)
	const sql = `UPDATE admin SET username='${data.username}',password='${data.newspwd}', root_call='${data.call}', root_email='${data.email}', root_address='${data.address}' WHERE id='${data.id}'`
		const paramse = [];
		await db(sql, paramse, (result)=>{
			if (result) {
				res.json({
					code: 200,
					msg: '更改密码成功'
				})
			}else {
				res.json({
					code: 401,
					msg: '更改密码失败'
				})
			}

		})
	
};


async function deluser(req, res) {
	console.log(req.body.id)
	const sql = `DELETE FROM admin WHERE id = '${req.body.id}'`
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

		})
	
}

module.exports = {
	login,
	registered,
	userlist,
	upuser,
	deluser
}