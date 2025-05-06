# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏、通知栏以及内容等。在页面之中，也有很多区块的布局结构。在真实项目中，页面布局通常统领整个应用的界面，有非常重要的作用。

## XYAdmin 的布局

在 `XYAdmin` 中，抽离了使用过程中的通用布局，都放在 `/src/layouts` 目录中，分别为：

- `BasicLayout` 基础页面布局，包含了头部导航，侧边栏
- `UserLayout` 抽离出用于登陆注册页面的通用布局
- `RouteViewLayout` 空布局，专门为了二级菜单内容区自定义

## 如何使用布局

通常布局是和路由系统紧密结合的，`XYAdmin` 的路由使用了 `Vue-Router` 的路由方案，为了统一方便的管理路由和页面的关系，我们将配置信息统一抽离到 `/src/config/router.js` 下，通过如下配置定义每个页面的布局：

```js
export default [
  {
    path: 'welcome',
    name: 'welcome',
    component: 'welcome/index.vue',
    meta: {
      icon: 'IconSmileOutlined',
      title: '欢迎页',
      isMenu: true,
      keepAlive: true,
      permission: '*',
    },
  },
  {
    path: 'form',
    name: 'form',
    component: 'RouteViewLayout',
    meta: {
      icon: 'IconFormOutlined',
      title: '表单页',
      isMenu: true,
      keepAlive: true,
      permission: '*',
    },
    children: [
      {
        path: 'basic',
        name: 'formBasic',
        component: 'form/basic/index.vue',
        meta: {
          title: '基础表单',
          isMenu: true,
          keepAlive: true,
          permission: '*',
        },
      },
      {
        path: 'step',
        name: 'formStep',
        component: 'form/step/index.vue',
        meta: {
          title: '分步表单',
          isMenu: true,
          keepAlive: true,
          permission: '*',
        },
      },
      {
        path: 'advanced',
        name: 'formAdvanced',
        component: 'form/advanced/index.vue',
        meta: {
          title: '高级表单',
          isMenu: true,
          keepAlive: true,
          permission: '*',
        },
      },
    ],
  },
]
```

映射路由和页面布局（组件）的关系如上所示，完整映射转换实现可以查看 `/src/config/router.js`

更多 `Vue-Router` 的路由配置方式可以参考：`Vue-Router` 配置式路由。

### 扩展配置

我们在 `src/config/router.js` 扩展了一些关于全局菜单的配置。

```json
{
  "meta": {
    "icon": "dashboard",
    "title": "菜单标题",
    "type": "",
    "isMenu": true,
    "keepAlive": true,
    "target": "",
    "layout": "",
    "active": "",
    "permission": [
      "admin"
    ],
    "action": [],
    "url": "",
    "query": {}
  }
}
```

详细配置，请参考 [路由和菜单](/guide/route-and-nav)
