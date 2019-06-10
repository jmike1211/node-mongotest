var Web3 = require('web3');
var web3 = new Web3();
var version = require('../config/version');
var selVer = version(process.argv[3])

web3.setProvider(new web3.providers.HttpProvider(selVer["nodeRpc"]));
var abi = require('./abi.json');
var config = require("./config.json")

var address = config.contract
var contract = new web3.eth.Contract(abi,address);

/*
function callfunction(...arg){
	var func = arg[0]
	var next = arg[arg.length-1]
	
	arg.pop()
	arg.shift()

	contract.methods[func](...arg).call(function(error, result){
		console.log(result);
		next(result)
	});
}*/

function callfunction(...arg){
        var func = arg[0]
        var next = arg[arg.length-1]
        var arc = arg[1]
        contract.methods[func](...arc).call(function(error, result){
                console.log(result);
                next(result)
        });
}

module.exports = {
	contract: function (req, res, next){
		var method = req.body.method
		var argv = req.body.contract  
		//var method = "balanceOf"
		//var argv = "0x46ffcdc6d8e6ed69f124d944bbfe0ac74f8fcf7f"
		callfunction(method, argv, function(result){res.send(result)})
	}
}

