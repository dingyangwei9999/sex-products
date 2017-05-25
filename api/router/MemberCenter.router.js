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


	app.post('/myProfile', urlencodedParser, function(request, response){

		db.exists('myProfile', request.body,['name','nickname','wechat','gender','city','birthday'], function(data){

			if(data.length > 0){
				request.session.phone = request.body.phone;
				response.send(apiResult(true))
                //console.log(request.session,request.body.phone);
			} else {
				db.del('myProfile',function(result){
					if(result){
						db.save('myProfile', request.body);
					}
				});
				
				response.send(apiResult(false, '资料修改成功'));
			}
		})
	});

	// 获取我的资料的数据
	app.post('/getmyProfile', urlencodedParser, function(request, response){
		db.extract('myProfile',function(result){
			response.send(result);
		});

	});


	// 设置收货管理地址
	app.post('/address', urlencodedParser, function(request, response){
		db.save('address', request.body)
		response.send(apiResult(false, '设置成功'))
	});
	// 获取收货管理地址
	app.post('/getaddress', urlencodedParser, function(request, response){
		console.log(request.body)
		db.extract('address',function(result){
			response.send(result);
		});
	});
	// 删除收货管理地址
	app.post('/deladdress', urlencodedParser, function(request, response){
		db.del('address',request.body,['address','name','phoneNum','city'],function(result){
			response.send(result);
		});
	});
	// 修改收货管理地址
	app.post('/Alteraddress', urlencodedParser, function(request, response){
		console.log(request.body.name);
		for(var attr in request.body){
			console.log('----',attr,typeof attr);
		}
		try{

		console.log(request.body['yuanlaide[_id]']);
		}catch(err){
			console.log('error');
		}
		response.send();
		// db.exists('address', request.body, ['address','name','phoneNum','city'],function(result){
		// 	response.send('true');
			

		// })
		// db.alter('address',request.body,['address','name','phoneNum','city'],function(result){
		// 	response.send(result);
		// });
	});



	// app.post('/register',urlencodedParser, function(request, response){
	// 	console.log(request.body)
	// 	db.exists('sexUser', request.body,['phone'], function(data){
			
	// 		if(data.length > 0){
	// 			request.session.phone = request.body.phone;
	// 			response.send(apiResult(true,'该手机号已被注册过'))
 //                //console.log(request.session,request.body.phone);
	// 		} else {
	// 			db.save('sexUser', request.body);
	// 			response.send(apiResult(false));
	// 		}
	// 	})
	// });

	// app.get('/logout', function(request, response){
	// 	response.send('account logout');
	// });

	// app.get('/getsession', function(request, response){
	// 	response.send(apiResult(request.session.name != null, null, request.session.name));
	// });
    
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
