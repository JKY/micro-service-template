var express = require('express'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    settings = require('../setting'),
    expect = require('chai').expect,
    assert = require('chai').assert,
    request = require('supertest'),
    service = require('../app/main'),
    crypto = require('../lib/postio/crypto'),
    fs = require('fs');


describe(settings.name, function() {
    /** 模拟前端 http 请求 **/
    var mock = null;
    before(function(done) {
         /// mock express 
        var app = express();
        service.main(app);
        mock = app.listen(2998);
        done();
    });


    after(function(done) {
        mock.close();
        done();
    });


    it('配置', function(done) {
        var body = JSON.stringify({
            appid: 'foo',
            conf: {
                a: 1
            }
        });
        var data = crypto.aes.encode(body,settings.conf.key);
        request(mock)
            .post(settings.conf.uri)
            .send(data)
            .expect(200)
            .end(function(err, res) {
                if (err)
                    return done(err);
                assert.equal(res['body']['err'], null);
                done();
            });
    });


    it('接口', function(done) {
        service['service']['handler'].forEach( function(endpoint) {
            var data = JSON.stringify({
                 foo:1
            });
            request(mock)
                .post(endpoint['path'])
                .send(data)
                .expect(200)
                .end(function(err, res) {
                   
                });
        });
        done();
    });
});
