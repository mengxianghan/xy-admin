/**
 * 动态路由
 */
export const asyncRouterMap = [
    {
        path: 'welcome',
        name: 'welcome',
        component: 'welcome/index.vue',
        meta: {
            icon: 'IconSmileOutlined',
            title: '欢迎页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
    },
    {
        path: 'form',
        name: 'form',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconFormOutlined',
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
    {
        path: 'list',
        name: 'list',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconTableOutlined',
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
                path: 'table-list',
                name: 'listTableList',
                component: 'list/table-list/index.vue',
                meta: {
                    title: '查询表格',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'basic-list',
                name: 'listBasicList',
                component: 'list/basic-list/index.vue',
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
    {
        path: 'profile',
        name: 'profile',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconProfileOutlined',
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
    {
        path: 'result',
        name: 'result',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconCheckCircleOutlined',
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
    {
        path: 'exception',
        name: 'exception',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconWarningOutlined',
            title: '异常页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
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
                    permission: '*',
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
                    permission: '*',
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
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'user',
        name: 'user',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconUserOutlined',
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
    {
        path: 'system',
        name: 'system',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconSettingOutlined',
            title: '系统管理',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'user',
                name: 'systemUser',
                component: 'system/user/index.vue',
                meta: {
                    title: '用户管理',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
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
                    permission: '*',
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
                    permission: '*',
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
                    permission: '*',
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
                    permission: '*',
                },
            },
        ],
    },
    {
        path: '',
        name: 'link',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconLinkOutlined',
            title: '外部链接',
            isMenu: true,
            keepAlive: false,
            permission: '*',
        },
        children: [
            {
                path: 'https://github.com/mengxianghan/xy-admin',
                name: 'linkBaidu',
                meta: {
                    type: 'link',
                    title: 'Github',
                    target: '_blank',
                    isMenu: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'iframe',
        name: 'iframePage',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconLayoutOutlined',
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
    {
        path: 'other',
        name: 'other',
        component: 'RouteViewLayout',
        meta: {
            icon: 'IconEllipsisOutlined',
            title: '其他',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'custom-layout',
                name: 'otherCustomLayout',
                component: 'list/basic-list/index.vue',
                meta: {
                    layout: 'CustomLayout',
                    title: '自定义框架',
                    isMenu: true,
                    target: '_blank',
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'multi-tab',
                name: 'otherMultiTab',
                component: 'other/multi-tab/index.vue',
                meta: {
                    title: '多标签操作',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'badge',
                name: 'otherBadge',
                component: 'other/badge/index.vue',
                meta: {
                    title: '菜单徽标',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
