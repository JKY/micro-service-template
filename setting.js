module.exports =  {
	name: 'service template',
	debug:false,
	/* change this port to your services */
	port: 3006,
	mongo : {
		host:"localhost",
		port: 27017,
		dbname: "wechat_api",
		serveropt: {
			'auto_reconnect':true,
			 poolSize:5
		},

		dbopt : {
			w:-1
		}
	},

	/* config settings */
	conf: {
		uri: '/conf/update',
		key: '123456'
	},

	/* data notification config */
	data: {
		sync: {
			uri: 'http://tap.postio.me',
			key: '*********'
		}
	}
}