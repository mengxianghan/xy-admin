import { ProfileOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'profile',
        name: 'profile',
        component: 'RouteViewLayout',
        meta: {
            icon: ProfileOutlined,
            title: '详情页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'basic',
                name: 'profileBasic',
                component: 'profile/basic/index.vue',
                meta: {
                    title: '基础详情页',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'advanced',
                name: 'profileAdvanced',
                component: 'profile/advanced/index.vue',
                meta: {
                    title: '高级详情页',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
