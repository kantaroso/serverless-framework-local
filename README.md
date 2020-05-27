
## 参考

### serverless
* https://www.npmjs.com/package/serverless-offline
* https://dev.classmethod.jp/articles/easy-deploy-of-lambda-with-serverless-framework/
* https://qiita.com/noralife/items/e36621ddd0e5b8ff4447

### dynamodb
* https://qiita.com/okashoi/items/f1c757279574d37b812e
* https://github.com/aaronshaf/dynamodb-admin

## 初期構築手順

* serverless
```shell
$ docker exec -it serverless-framework-node /bin/sh
$ sls create -t aws-nodejs -p serverless-counter -n serverless-counter
$ cd serverless-counter
$ vi serverless.yml
# service: serverless-counter の下に以下を追記
plugins:
 - serverless-offline
$ npm install aws-sdk ioredis
$ npm install --save-dev serverless-offline
```

* dynamodb
```
http://localhost:8001/
```

## 動作確認

* offline起動
```shell
$ sh sls_start.sh
```

* アクセス
```shell
# 両方hostから
# ブラウザ
$ open http://localhost:8082/dev/counter

# コマンド
$ curl 'http://localhost:8082/dev/counter' -X GET
$ curl 'http://localhost:8082/dev/counter' -X POST
```


## メモ

* `dynamodb` 難しいので cache で代用

* `dynamodb local` なんか起動しないので諦める

```
/var/app/serverless-counter # SLS_DEBUG=* sls dynamodb start
Serverless: Load command interactiveCli
Serverless: Load command config
Serverless: Load command config:credentials
Serverless: Load command config:tabcompletion
Serverless: Load command config:tabcompletion:install
Serverless: Load command config:tabcompletion:uninstall
Serverless: Load command create
Serverless: Load command install
Serverless: Load command package
Serverless: Load command deploy
Serverless: Load command deploy:function
Serverless: Load command deploy:list
Serverless: Load command deploy:list:functions
Serverless: Load command invoke
Serverless: Load command invoke:local
Serverless: Load command info
Serverless: Load command logs
Serverless: Load command metrics
Serverless: Load command print
Serverless: Load command remove
Serverless: Load command rollback
Serverless: Load command rollback:function
Serverless: Load command slstats
Serverless: Load command plugin
Serverless: Load command plugin
Serverless: Load command plugin:install
Serverless: Load command plugin
Serverless: Load command plugin:uninstall
Serverless: Load command plugin
Serverless: Load command plugin:list
Serverless: Load command plugin
Serverless: Load command plugin:search
Serverless: Load command config
Serverless: Load command config:credentials
Serverless: Load command rollback
Serverless: Load command rollback:function
Serverless: Load command upgrade
Serverless: Load command uninstall
Serverless: Load command dynamodb
Serverless: Load command dynamodb:migrate
Serverless: Load command dynamodb:seed
Serverless: Load command dynamodb:start
Serverless: Load command dynamodb:noStart
Serverless: Load command dynamodb:remove
Serverless: Load command dynamodb:install
Serverless: Load command offline
Serverless: Load command offline:start
Serverless: Load command login
Serverless: Load command logout
Serverless: Load command generate-event
Serverless: Load command test
Serverless: Load command dashboard
Serverless: Load command output
Serverless: Load command output:get
Serverless: Load command output:list
Serverless: Load command param
Serverless: Load command param:get
Serverless: Load command param:list
Serverless: Load command studio
Serverless: Load command dev
Serverless: Invoke dynamodb:start

  Error --------------------------------------------------

  Error: Unable to start DynamoDB Local process!
      at Object.start (/var/app/serverless-counter/node_modules/dynamodb-localhost/dynamodb/starter.js:45:19)
      at Object.start (/var/app/serverless-counter/node_modules/dynamodb-localhost/index.js:20:32)
      at ServerlessDynamodbLocal.startHandler (/var/app/serverless-counter/node_modules/serverless-dynamodb-local/index.js:191:25)
      at /usr/local/lib/node_modules/serverless/lib/classes/PluginManager.js:490:55
  From previous event:
      at PluginManager.invoke (/usr/local/lib/node_modules/serverless/lib/classes/PluginManager.js:490:22)
      at /usr/local/lib/node_modules/serverless/lib/classes/PluginManager.js:525:24
  From previous event:
      at PluginManager.run (/usr/local/lib/node_modules/serverless/lib/classes/PluginManager.js:525:8)
      at /usr/local/lib/node_modules/serverless/lib/Serverless.js:133:33
  From previous event:
      at Serverless.run (/usr/local/lib/node_modules/serverless/lib/Serverless.js:120:74)
      at /usr/local/lib/node_modules/serverless/bin/serverless.js:80:26
      at processImmediate (internal/timers.js:456:21)
      at process.topLevelDomainCallback (domain.js:137:15)
  From previous event:
      at Object.<anonymous> (/usr/local/lib/node_modules/serverless/bin/serverless.js:80:4)
      at Module._compile (internal/modules/cjs/loader.js:1133:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)
      at Module.load (internal/modules/cjs/loader.js:977:32)
      at Function.Module._load (internal/modules/cjs/loader.js:877:14)
      at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)
      at internal/main/run_main_module.js:18:47

  Get Support --------------------------------------------
     Docs:          docs.serverless.com
     Bugs:          github.com/serverless/serverless/issues
     Issues:        forum.serverless.com

  Your Environment Information ---------------------------
     Operating System:          linux
     Node Version:              12.16.3
     Framework Version:         1.71.3
     Plugin Version:            3.6.12
     SDK Version:               2.3.0
     Components Version:        2.30.11


  Error --------------------------------------------------

  Error: spawn java ENOENT
      at Process.ChildProcess._handle.onexit (internal/child_process.js:267:19)
      at onErrorNT (internal/child_process.js:469:16)
      at processTicksAndRejections (internal/process/task_queues.js:84:21)

  Get Support --------------------------------------------
     Docs:          docs.serverless.com
     Bugs:          github.com/serverless/serverless/issues
     Issues:        forum.serverless.com

  Your Environment Information ---------------------------
     Operating System:          linux
     Node Version:              12.16.3
     Framework Version:         1.71.3
     Plugin Version:            3.6.12
     SDK Version:               2.3.0
     Components Version:        2.30.11
```
