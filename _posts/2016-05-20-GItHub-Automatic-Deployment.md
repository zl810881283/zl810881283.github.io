---
layout: post
title: GitHub 自动部署
category: GitHub
tags: ["GitHub", "NodeJs"]
keywords: GitHub, NodeJs
---

**本文对任何提供 Webhook 的 git 仓库都适用**

{:.picture.bordered}
![github](/attachments/images/GItHub-Automatic-Deployment/github.jpg)

## Web 服务器代码

不废话，先上代码

```javascript
var http = require('http')
var createHandler = require('github-webhook-handler')

// 这里的 secret 保持和 GitHub 后台设置的一致
var handler = createHandler({ path: '/', secret: 'root' })


function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})
```

## 自动部署脚本

deploy.sh脚本负责进入项目的目录，然后利用git命令拉取最新的代码，还是直接贴代码:

```shell
 #!/bin/bash

WEB_PATH='/root/tools/'$1
WEB_USER='root'
WEB_USERGROUP='root'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "changing permissions..."
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo "Finished."
```

deploy.sh 会接受第一个参数当做项目名字，然后进入这个项目的目录执行git操作，这个参数是在deploy.js中根据hook返回的项目名字来的，代码应该比较容易懂，都是些简单的git命令。

如果是全新的项目，需要在你的服务器上先clone要部署的项目，然后修改WEB_PATH的值。


## 后台运行deploy.js

利用Linux提供的nohup命令，让deploy.js运行在后台

```shell
nohup node deploy.js > deploy.log &
```

## Github添加webhook

进入你需要自动部署的项目的 GitHub 地址，进入项目的设置页面，点击左侧的 `Webhooks & services`

{:.picture.bordered}
![webhook](/attachments/images/GItHub-Automatic-Deployment/webhook.jpg)

ok,It's all!easy?

<style type="text/css">
    .picture{
        text-align: center;
    }
    .picture.bordered img{

        box-shadow: 0 2px 10px 2px rgba(0,0,0,.2);
    }
</style>
