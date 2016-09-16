service template for postio
===


* 更新配置		

endpoint: {settings.conf.uri}
method: POST
body:
		AES(JSON.Stringify({
			appid: 'xxxx',
			conf: {
				... 
			}
		}))

* 处理请求
endpoint: URI (defined in main)
method: POST
body:

		AES(JSON.Stringify({
			appid: 'xxxx'
		}))

return: JSON

test:

	curl -H "Content-Type: application/json" -X POST -d '8bac54aae564669d65dea7a8c3a33988df0c70cc3242aa2029773551d3b2' http://localhost:3006/conf/update


data sync:  
endpoint:  { settings.sync.notify.uri } + '/data/' + {appid} + '/' + {collection_name} + '/' + {hash}
method: POST
param: 
	- appid: appid 
	- collection_name: data collection name 
	- hash: md5(JSON.stringify(data) + settings.data.sync.key)


test:

	curl -H "Content-Type: application/json" -X POST -d '{"appid":"foo"}' http://localhost:3006/form/foo | python -m json.tool



