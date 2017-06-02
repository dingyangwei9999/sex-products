var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('sex-products', server);

db.open(function(err,db){
    if(err)throw err;
    console.info('mongodb connected');
});

var exists = function(_collection, data, arr, callback){

		//Account => 集合名（表名）
		var obj = {};
		arr.forEach(function (ele) {
			obj[ele] = data[ele]? data[ele] : '';
        });

        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find(obj).toArray(function(err, docs){
                    callback(docs);
                });
            }
        });

};

var save = function(_collection, data){

		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.insert(data);
			}
			
		})

};


//查询商品分类classify和keyword
var existsSingle = function(_collection, data, arr, callback){

		//Account => 集合名（表名）
		// var obj = {};
		// arr.forEach(function (ele) {
		// 	obj[ele] = data[ele]? data[ele] : '';
  //       });
		var obj = {};
		for(var attr in data){
			obj[attr] = arr;
		}
		// obj.keyword = arr;
		// obj[ele] = data[ele]? data[ele] : '';
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
            	console.log('obj:',obj);
                collection.find(obj).toArray(function(err, docs){
                    callback(docs);
                });
            }
        });

};

//查询根据条件商品，可以排序 ，可以限制数量，用于分页查询
var getProductFilter = function(_collection, data, Reg,skip,limit, sort,callback){
    //初始化变量的值   
    /*
        skip：查找起始位置
        limit：得到结果的个数
        sort：根据给定条件排序 1升序-1降序 (前台必须JSON.strigify否则parse出错,则取消排序
        格式："sotr":JSON.strigify({price:1}))
    */ 
    skip = skip ? parseInt(skip) : 0;
    limit = limit ? parseInt(limit) : 0;
    try{
        sort = sort ? JSON.parse(sort) : {};
    }catch(error){
        console.log('sort转换失败,取消排序',error);
        sort = {};
    }

    //obj为需要查找的数据
    var obj = {};
    for(var attr in data){
        //假如满足一下条件则跳过不加入obj中
        if(!(attr === 'limit' || attr === 'skip' || attr ==='sort')){
            obj[attr] = Reg;
        }
    }
    db.collection(_collection, function(error, collection){
        if(error){
            console.log(error)
        } else {
            console.log('obj:',obj);
            collection.find(obj).skip(skip).limit(limit).sort(sort).toArray(function(err, docs){
                callback(docs);
            });   
        }
    });

};


//删除直接通过商品完整信息
var delByProductsObj = function(_collection,data,callback){

		//Account => 集合名（表名）


		db.collection(_collection,function(err,collection){
			collection.remove(data,function(err,result){
				// console.log(result);
			})

		});	

}



// 删除
var del = function(_collection,data,arr,callback){

		//Account => 集合名（表名）

		var obj = {};
		arr.forEach(function (ele) {
			obj[ele] = data[ele]? data[ele] : '';
        });

		db.collection(_collection,function(err,collection){
			collection.remove(obj,function(err,result){
				callback(true);
			})


		});	

	
};


// 提取
var extract = function(_collection,callback){

        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
            	// console.log('obj:',obj);
                collection.find().toArray(function(err, docs){
                    callback(docs)
                });
            }
        });

}

//更新商品信息
var updateProducts = function(_collection,data,needUpdata){


		db.collection(_collection,function(err,collection){
			collection.update(data,{$set:needUpdata},true,function(err,result){
				if(err){
					console.log(err);
				}
				// console.log(result);
			})

		});	

}


var getProduct = function(_collection, callback){

        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find().toArray(function(err, pro){
                	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
    					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
   						//  response.send(docs);
                    callback(pro);
                });
            }
        });

};
// var getProByClass_orderprice = function(_collection, classify, sortname, sortorder, callback){

//         db.collection(_collection, function(error, collection){
//             if(error){
//                 console.log(error)
//             } else {
//                 collection.find({"classify":classify}).sort({sortname:sortorder}).toArray(function(err, pro){
//                 	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
//     					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
//    						//  response.send(docs);
//                     callback(pro);
//                 });
//             }
//         });

// };
// var getProByClass_ordersales = function(_collection, typename, callback){

//         db.collection(_collection, function(error, collection){
//             if(error){
//                 console.log(error)
//             } else {
//                 collection.find({"classify":typename}).sort({"sales":-1}).toArray(function(err, pro){
//                 	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
//     					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
//    						//  response.send(docs);
//                     callback(pro);
//                 });
//             }
//         });

// };

var getProByClass = function(_collection, typename, callback){

        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find({"classify":typename}).toArray(function(err, pro){
                	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
    					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
   						//  response.send(docs);
                    callback(pro);
                });
            }
        });

};
exports.exists = exists;
exports.save = save;
exports.del = del;
exports.extract = extract;
exports.existsSingle = existsSingle;
exports.delByProductsObj = delByProductsObj;
exports.updateProducts = updateProducts;
exports.getProductFilter = getProductFilter;

exports.getProByClass = getProByClass;
exports.getProduct = getProduct;
// exports.getProByClass_orderprice=getProByClass_orderprice;
// exports.getProByClass_ordersales=getProByClass_ordersales;

