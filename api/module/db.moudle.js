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
            	console.log('obj:',obj);
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
			db.close();
		})
	})
};

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
		obj.keyword = arr;
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
var getProByClass = function(_collection, typename, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
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
        db.close();
	})	
};
var getProduct = function(_collection, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
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
        db.close();
	})	
};
var getProByClass_orderprice = function(_collection, typename, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find({"classify":typename}).sort({"price":1}).toArray(function(err, pro){
                	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
    					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
   						//  response.send(docs);
                    callback(pro);
                });
            }
        });
        db.close();
	})	
};
var getProByClass_ordersales = function(_collection, typename, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find({"classify":typename}).sort({"sales":-1}).toArray(function(err, pro){
                	    // var reg = new RegExp("^.*"+keyword+"\.*$","i");
    					// collection.find({name:{$regex:reg}}).toArray(function(err, docs){
   						//  response.send(docs);
                    callback(pro);
                });
            }
        });
        db.close();
	})	
};


exports.exists = exists;
exports.save = save;
exports.existsSingle = existsSingle;

exports.getProByClass = getProByClass;
exports.getProduct = getProduct;
exports.getProByClass_orderprice=getProByClass_orderprice;
exports.getProByClass_ordersales=getProByClass_ordersales;