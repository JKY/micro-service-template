const settings = require('../setting').settings;
const AUTH = reqiure('../../lib/postio/auth').METHOD;

/** service interface **/
module.exports = {
	conf: {
		/** 
		 * update config 
		 * @data: json object
		 * @callback: callback function
		 **/
		update: function(data,callback){
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
				//TODO
				callback(err,null,null);
			}
		}
	]
}