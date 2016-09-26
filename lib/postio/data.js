const settings =  require('../../setting');
const crypto = require('./crypto');
const request = require('request');
const colors = require('colors');

/**
 * 服务产生的数据可以推送到 postio, 使用 postio 提供的
 * 界面进行管理
 */
exports.data = {
    /**
     * 推送数据到 postio
     * 将对象保存为 json 字符串, 使用 md5 签名后
     * POST 到
     * uri/data/{APPID}/{DATANAME}/{HASH}
     */
    sync: function(appid, name, key, data, callback) {
        var body = JSON.stringify(data);
        var hash = crypto.md5(body, key);
        var uri = settings.data.sync.uri + '/data/' + appid + '/' + name + '/' + hash;
        request({
            'url': uri,
            'method': 'POST',
            'body': body
        }, function(err, response, body) {
            if (!err && response) {
                if (!err && response && response['statusCode'] == 200) {
                    try{
                        var o = JSON.parse(body);
                        callback(o['err'], null);
                    }catch(e){
                        callback('json parse error', null);
                    }
                } else {
                    console.log('==== data notification error ====');
                    console.log(err);
                    callback(err, null);
                }
            } else {
                console.log('==== data notification exception ====');
                console.log(err);
                callback(err, null);
            }
        });
    }
};