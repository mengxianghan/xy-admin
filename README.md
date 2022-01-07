# 后台模板

## 配置

### MOCK
VUE_APP_MOCK=true/false

### 权限和路由

#### 配置
VUE_APP_PERMISSION=true/false

#### 完整的路由结构
```json
{
  "path": "必填，路径，允许填写http://",
  "name": "必填，路由名称，唯一",
  "component": "必填，页面",
  "redirect": "选填，跳转地址",
  "meta": {
    "type": "菜单类型【link=链接，iframe=iframe】",
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
    "iframeUrl": "内嵌 iframe 时，component 需指向 iframe 的视图，即：views/iframe/index.vue"
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

