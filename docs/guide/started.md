# 开始使用


## 介绍

XYAdmin 是一个企业级中后台前端解决方案，秉承 Ant Design 的设计价值观，致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。随着『设计者』的不断反馈，将持续迭代，逐步沉淀和总结出更多设计模式和相应的代码实现，阐述中后台产品模板/组件/业务场景的最佳实践。

> 本项目默认你有一定的 Vue 基础和 Antd 使用经验,如果你对这些还不熟悉，我们建议你先查阅相关文档 [Vue](https://vuejs.org/)、[Pinia](https://pinia.vuejs.org/)、 [Vite](https://vitejs.dev/)、[Ant Design Vue](https://antdv.com/components/overview)

基于上述目标和提供了以下的典型模板，并据此构建了一套基于 `Ant Design Vue` 的中后台管理控制台的脚手架，它可以帮助你快速搭建企业级中后台产品原型。


## 前期准备

你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 ES2015+、Vue.Js、Pinia、Vue-Router、Ant Design Vue，提前了解和学习这些知识会非常有帮助。
- node 版本 >= 16.8


## 安装

从 GitHub 仓库中直接安装最新的脚手架代码。

```shell
git clone --depth=1 https://github.com/mengxianghan/xy-admin.git my-project
cd my-project
```

## 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
project_name
├ .husky                 husky 配置目录
├ .vscode                vscode 配置目录（可忽略）
├ config                 框架配置文件，vite.config 中用到的插件
├ dist                   存放打包后文件（可忽略）
├ docs                   使用文档（正式使用时可删除）
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
├ .env.dev                本地开发环境配置文件
├ .env.test               测试环境变量文件 
├ .env.pre                预生产环境变量文件 
├ .env.prod               生产环境配置文件
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


## 本地开发

安装依赖。

```shell
npm install
```

> 如果网络状况不佳，可以使用 cnpm 进行加速，并使用 cnpm 代替 npm ，如 npm config set registry https://registry.npm.taobao.org

```shell
$ npm run dev
```

启动完成后会自动打开浏览器访问 `http://localhost:9211`，你看到下面的页面就代表成功了。

![login](/images/login.png)

接下来你可以修改代码进行业务开发了，框架中内建了典型业务模板、常用业务组件、全局路由等等各种实用的功能辅助开发，你可以继续阅读文档。