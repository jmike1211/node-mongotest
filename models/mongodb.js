var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var version = require('../config/version');
var crypto = require('../../../homework/firstclass');

var selVer = version(process.argv[3])

module.exports = {
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

	readaccount: function readaccount(req,res,next){
		var jsondata = req.body
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
                collection.updateOne({"_id":jsondata["_id"]},updatedata,{w:1}, function(err,result){
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
    },

	register: function register(){
		
	},
	
	activate: function activate(req,res,next){
		var useremail = req.body.email
		//var userPword = req.body.password
		var usertime = req.body.timestamp
		var plaintext = useremail+usertime

		console.log("plaintext:"+plaintext)
		var jsondata ={}
		jsondata["email"] = req.body.email
		//jsondata["timestamp"] = req.body.timestamp
		console.log(jsondata)

        MongoClient.connect(selVer["mongodb"],{useNewUrlParser : true},function(err, db){
            console.log('mongodb is running!');
            var myDB = db.db(selVer["dbname"])
            myDB.collection(selVer["dbcollection"],function(err,collection){
                collection.find(jsondata).toArray(function(err,items){
                    console.log("mongodb read!")
                    if(err) throw err;
                    console.log(items[0]["password"]);
        			
					var crypt = crypto.hmacSHA512(plaintext,items[0]["password"])    
        			console.log("crypt:"+crypt) 
                    res.send(items)
                })
            })
            db.close(); //關閉連線
        })
		//var crypt = crypto.hmacSHA512(plaintext,userPword)	
		//console.log("crypt:"+crypt)		
	}
}

