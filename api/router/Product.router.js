var multer = require ('multer');

// var upload = multer({ dest:  "./upload" }); 
var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../upload')  
  },  
  filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);    
  }  
}) 

var upload = multer({ storage: storage })

exports.Register = function(app){
  //上传图片用到的
  //upload.array('photos', 12)  备份
  var cpUpload =  upload.fields([{ name: 'preview', maxCount: 1 }, { name: 'bannerImg', maxCount: 8 }, { name: 'listImg', maxCount: 20 }]);
	app.post('/upload', urlencodedParser,cpUpload, function(request, response) {

    //所有上传图片的集合(类型为obj) 格式{[{},{}]}
    var imgFilesObj = request.files;

    //商品对象
    var newShopObj = JSON.parse(request.body.newShop);
    console.log(newShopObj);
    //轮播图数组容器
    var bannerImgArr = [];

    //列表图数组容器
    var listImgArr = [];
    //存入图片路径到商品对象中
    for(var attr in imgFilesObj){
      imgFilesObj[attr].forEach(function(item){
        switch(item.fieldname){
          case 'preview' :
            newShopObj[item.fieldname] = item.filename;break;
          case 'bannerImg' :
            bannerImgArr.push(item.filename);break;
          case 'listImg' :
            listImgArr.push(item.filename);break;
        }
      });
    }
    newShopObj.bannerImg = bannerImgArr;
    newShopObj.listImg = listImgArr;

		console.log(newShopObj);
    //写入数据库
    db.save('shopInfo',newShopObj); 	
    //响应
	 	response.send('{"status":true,"message":"上传成功"}'); 
	});
  //备份 (仅添加数据无上传图片)
  // app.post('/upload', urlencodedParser, function(request,response) {
  //   // console.log(request.body.newShop);
  //   db.save('shopInfo',request.body.newShop);
  //   response.setHeader('Access-Control-Allow-Origin','*');
  //   response.send('{"status":true,"message":"插入成功"}');
  // }); 
  
  //查询所有商品
  app.post('/getProducts',urlencodedParser,function(request, response){
    db.exists('shopInfo',{},[],function(result){
      console.log(result);
      response.send(JSON.stringify(result));
    });
  });

  //根据id是否查询得到商品
  app.post('/getProductsById',urlencodedParser,function(request, response){
    console.log('request.body--------',request.body._id);

    // var searchArr = [];
    // for(var attr in request.body){
    //   searchArr.push(attr);
    // }

     // console.log(searchArr);
    //根据id是否查询得到商品
    var isFinded = false;
    db.exists('shopInfo',{},[],function(result){
      result.forEach(function(item){
        if(item._id == request.body._id){
          isFinded = true;
          response.send(JSON.stringify(item));
          return false;
        }
      });
      !isFinded ? response.send(JSON.stringify({status:false,meaages:"没有查询到商品"})):'';
    });
  });

  //传入数组查询商品分类和关键字
  app.post('/getProductsByArr',urlencodedParser,function(request, response){
    console.log(request.body);
    // var arr = ['keyword','classify'];
    var arr = [];
    for(var attr in request.body){
      console.log(attr);
      arr.push(request.body[attr]);
    }
    arr = arr.toString();
    // var arr = request.body.keyword.split(',');
    var Reg = new RegExp(arr);
  console.log(arr.toString());
    db.existsSingle('shopInfo',request.body,Reg,function(result){
      console.log(result);
      response.send(JSON.stringify(result));
    });
  });



  

   // 获取我的资料的数据
  app.post('/classify_hot', urlencodedParser, function(request, response){
    // console.log(request.body.a)
    if (request.body.a==1) {
      db.getProByClass('shopInfo',"热门专区",function(result){
        response.send(result);
      });
      }
    else if (request.body.a==2) {
      db.getProByClass_orderprice('shopInfo',"热门专区",function(result){
        response.send(result);
      });
      }
    else if (request.body.a==3) {
      db.getProByClass_ordersales('shopInfo',"热门专区",function(result){
        response.send(result);
      });
      }
  });
  app.post('/classify_condom', urlencodedParser, function(request, response){
    // console.log(request.body.a)
    if (request.body.a==1) {
      db.getProByClass('shopInfo',"套套专区",function(result){
        // console.log(result)
        response.send(result);
      });
      }
    else if (request.body.a==2) {
      db.getProByClass_orderprice('shopInfo',"套套专区",function(result){
        response.send(result);
      });
      }
    else if (request.body.a==3) {
      db.getProByClass_ordersales('shopInfo',"套套专区",function(result){
        response.send(result);
      });
      }
  });
  app.post('/classify_male', urlencodedParser, function(request, response){
    // console.log(request.body.a)
    if (request.body.a==1) {
      db.getProByClass('shopInfo',"男性专区",function(result){
        // console.log(result)
        response.send(result);
      });
      }
    else if (request.body.a==2) {
      db.getProByClass_orderprice('shopInfo',"男性专区",function(result){
        response.send(result);
      });
      }
    else if (request.body.a==3) {
      db.getProByClass_ordersales('shopInfo',"男性专区",function(result){
        response.send(result);
      });
      }
  });
  app.post('/classify_female', urlencodedParser, function(request, response){
    // console.log(request.body.a)
    if (request.body.a==1) {
      db.getProByClass('shopInfo',"女性专区",function(result){
        // console.log(result)
        response.send(result);
      });
      }
    else if (request.body.a==2) {
      db.getProByClass_orderprice('shopInfo',"女性专区",function(result){
        response.send(result);
      });
      }
    else if (request.body.a==3) {
      db.getProByClass_ordersales('shopInfo',"女性专区",function(result){
        response.send(result);
      });
      }
  });
  app.post('/classify', urlencodedParser, function(request, response){
    db.getProduct('shopInfo',function(result){
      response.send(result);
    });
  });

  // 设置跨域访问
  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1')
      // res.header("Content-Type", "application/json;charset=utf-8");
      next();
  });

}