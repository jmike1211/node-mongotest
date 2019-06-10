var version = require('../config/version.js');

//var x = {development: Object.assign({"777":"777"},{"123":"456"},{"444":"555"}),
//			production: Object.assign({"7":"177"},{"123":"56"},{"44":"55"})}[process.argv[2] || 'development']

var x = version(process.argv[2])
console.log(x["a"])
