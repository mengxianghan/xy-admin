<div align="center">

![logo](https://1056811341.gitee.io/xy-admin-doc/images/logo.png)

<h1>XYAdmin</h1>

</div>

## 介绍

XYAdmin 是一个中后台前端解决方案，基于VUE3和and-design-vue实现。 使用最新的前端技术栈，提供丰富的组件，并持续性提供丰富的业务模板快速搭建企业级中后台前端项目。

## 预览

[演示地址1（github）](https://mengxianghan.github.io/xy-admin-doc)  
[演示地址2（gitee）](https://1056811341.gitee.io/xy-admin-doc)

## 配置

### MOCK

VUE_APP_MOCK=true/false

### 权限和路由

#### 配置

VUE_APP_PERMISSION=true/false

#### 完整的路由结构

```json
{
  "path": "必填，路径，允许填写 http://",
  "name": "必填，路由名称，唯一",
  "component": "必填，页面",
  "redirect": "选填，跳转地址",
  "meta": {
    "type": "菜单类型【link=外部链接，iframe=iframe】",
    "icon": "选填，菜单icon",
    "title": "必填，菜单名称",
    "isMenu": "必填，boolean类型，是否在菜单上显示，true=显示；false=不显示",
    "keepAlive": "必填，boolean类型，是否缓存页面，true=缓存；false=不缓存",
    "target": "选填，页面打开方式，_blank=新标签页打开",
    "layout": "选填，默认 DefaultLayout， 不使用模板填写 false",
    "active": "选填，打开页面要选中的菜单，填写要选中菜单的 name",
    "permission": [
      "选填，根据业务需要"
    ],
    "action": [
      "选填，根据业务需要"
    ],
    "url": "iframe url"
  },
  "children": []
}
```

## 运行

### 安装依赖

```text
npm install
or
npm install --registry https://registry.npm.taobao.org
```

### 本地运行

```shell
npm run serve
```

## 打包

### 开发环境

```shell
npm run build:dev
```

### 测试环境

```shell
npm run build:test
```

### 预生产环境

```shell
npm run build:pre
```

### 生产环境

```shell
npm run build:prod
```

### 性能分析

```shell
npm run build:report
```

## 发布

- 安装依赖
- 代码打包（针对要发布的环境进行打包，打包后的文件存放在 dist 目录下）
- 复制 dist 目录下代码进行发布

### nginx 配置

```
location /api/ {
    rewrite /api/(.*?)$ /$1 break;
    proxy_pass https://域名;
}
```

