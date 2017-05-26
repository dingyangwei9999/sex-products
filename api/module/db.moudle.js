var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('sex', server);

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


// 修改
var alter = function(_collection,data,arr,key,callback){
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
			console.log({[key]:data[key]},{$set:obj});
			// console.log({$set:obj})

            collection.update({},{$set:obj },function(err,result){
            // console.log(result);
            // {$set:{number:3}}
            
            })
        });

		db.close();
	})
}


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

exports.exists = exists;
exports.save = save;
exports.del = del;
exports.extract = extract;
exports.alter = alter;



 