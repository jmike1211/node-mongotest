const request = require('request')
const crypto = require('crypto')

let access_key = <Your Access Key>
let secret_key = <Your Secret Key>

// path 是請求路徑，例如/api/v2/members/me.json
// nonce 是以正整數表示的時間戳記，代表了從 Unix epoch 到當前時間所經過的毫秒數(ms)。
// nonce 與伺服器的時間差不得超過正負30秒，每個 nonce 只能使用一次。
// body 中其餘的參數請依據您的請求內容自行調整

let body = {
	path: '/api/v2/members/me.json',
	nonce: Date.now(),
	<Other parameters if needed...>
};

let payload = new Buffer(JSON.stringify(body)).toString('base64');
let signature = crypto.createHmac('sha256', secret_key).update(payload).digest('hex');

let options = {
	method: 'GET',
	headers: {
		'X-MAX-ACCESSKEY': access_key,
		'X-MAX-PAYLOAD': payload,
		'X-MAX-SIGNATURE': signature
	},
	uri: 'https://max-api.maicoin.com/api/v2/members/me.json',
	json: true,
	body: body
};

request(options, function(error, response, body) { ... });
