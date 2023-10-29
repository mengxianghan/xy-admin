import { SmileOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'welcome',
        name: 'welcome',
        component: 'welcome/index.vue',
        meta: {
            icon: SmileOutlined,
            title: '欢迎页',
            isMenu: true,
            keepAlive: true,
        },
    },
]
