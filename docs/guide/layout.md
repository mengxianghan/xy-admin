# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏、通知栏以及内容等。在页面之中，也有很多区块的布局结构。在真实项目中，页面布局通常统领整个应用的界面，有非常重要的作用。

## Ant Design Pro 的布局
在 Ant Design Pro 中，我们抽离了使用过程中的通用布局，都放在 /layouts 目录中，分别为：

- BasicLayout：基础页面布局，包含了头部导航，侧边栏和通知栏：

- UserLayout：抽离出用于登陆注册页面的通用布局

- PageView：基础布局，包含了面包屑，和中间内容区 (slot)

- RouterView：空布局，专门为了二级菜单内容区自定义

- BlankLayout：空白的布局

## 如何使用 Ant Design Pro 布局 
通常布局是和路由系统紧密结合的，Ant Design Pro 的路由使用了 Vue-Router 的路由方案，为了统一方便的管理路由和页面的关系，我们将配置信息统一抽离到 config/router.config.js 下，通过如下配置定义每个页面的布局：
```js
// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'

export default [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'dash', permission: ['admin'] },
        children: [
          {
              path: '',
              name: '',
              component: () => import('@/views/...'),
              meta: { title: '', permission: [ '...' ] }
          },
          {
              path: '',
              name: '',
              hidden: true,
              component: () => import('@/views/...'),
              meta: { title: '', keepAlive: true, permission: [ '...' ] }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', permission: [ 'form' ] }
          }
        ]
      }
    ]
  }
]
```

映射路由和页面布局（组件）的关系如代码所示，完整映射转换实现可以参看 router.config.js。

更多 Vue-Router 的路由配置方式可以参考：Vue-Router 配置式路由。

### Pro 扩展配置 

我们在 router.config.js 扩展了一些关于 pro 全局菜单的配置。

```json
{
  "hidden": true,
  "hideChildrenInMenu": true,
  "meta": {
    "icon": "dashboard",
    "title": "菜单标题",
    "keepAlive": true,
    "permission": [
      "admin"
    ]
  }
}
```

> 更多可配置属性，请参考 路由和菜单

## Ant Design 布局组件
除了 Pro 里的内建布局以外，在一些页面中需要进行布局，可以使用 Ant Design 目前提供的两套布局组件工具：Layout 和 Grid。

### Grid 组件
栅格布局是网页中最常用的布局，其特点就是按照一定比例划分页面，能够随着屏幕的变化依旧保持比例，从而具有弹性布局的特点。

而 Ant Design 的栅格组件提供的功能更为强大，能够设置间距、具有支持响应式的比例设置，以及支持 flex 模式，基本上涵盖了大部分的布局场景，详情参看：Grid。

### Layout 组件
如果你需要辅助页面框架级别的布局设计，那么 Layout 则是你最佳的选择，它抽象了大部分框架布局结构，使得只需要填空就可以开发规范专业的页面整体布局，详情参看：Layout。

### 根据不同场景区分抽离布局组件
在大部分场景下，我们需要基于上面两个组件封装一些适用于当下具体业务的组件，包含了通用的导航、侧边栏、顶部通知、页面标题等元素。例如 Ant Design Pro 的 BasicLayout。

通常，我们会把抽象出来的布局组件，放到跟 components 和 layouts 文件夹中方便管理。需要注意的是，这些布局组件和我们平时使用的其它组件并没有什么不同，只不过功能性上是为了处理布局问题。 
