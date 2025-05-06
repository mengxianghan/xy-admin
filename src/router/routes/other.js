import { EllipsisOutlined } from '@ant-design/icons-vue'

export default [
  {
    path: 'other',
    name: 'other',
    component: 'RouteViewLayout',
    meta: {
      icon: EllipsisOutlined,
      title: '其他',
      isMenu: true,
      keepAlive: true,
    },
    children: [
      {
        path: 'custom-layout',
        name: 'otherCustomLayout',
        component: 'list/basic/index.vue',
        meta: {
          layout: 'CustomLayout',
          title: '自定义框架',
          isMenu: true,
          target: '_blank',
          keepAlive: true,
        },
      },
      {
        path: 'multi-tab',
        name: 'otherMultiTab',
        component: 'other/multi-tab/index.vue',
        meta: {
          title: '多标签操作',
          isMenu: true,
          keepAlive: true,
        },
      },
      {
        path: 'badge',
        name: 'otherBadge',
        component: 'other/badge/index.vue',
        meta: {
          title: '菜单徽标',
          isMenu: true,
          keepAlive: true,
        },
      },
    ],
  },
]
