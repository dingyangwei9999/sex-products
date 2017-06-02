var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');


exports.Register = function(app){

	//设置 session
	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
		cookie: {maxAge: 60*60*1000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true
	}));

// sexUser是客户注册登录的集合名（表名）
	app.post('/login', urlencodedParser, function(request, response){
		db.exists('sexUser', request.body,['phone','password'], function(data){
			
			if(data.length > 0){
				request.session.phone = request.body.phone;
				response.send(apiResult(true,'',data))
                //console.log(request.session,request.body.phone);
			} else {
				response.send(apiResult(false, '手机号或者密码有误'));
			}
		})
	});

// 客户端注册 普通用户
	app.post('/register',urlencodedParser, function(request, response){
		console.log(request.body)
		db.exists('sexUser', request.body,['phone'], function(data){
			
			if(data.length > 0){
				request.session.phone = request.body.phone;
				response.send(apiResult(true,'该手机号已被注册过'))
                //console.log(request.session,request.body.phone);
			} else {
				db.save('sexUser', request.body);
				response.send(apiResult(false));
			}
		})
	});

	app.get('/logout', function(request, response){
		response.send('account logout');
	});

	app.get('/getsession', function(request, response){
		response.send(apiResult(request.session.name != null, null, request.session.name));
	});

	// sexAdmin是管理员登录的集合名（表名）
	app.post('/loginAdmin', urlencodedParser, function(request, response){
		db.exists('sexAdmin', request.body,['adminAccounts','password'], function(data){
			console.log(request.body);
			if(data.length > 0){
				request.session.adminAccounts = request.body.adminAccounts;
				response.send(apiResult(true,'',data))
                //console.log(request.session,request.body.adminAccounts);
			} else {
				response.send(apiResult(false, 管理员帐号));
			}
		})
	});

	// 后台注册 管理员用户
	app.post('/registerAdmin',urlencodedParser, function(request, response){
		console.log(request.body,'=====')
		db.exists('sexAdmin', request.body,['adminAccounts'], function(data){
			
			if(data.length > 0){
				response.send(apiResult(false,'已存在的管理员账号'))
			} else {
				db.save('sexAdmin', request.body);
				response.send(apiResult(true,'添加管理员成功'));
			}
		})
	});
    
   /* //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });*/
}
