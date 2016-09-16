/**
 * Module dependencies.
 */
var express = require('express'),
	settings = require('./setting').settings,
	data = require('./lib/postio/data').data,
	out = require('./lib/postio/util').out,
	crypto = require('./lib/postio/crypto'),
	parse_form = require('./lib/postio/util').parse_form,
	auth = require('./lib/postio/auth'),
	color = require('colors');


/* authorizer config */
var app = module.exports = express();
app.enable('trust proxy');
/* authorize */
var authorizer = new auth.authorizer();
app.use(function(req,resp,next){
	authorizer.passed(req,function(pass){
		if(pass){
			//sys.debug(req.url.green);
			next();
		}else{
			// sys.debug(req.url.red);
			util.out.error(resp, 'authorized fail...');
		}
	});
});


var svr = require('./app/main');
/**
 * update service configuration
 */
app.post(settings.conf.uri,function(req,resp){
	var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var data = crypto.aes.decode(body, settings.conf.key);
        try {
            var o = JSON.parse(data);
            svr.conf.update(o['appid'],o['conf'],function(err,result){
				out.json(resp,200,{
					'err':err,
					'result': result
				});
			});
        } catch (error) {
        	out.err(resp,500,{
        			'err':error
        	});
        }
    });
});


/** service handlers **/
svr.handler.forEach(function(handler){
	app.post(handler['path'],function(req,resp){
		var body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
        	try{
        		var o = JSON.parse(body);
        		
        	}catch(e){
        		out.err(resp,500,{
        			'err':e.toString()
        		});
        		return;
        	};
        	handler['process'](o,function(err,result,sync_data){
				out.json(resp,200,{
					'err': err,
					'result': result
				});
				if(sync_data){
					data.sync(o['appid'],
							  sync_data['collection_name'],
							  settings.data.sync['key'],
							  sync_data['data'],function(err,result){
							  		console.log('data sync with err=' + err);
							  		console.log(result);
					});
				}
			});
        });
	});
});


if (!module.parent) {
  app.listen(settings.port);
  console.log((settings.name + ' runnng port:' + settings.port).green);
}

