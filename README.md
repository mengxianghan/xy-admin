<div align="center">
<img src="https://mengxianghan.github.io/xy-admin/demo/images/logo.svg" alt="logo" height="80">

# XYAdmin
</div>

## 介绍

`XYAdmin` 是一个中后台前端解决方案，基于 `vue3.x` 和 `and-design-vue` 实现。 使用最新的前端技术栈，提供丰富的组件，并持续性提供丰富的业务模板快速搭建企业级中后台前端项目。

## 特点

**组件** 丰富的组件、业务模板快速制作页面  
**权限** 完整的鉴权体系和高精度权限控制  
**布局** 灵活布局方式，满足各种功能需求  
**API** 完善的 `API` 管理，多服务请求快速切换，内置 `MOCK` 模块  
**其他** 多功能视图标签、动态权限菜单、控制台组态化等等

## 目录结构
```text
project_name
├ .husky                 husky 配置目录
├ .vscode                vscode 配置目录（可忽略）
├ config                 框架配置文件，vite.config 中用到的插件
├ dist                   存放打包后文件（可忽略）
├ node_modules           安装的依赖（可忽略）
├ public                 存放静态资源，不会被打包直接输出到 dist 目录中
│  ├ images              不需要打包的图片（可存放到 oss）
│  ├ libs                非 npm 安装第三方插件（可存放到 oss）
├ src
│  ├ api                 接口
│  │  ├ modules          按功能模块区分的接口文件
│  │  │  ├ home.js
│  │  ├ index.js         统一导出 api
│  ├ assets              存放静态资源，例如：图标，与public不同的是这里的文件会被打包到代码中
│  ├ styles              样式
│  ├ hooks               钩子
│  ├ directives          指令
│  ├ enums               枚举
│  ├ components          公共组件
│  │  ├ common           组件的公共资源
│  │  │  ├ images 
│  │  │  ├ js 
│  │  │  ├ style 
│  │  ├ index.js          自动化引入所有组件，并统一导出
│  │  ├ icon.js           自定义图标统一导出
│  │  ├ Empty.vue         示例
│  │  ├ LoadMore.vue      示例
│  │  ├ SubmitBar.vue     示例
│  │  ├ Grid              示例
│  │  │  ├ Grid.vue       示例
│  │  │  ├ GridItem.vue   示例
│  ├ core                 核心文件
│  │  ├ permission.js      统一权限验证
│  │  ├ index.js          统一引入
│  ├ layouts              公共模板
│  ├ router               vue-router
│  │  ├ modules           按功能拆分的模块
│  │  │  ├ home.js
│  │  ├ index.js          自动化引入，并统导出
│  ├ store                状态管理
│  │  ├ modules           按功能拆分的模块
│  │  │  ├ app.js
│  │  │  ├ user.js
│  │  ├ index.js          导出所有配置
│  ├ utils                工具类
│  │  ├ request           接口请求类（目前使用的 axios ，可根据实际需求进行调整）
│  ├ views                视图
│  │  ├ product           示例，路由对应目录/文件
│  │  │  ├ components     示例，私有组件
│  │  │  ├ index.vue      示例
│  ├ App.vue 
│  ├ main.js              入口文件
├ .env.demo               演示站点配置文件（正式使用是可以删除） 
├ .env.dev                本地开发环境配置文件
├ .env.test               测试环境环境变量文件 
├ .env.prod               生产环境环境配置文件
├ .prettierignore         prettier 代码格式化忽略文件
├ .prettierrc             prettier 代码格式化规则配置文件
├ .eslintignore           eslint 忽略文件
├ .eslintrc.js            eslint 配置文件
├ lintstagedrc.js         lint-staged 配置文件
├ package.json
├ package-lock.json
├ README.md               描述文件，说明项目简要信息（项目说明、使用方式等） 
├ vite.config.js          vue 配置文件（vite 构建方式配置文件）
```

## 配置


### MOCK

`VITE_MOCK=true/false`

**接入正式接口前请按照步骤进行配置**
1. 删除 `src/core/index.js` 中下列代码
```js
import { setupMock } from '@/mock'

if ('true' === import.meta.env.VITE_MOCK) {
    setupMock()
}
```
2. 删除 `src/mock` 目录
3. 删除 `.env.*` 文件中 `VITE_MOCK=true/false`

### 权限

`VITE_PERMISSION=true/false`

### 路由

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
    "layout": "选填，默认 DefaultLayout， 不使用模板填写 false，模板存在在 src/layouts 目录下",
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
npm run dev
```

## 打包

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

### 本地预览

```shell
npm run preview
```

## 发布

- 安装依赖
- 代码打包（针对要发布的环境进行打包，打包后的文件存放在 `dist` 目录下）
- 复制 `dist` 目录下代码进行发布

### nginx 配置

```
location /api/ {
    rewrite /api/(.*?)$ /$1 break;
    proxy_pass https://域名;
}
```

## 感谢

<img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg" alt="JetBrains Logo (Main) logo." height="100">
