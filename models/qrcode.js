var QRCode = require('qrcode')

//var st = "ethereum:0x8bCa347136fCDcB68018F1F526AB8877fb76F0Aa?contractAddress=0x960b236a07cf122663c4303350609a66a7b288c0&decimal=18&value=0"
module.exports = {
    makeqrcode: function makeqrcode(req, res, next) {
		QRCode.toDataURL(req.params.someString, function (err, url) {
        	console.log(url)
			res.send(url)
   	    })
    },
    makeqrcode2: function makeqrcode2(req, res, next) {
		// 容錯率 L &lt; M &lt; Q &lt; H
		var opts = {
    		errorCorrectionLevel: 'H',
    		version: 2,
    		color: {
        		dark: '#00F',
        		light: '#0000'
    		}
		};
		path = "/home/bigsizemike/"+req.params.someString+".png"
        QRCode.toFile(path, req.params.someString, opts, function (err, url) {
            if(err) throw err;
            res.sendfile(path, function(err) {
            	if (err) res.send(404);
        	});
        })
    }

}
/*
QRCode.toDataURL(st, function (err, url) {
        console.log(url)
})*/
