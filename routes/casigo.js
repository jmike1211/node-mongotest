var express = require('express');
var casigo = require('../models/casigo');
var contract = require('../models/contract');
var qrcode = require('../models/qrcode')
var mongo = require('../models/mongodb')

//var verify = require('../models/verify')
var router = express.Router();


router.get('/', casigo.casigo);
router.get('/err', casigo.casigoErr);

router.get('/account',qrcode.makeqrcode)
router.post('/contract',contract.contract)

router.get('/qrcode/:someString',qrcode.makeqrcode)
router.get('/qrcode2/:someString',qrcode.makeqrcode2)

router.post('/account/create',mongo.createaccount)
router.post('/account/read',mongo.readaccount)
router.post('/account/update',mongo.updateaccount)
router.post('/account/delete',mongo.deleteaccount)

router.post('/account/multicreate',mongo.mcreateaccount)
router.post('/account/fizzyread',mongo.freadaccount)
router.post('/account/TopAccount',mongo.TopAccount)

router.post('/account/upsert',mongo.upsertaccount)
//router.post('/account/register',mongo.register)
//router.post('/account/activate',mongo.activate)
//router.post('verify',verify.verify)

module.exports = router;
