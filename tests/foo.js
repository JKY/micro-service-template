const crypto = require('../lib/postio/crypto');
const color = require('colors');

var s = JSON.stringify({
	appid: 'foo',
	conf: {
		a: 1
	}
});
var key = '123456';
var data = crypto.aes.encode(s, key);
console.log(data);
console.log('--------');
console.log(crypto.aes.decode(data,key));
