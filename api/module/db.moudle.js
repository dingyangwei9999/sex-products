var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('sex-products', server);

var exists = function(_collection, data, arr, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
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
        db.close();
		
	})	
};

var save = function(_collection, data){

	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.insert(data);
			}
			
		})
		db.close();
	})
};


//查询商品分类classify和keyword
var existsSingle = function(_collection, data, arr, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
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
        db.close();
		
	})	
};

//删除直接通过商品完整信息
var delByProductsObj = function(_collection,data,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）


		db.collection(_collection,function(err,collection){
			collection.remove(data,function(err,result){
				// console.log(result);
			})

		});	
		db.close();
	})
}



// 删除
var del = function(_collection,data,arr,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
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
		

		db.close();
	})
	
};


// 提取
var extract = function(_collection,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		
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
        db.close();
		
	})	
}

//更新商品信息
var updateProducts = function(_collection,data,needUpdata){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}

		db.collection(_collection,function(err,collection){
			collection.update(data,{$set:needUpdata},function(err,result){
				if(err){
					console.log(err);
				}
				// console.log(result);
			})

		});	
		db.close();
	})
}

exports.exists = exists;
exports.save = save;
exports.del = del;
exports.extract = extract;
exports.existsSingle = existsSingle;
exports.delByProductsObj = delByProductsObj;
exports.updateProducts = updateProducts;



 