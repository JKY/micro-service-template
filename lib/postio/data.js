const settings =  require('../../setting').settings;
const crypto = require('./crypto');

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
    sync: function(appid, dataname, key, data, callback) {
        var body = JSON.stringify(data);
        var hash = crypto.md5(body, key);
        var uri = settings.sync.notify.uri + '/data/' + appid + '/' + dataname + '/' + hash;
        console.log("data >> :" + uri);
        request({
            'url': uri,
            'method': 'POST',
            'body': body
        }, function(err, response, body) {
            if (!err && response) {
                //console.log(q.url + ' ' + response['statusCode']);
                if (!err && response && response['statusCode'] == 200) {
                    console.log('data notification seccuess');
                    console.log(body);
                    callback(null, null);
                } else {
                    callback(err, null);
                }
            } else {
                callback(err, null);
            }
        });
    }
};