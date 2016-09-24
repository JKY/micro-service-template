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

require('./app/main').main(app);
if (!module.parent) {
  app.listen(settings.port);
  console.log((settings.name + ' runnng port:' + settings.port).green);
}

