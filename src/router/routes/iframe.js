import { LayoutOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'iframe',
        name: 'iframePage',
        component: 'RouteViewLayout',
        meta: {
            icon: LayoutOutlined,
            title: 'Iframe',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'vue',
                name: 'iframeVue',
                component: 'RouteViewLayout',
                meta: {
                    type: 'iframe',
                    url: 'https://cn.vuejs.org',
                    title: 'Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'antd',
                name: 'iframeAntd',
                component: 'RouteViewLayout',
                meta: {
                    type: 'iframe',
                    url: 'https://www.antdv.com/docs/vue/introduce-cn',
                    title: 'Ant Design Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
