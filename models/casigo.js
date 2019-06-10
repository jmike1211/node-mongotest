module.exports = {
	casigo: function (req, res, next){
		res.send("casigo!")
	},
	
	casigoErr: function (req, res, next){
		"123".string()
		res.send("casigo!")
	}
}
