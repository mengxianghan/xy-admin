# 路由和菜单

路由和菜单是组织起一个应用的关键骨架，脚手架中的路由为了方便管理，使用了中心化的方式，在 `src/config/router.js` 统一配置和管理（另外还提供了完全动态从后端加载的解决方案，可至本文末尾查看）。


## 基本结构

在这一部分，脚手架通过结合一些配置文件、基本算法及工具函数，搭建好了路由和菜单的基本框架，主要涉及以下几个模块/功能：

- `路由管理` 通过约定的语法根据在 `src/config/router.js` 中配置路由。
- `菜单生成` 根据路由配置来生成菜单。菜单项名称，嵌套路径与路由高度耦合。

下面简单介绍下各个模块的基本思路，如果你对实现过程不感兴趣，只想了解应该怎么实现相关需求，可以直接查看需求实例。


## 路由

完整的路由结构

```json
{
  "path": "", // 必填，路径，允许填写 http|https
  "name": "", // 必填，路由名称，唯一
  "component": "", // 必填，页面
  "redirect": "", // 选填，跳转地址
  "meta": {
    "type": "", // 菜单类型【link=外部链接，iframe=iframe】
    "icon": "", // 选填，菜单icon
    "title": "", // 必填，菜单名称
    "isMenu": "", // 必填，是否在菜单上显示【true=显示；false=不显示】
    "keepAlive": "", // 必填，是否缓存页面【true=缓存；false=不缓存】
    "target": "", // 选填，页面打开方式【_blank=新标签页打开；_self=当前标签页打开】
    "layout": "", // 选填，默认 DefaultLayout， 不使用模板填写 false，模板存在在 src/layouts/ 目录下
    "active": "", // 选填，打开页面要高亮的菜单，一般用于被隐藏的页面，要高亮菜单的 name
    "permission": [], // 选填，用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）
    "action": [], // 选填，根据业务需要
    "url": "", // iframe url，配合 type="iframe" 使用
  },
  "children": [], // 子路由
}
```


## 菜单
菜单根据 `src/config/router.js` 生成，具体逻辑在 `src/router/util.js` 中的 `generateMenuList` 方法实现。


## 需求实例

上面对这部分的实现概要进行了介绍，接下来通过实际的案例来说明具体该怎么做。


### 菜单跳转到外部地址

```json
{
  "path": "http://admin.xuanyunet.com",
  "name": "demo",
  "meta": {
    "title": "演示", 
    "target": "_blank"  //打开到新窗口
  }
}
```

配置后，会默认生成相关的路由及导航。


### 新增布局

在脚手架中我们通过嵌套路由或指定 `meta.layout` 来实现布局模板。 


#### 嵌套路由方式
```json
{
  "path": "custom-layout",
  "name": "customLayout",
  "component": CustomLayout,
  "meta": {
    "title": "自定义布局",
    "isMenu": true
  },
  "children": [
    {
      "path": "welcome",
      "name": "welcome",
      "component": "welcome/index.vue",
      "meta": {
        "title": "欢迎页",
        "isMenu": true
      }
    }
  ]
}
```

#### 指定 `meta.layout` 方式

```json
{
  "path": "custom-layout",
  "name": "customLayout",
  "component": "list/basic/index.vue",
  "meta": {
    "layout": "CustomLayout",
    "title": "自定义模板",
    "isMenu": true,
    "target": "_blank",
    "keepAlive": true
  }
}
```
通过 `meta.layout` 指定后，需要在 `src/layouts/` 目录下创建一个同名文件并导出

::: tip
1. 路由自定义 Icon 请引入自定义 svg Icon 文件，然后传递给路由的 meta.icon 参数即可
2. 请注意 component: () => import('..') 方式引入路由的页面组件为 懒加载模式。具体可以看 Vue 官方文档
3. 无需控制权限的路由活着需要在未登录情况访问的路由，可以定义在 `src/router/config.js` 下的 whiteList 中
:::