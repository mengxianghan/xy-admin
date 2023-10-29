import { LinkOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: '',
        name: 'link',
        component: 'RouteViewLayout',
        meta: {
            icon: LinkOutlined,
            title: '外部链接',
            isMenu: true,
            keepAlive: false,
        },
        children: [
            {
                path: 'https://github.com/mengxianghan/xy-admin',
                name: 'github',
                meta: {
                    type: 'link',
                    title: 'Github',
                    target: '_blank',
                    isMenu: true,
                },
            },
        ],
    },
]
