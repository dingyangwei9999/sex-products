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
    //设置请求头防止跨域
    response.setHeader('Access-Control-Allow-Origin','*'); 	
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
  // 
  // 得到我的详情页数据
  app.post('/detail', urlencodedParser,function(request, response){
        db.getProduct('shopInfo',function(result){
      // res.header("Access-Control-Allow-Origin", "*");
      response.send(result);
    });
  })
}