import { WarningOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'exception',
        name: 'exception',
        component: 'RouteViewLayout',
        meta: {
            icon: WarningOutlined,
            title: '异常页',
            isMenu: true,
            keepAlive: true,
        },
        children: [
            {
                path: '403',
                name: '403',
                component: 'exception/403.vue',
                meta: {
                    title: '403',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: '404',
                name: '404',
                component: 'exception/404.vue',
                meta: {
                    title: '404',
                    isMenu: true,
                    keepAlive: true,
                },
            },
            {
                path: '500',
                name: '500',
                component: 'exception/500.vue',
                meta: {
                    title: '500',
                    isMenu: true,
                    keepAlive: true,
                },
            },
        ],
    },
]
