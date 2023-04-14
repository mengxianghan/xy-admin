# 构建和发布

## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

实际项目会部署多个环境，`XYAdmin` 中内置了 `test` `pre` `prod` 三种场景的打包方式和对应的环境变量。

### test 环境

```shell {:no-line-numbers}
npm run build:test
```

### pre 环境

```shell {:no-line-numbers}
npm run build:pre
```

### prod 环境

```shell {:no-line-numbers}
npm run build:prod
```

构建打包成功之后，会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `*.js`、`*.css`、`index.html` 等静态文件，也包括了项目根的 `public/` 下的所有文件

如果需要自定义构建，比如指定 `dist` 目录等，可以通过 `/vite.config.js` 进行配置，详情参看：[vite 配置](https://cn.vitejs.dev/config/)。

## 使用 nginx

nginx 作为最流行的 web 容器之一，配置和使用相当简单，只要简单的配置就能拥有高性能和高可用。推荐使用 nginx 托管。示例配置如下：

```
server {
    listen 80;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;

    location / {
        # 用于配合 browserHistory 使用
        try_files $uri $uri/ /index.html;

        # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验 
        # rewrite ^/(.*)$ https://preview.pro.loacg.com/$1 permanent;

    }
    location /api {
        proxy_pass https://preview.pro.loacg.com;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
    }
}
server {
  # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验 
  listen 443 ssl http2 default_server;

  # 证书的公私钥
  ssl_certificate /path/to/public.crt;
  ssl_certificate_key /path/to/private.key;

  location / {
        # 用于配合 browserHistory 使用
        try_files $uri $uri/ /index.html;

  }
  location /api {
      proxy_pass https://preview.pro.loacg.com;
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_set_header   Host              $http_host;
      proxy_set_header   X-Real-IP         $remote_addr;
  }
}
```

关于路由更多可以参看 [Vue-Router 文档](https://router.vuejs.org/) 。