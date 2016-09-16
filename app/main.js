const settings = require('../setting').settings;
const AUTH = require('../lib/postio/auth').METHOD;

/** service interface **/
module.exports = {
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
		},

		{
			path: '/form/foo',
			authrizer: AUTH.base,
			/** 
			 * process
			 */
			process: function(o,callback){
				console.log('/form/foo')
				console.log(o);
				//TODO
				callback(null,null,null);
			}
		}
	]
}