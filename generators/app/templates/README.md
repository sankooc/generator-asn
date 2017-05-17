# <%= appname %>


### 准备

* webpack
* webpack-dev-server

### 配置

* 常量和系统设置 `config/default.json`
* 本地化配置 `config/lang.js`
* 路由配置 `config/router.js`
* 请求数据验证配置 `config/validator.js`

### 安装

```

$ npm install

```

### 开发环境

```

$ node server
$ npm run dev
$ open http://127.0.0.1:4000

```

### 后台服务开发环境

```

grunt serve

```


### 生产环境构建

server.port 默认为3001

```

$ npm run build
$ open http://127.0.0.1:<server.port>

```

### 启动服务

```

$ node server

```
