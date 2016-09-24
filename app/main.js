const settings = require('../setting');
const AUTH = require('../lib/postio/auth').METHOD;
const data = require('../lib/postio/data').data;
const out = require('../lib/postio/util').out;
const crypto = require('../lib/postio/crypto');

/** service interface **/
var service = exports.service = {
	conf: {
		/** 
		 * update config 
		 * @data: json object
		 * @callback: callback function
		 **/
		update: function(appid,data,callback){
			console.log('----- conf update received ------');
			console.log(data);
			// TODO 
			/** 
			 * callback
			 * @err: error object or null
			 * @result: result or null
			 **/
			callback(null,null);
		}
	},

	/** 
	 * request handlers 
	 */
	handler:[ 
		{
			path: '/form/data',
			authrizer: AUTH.base,
			/** 
			 * process
			 */
			process: function(o,callback){
				console.log('/form/data')
				console.log(o);
				//TODO
				callback(null,null,null);
			}
		}
	]
};


var main = exports.main = function (app) {
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
	            service.conf.update(o['appid'],o['conf'],function(err,result){
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
	service.handler.forEach(function(handler){
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
	        	handler['process'](o,function(err,result,sync){
					out.json(resp,200,{
						'err': err,
						'result': result
					});
					if(sync){
						data.sync(o['appid'],
								  sync['collection_name'],
								  settings.data.sync['key'],
								  sync['data'],function(err,result){
								  		console.log('data sync with err=' + err);
								  		console.log(result);
						});
					}
				});
	        });
		});
	});
}