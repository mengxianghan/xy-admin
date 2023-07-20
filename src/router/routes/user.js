import { UserOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'user',
        name: 'user',
        component: 'RouteViewLayout',
        meta: {
            icon: UserOutlined,
            title: '个人页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'center',
                name: 'userCenter',
                component: 'user/center/index.vue',
                meta: {
                    title: '个人中心',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'setting',
                name: 'userSetting',
                component: 'user/setting/index.vue',
                meta: {
                    title: '个人设置',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
