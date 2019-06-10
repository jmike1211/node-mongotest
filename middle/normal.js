module.exports = function (app) {
	app.use('/casigo', function (req, res, next) {
		console.info({time:Date.now(),"status":"0","code":"0",url:req.url})
		next()
	})
}
