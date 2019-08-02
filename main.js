var express = require('express');
var config = require('./config/default');
var routes = require('./routes');
var cluster = require('cluster');

var middle_error = require('./middle/error');
var middle_normal = require('./middle/normal');
var middle_verify = require('./middle/verify');
var version = require('./config/version');
var app = express();

const MongoClient = require('mongodb').MongoClient;

middle_normal(app)
//middle_verify(app)
routes(app);
middle_error(app);

var selVer = version(process.argv[3])
app.set('port', selVer["port"]);
console.log(selVer["dbcollection"])

var numCPUs = process.argv[2] || 2//require('os').cpus().length;

MongoClient.connect(selVer["mongodb"], { useNewUrlParser: true,poolSize: 10 })
    .then(client => {
        const sDAG_db = client.db(selVer["dbname"]);
        dbClient = client
        app.locals.collection = sDAG_db.collection(selVer["dbcollection"]);

		if (cluster.isMaster) {
			for (var i = 0; i < numCPUs; i++) {
				cluster.fork();
			}
			
			cluster.on('listening', (worker, address) => {
				console.log(selVer["port"],address);
			});
			
			cluster.on('exit', (worker, code, signal) => {
				console.log('worker ' + worker.process.pid + ' died');
				cluster.fork();
			});

		} else {
			app.listen(app.get('port'));
		}
    }).catch(error => console.error(error));

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

/*
if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	
	cluster.on('listening', (worker, address) => {
		console.log(selVer["port"],address);
	});
	
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker ' + worker.process.pid + ' died');
		cluster.fork();
	});

} else {
	app.listen(app.get('port'));
}
*/

