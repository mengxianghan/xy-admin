import { FormOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'form',
        name: 'form',
        component: 'RouteViewLayout',
        meta: {
            icon: FormOutlined,
            title: '表单页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'basic',
                name: 'formBasic',
                component: 'form/basic/index.vue',
                meta: {
                    title: '基础表单',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'step',
                name: 'formStep',
                component: 'form/step/index.vue',
                meta: {
                    title: '分步表单',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'advanced',
                name: 'formAdvanced',
                component: 'form/advanced/index.vue',
                meta: {
                    title: '高级表单',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
