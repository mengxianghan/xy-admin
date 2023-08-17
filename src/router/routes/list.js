import { TableOutlined } from '@ant-design/icons-vue'

export default [
    {
        path: 'list',
        name: 'list',
        component: 'RouteViewLayout',
        meta: {
            icon: TableOutlined,
            title: '列表页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'search',
                name: 'listSearch',
                meta: {
                    title: '搜索列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
                children: [
                    {
                        path: 'articles',
                        name: 'listSearchArticles',
                        component: 'list/search/articles/index.vue',
                        meta: {
                            title: '搜索列表（文章）',
                            isMenu: true,
                            keepAlive: true,
                            permission: '*',
                        },
                    },
                    {
                        path: 'projects',
                        name: 'listSearchProjects',
                        component: 'list/search/projects/index.vue',
                        meta: {
                            title: '搜索列表（项目）',
                            isMenu: true,
                            keepAlive: true,
                            permission: '*',
                        },
                    },
                    {
                        path: 'applications',
                        name: 'listSearchApplications',
                        component: 'list/search/applications/index.vue',
                        meta: {
                            title: '搜索列表（应用）',
                            isMenu: true,
                            keepAlive: true,
                            permission: '*',
                        },
                    },
                ],
            },
            {
                path: 'table',
                name: 'listTable',
                component: 'list/table/index.vue',
                meta: {
                    title: '查询表格',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'basic',
                name: 'listBasic',
                component: 'list/basic/index.vue',
                meta: {
                    title: '标准列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'card',
                name: 'listCard',
                component: 'list/card/index.vue',
                meta: {
                    title: '卡片列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
