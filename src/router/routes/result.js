import { CheckCircleOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'result',
        name: 'result',
        component: 'RouteViewLayout',
        meta: {
            icon: CheckCircleOutlined,
            title: '结果页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'success',
                name: 'resultSuccess',
                component: 'result/success/index.vue',
                meta: {
                    title: '成功页',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'fail',
                name: 'resultFail',
                component: 'result/fail/index.vue',
                meta: {
                    title: '失败页',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
