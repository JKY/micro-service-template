service template for postio
===


* 更新配置		

endpoint: {settings.conf.uri}
method: POST
body:
		AES(JSON.Stringify({
			appid: 'xxxx'
		}))

* 处理请求
endpoint: URI (defined in main)
method: POST
body:

		AES(JSON.Stringify({
			appid: 'xxxx'
		}))

return: JSON
 
data sync:  
endpoint:  { settings.sync.notify.uri } + '/data/' + {appid} + '/' + {collection_name} + '/' + {hash}
method: POST
param: 
	- appid: appid 
	- collection_name: data collection name 
	- hash: md5(JSON.stringify(data) + settings.data.sync.key)





