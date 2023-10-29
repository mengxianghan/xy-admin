import { SettingOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'system',
        name: 'system',
        component: 'RouteViewLayout',
        meta: {
            icon: SettingOutlined,
            title: '系统管理',
            isMenu: true,
            keepAlive: true,
        },
        children: [
            {
                path: 'user',
                name: 'systemUser',
                component: 'system/user/index.vue',
                meta: {
                    title: '成员与部门',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'role',
                name: 'systemRole',
                component: 'system/role/index.vue',
                meta: {
                    title: '角色管理',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'menu',
                name: 'systemMenu',
                component: 'system/menu/index.vue',
                meta: {
                    title: '菜单管理',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'new-menu',
                name: 'systemNewMenu',
                component: 'system/new-menu/index.vue',
                meta: {
                    title: '新版菜单管理',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: 'dict',
                name: 'systemDict',
                component: 'system/dict/index.vue',
                meta: {
                    title: '字典管理',
                    isMenu: true,
                    keepAlive: true,
                },
            },
        ],
    },
]
