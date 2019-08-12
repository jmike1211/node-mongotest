var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var version = require('../config/version');
//var crypto = require('../../../homework/firstclass');

var selVer = version(process.argv[3])

module.exports = {
    TopAccount: function TopAccount(req, res, next){
        req.app.locals.collection.find({}).limit(5).toArray().then(response => {res.status(200).json(response)}).catch(error => console.error(error));
    },
    
    createaccount: function createaccount(req,res,next){
        var jsondata = req.body
        console.log(jsondata)
        req.app.locals.collection.insertOne(jsondata).then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },

    mcreateaccount: function mcreateaccount(req,res,next){
        var jsondata = req.body
        console.log(jsondata)
        req.app.locals.collection.insertMany(jsondata).then(response => {res.status(200).json(response)}).catch(error => console.error(error));
    },

    readaccount: function readaccount(req,res,next){
        var jsondata = req.body
        console.log("body:::",req.body)
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }

        req.app.locals.collection.find(jsondata).toArray().then(response => {res.status(200).json(response)}).catch(error => console.error(error));
    },

    freadaccount: function freadaccount(req,res,next){
        //var jsondata = req.body
        //console.log("body:::",req.body)
        if (req.query.searchword != undefined){
            var jsondata = JSON.parse(req.query.searchword)
            console.log("body:::",jsondata)
        }
	else{
            var jsondata = req.body
            console.log("body:::",req.body)
	}
	console.log("params:::",req.params.aaaaa)
        var jarray = []
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        for (var key in jsondata){
            var temp = {} 
            jsondata[key] = {$regex: new RegExp(jsondata[key])}
            temp[key] = jsondata[key]
            jarray.push(temp)
        }

        req.app.locals.collection.find({$or :jarray}).limit(10).toArray().then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },

    /*freadaccount1: function freadaccount1(req,res,next){
        console.log("body:::",req.body)
        if (req.params.searchword != undefined){
            var jsondata = JSON.parse(req.params.searchword)
        }
        var jarray = []
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        for (var key in jsondata){
            var temp = {}
            jsondata[key] = {$regex: new RegExp(jsondata[key])}
            temp[key] = jsondata[key]
            jarray.push(temp)
        }

        req.app.locals.collection.find({$or :jarray}).limit(10).toArray().then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },*/

    updateaccount: function updateaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        var updatedata = {$set:jsondata}
        console.log(updatedata)
        //第一個參數是要更新的條件，第二個參數$set:更新的欄位及內容.
        //第三個參數writeConcern，第四個參數執行update後的callback函式

        req.app.locals.collection.update(updatedata).then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },

    upsertaccount: function upsertaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        var updatedata = {$set:jsondata}
        //var updatedata = jsondata
        console.log(updatedata)
        //第一個參數是要更新的條件，第二個參數$set:更新的欄位及內容.
        //第三個參數writeConcern，第四個參數執行update後的callback函式

        req.app.locals.collection.updateOne(jsondata,updatedata,{upsert: true, safe: false}).then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },


    mupsertaccount: function mupsertaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        var updatedata = {$set:jsondata}
        //var updatedata = jsondata
        console.log(updatedata)
        //第一個參數是要更新的條件，第二個參數$set:更新的欄位及內容.
        //第三個參數writeConcern，第四個參數執行update後的callback函式

        req.app.locals.collection.updateMany(jsondata,updatedata,{upsert: true, safe: false}).then(response => {res.status(200).json(response)}).catch(error => console.error(error));

    },

    deleteaccount: function deleteaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }

        req.app.locals.collection.remove(jsondata, {w:1}).then(response => {res.status(200).json(response)}).catch(error => console.error(error));
    },

    /*
	createaccount: function createaccount(req,res,next){
        var jsondata = req.body
        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);
        console.log(timestamp)
        jsondata["timestamp"] = timestamp
		jsondata["status"] = false
		MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
			console.log('mongodb is running!');
    		var myDB = db.db(selVer["dbname"])
    		myDB.collection(selVer["dbcollection"],function(err,collection){
				console.log("mongodb insert!")
				collection.insertOne(jsondata) 
				if (err) throw err;
				res.send(jsondata)
			})
			db.close(); //關閉連線
		})
	},

    mcreateaccount: function mcreateaccount(req,res,next){
        jsondata["status"] = false
        var jsondata = req.body
        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);
        console.log(timestamp)
        jsondata["timestamp"] = timestamp
        console.log(jsondata)
        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!');
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
                console.log("mongodb insert!")
                collection.insertMany(jsondata)
                if (err) throw err;
                res.send(jsondata)
            })
            db.close(); //關閉連線
        })
    },

	readaccount: function readaccount(req,res,next){
		var jsondata = req.body
		console.log("body:::",req.body)
		if(req.body._id != undefined){
			jsondata["_id"] =new ObjectId(jsondata["_id"])
		}
        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!');
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
        		collection.find(jsondata).toArray(function(err,items){	
					console.log("mongodb read!")
            		if(err) throw err;
            		console.log(items);
                	res.send(items)
				})
            })
			db.close(); //關閉連線
        })	
	},

    freadaccount: function freadaccount(req,res,next){
        var jsondata = req.body
        console.log("body:::",req.body)
        var jarray = []
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        for (var key in jsondata){
            var temp = {} 
            jsondata[key] = {$regex: new RegExp(jsondata[key])}
            temp[key] = jsondata[key]
            jarray.push(temp)
        }
        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!');
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
                collection.find({$or :jarray}).limit(10).toArray(function(err,items){
                    console.log("mongodb read!")
                    if(err) throw err;
                    console.log(items);
                    res.send(items)
                })
            })
            db.close(); //關閉連線
        })
    },

    updateaccount: function updateaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
		var updatedata = {$set:jsondata}
		console.log(updatedata)
        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!')
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
   				console.log(jsondata["type"])
				//第一個參數是要更新的條件，第二個參數$set:更新的欄位及內容.
   				//第三個參數writeConcern，第四個參數執行update後的callback函式
                collection.update(jsondata,{ upsert : true }, function(err,result){
                    console.log("mongodb update!")
                    if(err) throw err;
                    console.log(result);
                    res.send(result)
                })
            })
            db.close(); //關閉連線
        })              
    },

    deleteaccount: function deleteaccount(req,res,next){
        var jsondata = req.body
        if(req.body._id != undefined){
            jsondata["_id"] =new ObjectId(jsondata["_id"])
        }
        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!');
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
                collection.remove(jsondata, {w:1}, function(err,result){
                    console.log("mongodb delete!")
                    if(err) throw err;
                    console.log(result);
                    res.send(result)
                })
            })
            db.close(); //關閉連線
        })              
    },*/
}

