/**
 * 动态路由
 */
export const asyncRouterMap = [
    {
        path: 'home',
        name: 'home',
        component: 'home/home',
        meta: {
            icon: 'home',
            title: '首页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
    },
    {
        path: 'list',
        name: 'list',
        component: 'RouteViewLayout',
        meta: {
            icon: 'appstore',
            title: '列表页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'tableList',
                name: 'tableList',
                component: 'list/tableList',
                meta: {
                    title: '查询表格',
                    isMenu: true,
                    keepAlive: false,
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
            icon: 'link',
            title: '外部链接',
            isMenu: true,
            keepAlive: false,
            permission: '*',
        },
        children: [
            {
                path: 'https://www.baidu.com',
                name: 'baidu',
                meta: {
                    type: 'link',
                    title: '百度',
                    target: '_blank',
                    isMenu: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'iframe',
        name: 'iframe',
        component: 'RouteViewLayout',
        meta: {
            icon: 'layout',
            title: 'iframe',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'vue',
                name: 'vue',
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
                name: 'antd',
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