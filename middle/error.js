
module.exports = function (app) {

	app.use(function (err, req, res, next) {
		var re = {}

		re["error"] = "500"
  		re["status"] = "5"
       	re["url"] = req.url
		re["time"] = Date.now()
		re["code"] = err.toString()

		console.error(re)
       	res.status(500).send(err)
	})

	app.use(function (req, res, next) {
       	console.error({
			"time":Date.now(),
			"error":"404",
			"status":"4",
			"code":"error router", 
			"url":req.url
		})
    	res.status(404).send({"error":"404","status":"4","code":"error router "+req.url});
	})
}
