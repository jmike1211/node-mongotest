var nodemailer = require('nodemailer');

module.exports = {
    mailTest: function mailTest(req, res, next) {
        console.log("start sene mail")
        console.log("req.body.to:",req.body.to)
        console.log("req.body.subject:",req.body.subject)
        console.log("req.body.text:",req.body.text)

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'testmaillaw@gmail.com',
                pass: 'ddrmgkigktarkfwp'
            }
        });
	console.log("server done")
        var options = {
	    //寄件者
	    from: 'testmaillaw@gmail.com',
	    //收件者
	    to: req.body.to, 
	    //副本
	    cc: req.body.cc,
	    //密件副本
	    bcc: req.body.bcc,
	    //主旨
	    subject: req.body.subject, // Subject line
	    //純文字
	    text: req.body.text, // plaintext body
        }
	console.log("option done")
        transporter.sendMail(options, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('訊息發送: ' + info.response);
                res.send(info.response)
            }
        });

    }
}
