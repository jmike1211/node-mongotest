module.exports = function (app) {
	app.use('/casigo', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		console.info({time:Date.now(),"status":"0","code":"0",url:req.url})
		next()
	})
}
