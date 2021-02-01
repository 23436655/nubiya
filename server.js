let express = require("express")();
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function (req, res, next) {
	// 跨域处理
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next(); // 执行下一个路由
})

// 规划mysql链接
let sql = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "school",
	timezone:"08:00"
})
// 尝试链接
sql.connect();
express.get("/login", (request, response) => {
	let user = request.query.username;
	let pass = request.query.password;
	// response.send(user)
	// response.send(pass)
	sql.query(`SELECT * FROM user WHERE username="${user}" AND password="${pass}"`, (error, data) => {
		if (error) {
			console.log("库找错了");
			response.send("error")
		}
		else {
			//console.log(data);

			if (!data.length) {
				console.log("库里面没有");
				response.end("error")
			}
			else {
				console.log("库里面有");
				response.end("success")
			}
		}
	})

})
//注册接口
express.get("/addUser", (request, response) => {
	let username = request.query.username;
	let password = request.query.password;
	sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`, (error) => {
		if (error) {
			console.log(error);
			response.send("error")
		}
		else {
			response.end("success")
		}
	})

})
//获取学生信息
express.get("/getstudents",(request,response)=>{
	const id=request.query.id;
	let s=id?`SELECT*FROM student WHERE id="${id}"`:`SELECT*FROM student ORDER BY id`;
	sql.query(s,(error,data)=>{
		if(error){
			console.log(error)
			response.end("error")
		}
		else{
			response.send(data)
		}
	})
})
//删除学生信息
express.get("/deletestudent",(request,response)=>{
	const id=request.query.id;
	sql.query(`DELETE FROM student WHERE id=${id}`,(error,data)=>{
		if(error){
			console.log(error)
			response.end("error")
		}
		else{
			response.send("success")
		}
	})
})
//新增
express.get("/addstudent",(request,response)=>{
	const name=request.query.name;
	const age=request.query.age;
	const sex=request.query.sex;
	const city=request.query.city;
	const joindata=request.query.joindata;
	if(name&&age&&sex&&city&&joindata){
		sql.query(`INSERT INTO student (name,age,sex,city,joindata) VALUES ("${name}","${age}","${sex}","${city}","${joindata}")`,(error,data)=>{
			if(error){
				console.log(error)
				response.end(error)
			}
			else{
				response.send("success")
			}
		})
	}
	else{
		response.end("error");
	}
})
//修改
express.get("/xiugai",(request,response)=>{
	const id=request.query.id;
	const name=request.query.name;
	const age=request.query.age;
	const sex=request.query.sex;
	const city=request.query.city;
	const joindata=request.query.joindata;
	// console.log(id);
	// console.log(city);
	// console.log(age)
	// console.log(sex);
	// console.log(joindata)
	sql.query(`UPDATE student SET name="${name}",age="${age}",sex="${sex}",city="${city}",joindata="${joindata}" WHERE id="${id}"`,(error,data)=>{
			if(error){
				console.log(error)
				response.end(error)
			}
			else{
				response.send("success")
			}
		})
})
// // 监听来自前端的get请求(不是一个静态请求，而是一个路由请求)
// express.get("/list",(request,response)=>{
// 	// 在后端控制台输出内容
// 	console.log("接收到来自前端发送的请求");
// 	// 向前端返回数据
// 	response.send("success!!!!")
// })

// // 监听来自前端的get请求(不是一个静态请求，而是一个路由请求)
// express.get("/details",(request,response)=>{
// 	// 在后端控制台输出内容
// 	console.log("接收到来自前端发送的details路由请求");
// 	// 向前端返回数据
// 	response.send("哈哈哈哈哈")
// })


// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)