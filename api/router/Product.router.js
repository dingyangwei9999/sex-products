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
      response.send(JSON.stringify(result));
    });
  });

  //根据id是否查询得到商品
  app.post('/getProductsById',urlencodedParser,function(request, response){
    console.log('request.body--------',request.body._id);

    var isFinded = false;
    db.exists('shopInfo',{},[],function(result){
      result.forEach(function(item){
        //根据id是否查询得到商品
        if(item._id == request.body._id){
          isFinded = true;
          response.send(JSON.stringify(item));
          return false;
        }
      });
      !isFinded ? response.send(JSON.stringify({status:false,meaages:"没有查询到商品"})):'';
    });
  });

  //传入字符串查询商品分类和关键字  默认包含全局搜索(fuzzy为false则不开启)
  app.post('/getProductsByArr',urlencodedParser,function(request, response){
    console.log(request.body);
    //是否开启全局搜索，默认开启
    var fuzzy = request.body.fuzzy ? JSON.parse(request.body.fuzzy) : true;
    //记录请求数据
    var arr = [];
    //根据前端数据添加进数据
    for(var attr in request.body){
      //跳过请求中的fuzzy属性
      if(!(attr === "fuzzy")){
        arr.push(request.body[attr]);
      }
    }
    console.log(arr);
    arr = arr.toString();
    //把arr转换成字符串
    var Reg = new RegExp(arr);
    console.log(arr,Reg);
    db.existsSingle('shopInfo',request.body,Reg,function(result){
      //记录全局搜索的所有结果
      var searchAll = [];
      //假如fuzzy为true则开启全局搜索
      if(fuzzy){
        //先获取一条数据，查看该数据的所有字段
        db.getProductFilter('shopInfo', {},/./, 0, 1, {},function(res){
          var totalCount = 0;
          try{
            //记录获取到数据的所有字段的总数并剪掉与图片相关的个数,
            //假如没有查到到任何商品的结果则getOwnPropertyNames会出错
            //getOwnPropertyNames：返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组
            totalCount = Object.getOwnPropertyNames(res[0]).length - 3;
          }catch(error){
            console.log("查找出错，数据库可能为空，错误信息：",error);
          }
          //如果totalCount没有大于0则终止函数
          if(totalCount <= 0){
            response.send(apiResult(false, '后台数据异常'));
            return;
          }
          //记录db回调函数的运行次数
          var count = 0;
          for(var attr2 in res[0]){
            //不查找与图片有关的信息，跳过处理
            if(!(attr2 === 'bannerImg' || attr2 === 'listImg' || attr2 === 'preview')){
              //fooObj为需要查找的属性，Reg为需要查找的内容
              var fooObj = {[attr2]:res[0][attr2]};
              db.existsSingle('shopInfo',fooObj,Reg,function(_result){
                //如果没有结果则不执行push
                if(!(_result.length === 0)){
                  //_result为数组，避免二维数组产生，遍历统一push到searchAll
                  _result.forEach(function(item){
                    searchAll.push(item);
                  });
                }
                //结果两值相等，则所有数据已经查完，可以响应结果
                if(totalCount === ++count){
                  //把最终结果进行去重
                  function unique(arr){
                    var hash = {};
                    return arr.reduce(function(prev, curr) {
                      hash[curr._id] ? '' : hash[curr._id] = true && prev.push(curr);
                      return prev
                    }, [])
                  }
                  //响应去重后的结果
                  response.send(JSON.stringify(unique(searchAll)));
                }
              });
            }
          }
        });
      }
      //没有开启全局搜索，则响应最初的结果
      fuzzy || response.send(JSON.stringify(result));
    });
  });

  //查找商品信息，可以限制数量，可以排序
  app.post('/getProductsAdvanced',urlencodedParser,function(request, response){
    console.log('request.body:',request.body);

    console.log('typeof request.body.sort:',typeof request.body.sort);
    var arr = [];
    //根据前端数据添加进数据
    for(var attr in request.body){
      console.log('attr:',attr);
      if(!(attr === 'limit' || attr === 'skip' || attr ==='sort' || attr === "fuzzy")){
        arr.push(request.body[attr]);
      }
    }
    arr = arr.toString();
    if(arr === ""){
      arr = /\d\D/;
    }
    var Reg = new RegExp(arr);
    console.log('arr:',arr,'Reg:',Reg);
    db.getProductFilter('shopInfo', request.body, Reg, request.body.skip, request.body.limit, request.body.sort,function(result){
      response.send(JSON.stringify(result));
    });
  });


  //删除商品
    app.post('/delProducts',urlencodedParser,function(request, response){
    console.log(request.body);
    //判断是否删除了商品
    var isDelete = false;
    //首先通过id查找数据库
    db.exists('shopInfo',{},[],function(result){
      result.forEach(function(item){
        //找到，删除商品
        if(item._id == request.body._id){
          db.delByProductsObj('shopInfo',item,function(){
          });
          //已经删除商品
          isDelete = true;
          return false;
        }
      });
    });
    //返回删除状态
    !isDelete ? response.send(JSON.stringify({status:true,message:"删除成功"})):response.send(JSON.stringify({status:false,message:"删除失败"}));
  });

  //修改商品数据
  app.post('/updataProducts',urlencodedParser,function(request, response){
    console.log(JSON.parse(request.body.data));
    //需要修改的数据
    var data = JSON.parse(request.body.data);
    //是否修改成功
    var isUpdate = false;

    db.exists('shopInfo',{},[],function(result){
      result.forEach(function(item){
        //根据id是否查询得到商品
        if(item._id == request.body._id){
          //修改成功
          isUpdate = true;
           db.updateProducts('shopInfo',item,data);
          return false;
        }
      });
    });

    //返回修改状态
    !isUpdate ? response.send(JSON.stringify({status:true,message:"修改成功"})):response.send(JSON.stringify({status:false,message:"修改失败"}));
  });

  //查找专区个数，分类个数
  app.post('/getBaseInfo', urlencodedParser, function(request, response) {
    // console.log('----',request.body);
    var arr = [];
    for(var attr in request.body){
      arr.push(attr);
    }
    db.exists('shopManage',request.body,arr,function(result){
      console.log(result);
      response.send(result);
    });
  });

  //修改专区个数，分类个数
  app.post('/updateBaseInfo', urlencodedParser, function(request, response) {
    console.log('----',request.body);
    var obj = {};
    for(var attr in request.body){
      obj[attr] = JSON.parse(request.body[attr]);
    }
    console.log('=====',obj);
    db.updateProducts('shopManage',{},obj);
    response.send(apiResult(true,'修改成功'));
  });


     // 获取我的资料的数据 各分类的数据
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

}