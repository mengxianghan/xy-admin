import * as layouts from '@/layouts'

export const whiteList = [
    'login',
    '404',
]

/**
 * 未找到页面路由
 * @type {{redirect: string, path: string, hidden: boolean}}
 */
export const notFoundRouter = {
    path: '*',
    redirect: '/exception/404',
    meta: {
        isLogin: false,
        isMenu: false,
    },
}

/**
 * 基础路由
 * 关键字：index,login,exception,404,redirect
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/',
        name: 'index',
        redirect: '/login',
    },
    {
        path: '/base',
        component: layouts.BaseLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login'),
                mata: {
                    title: '登录',
                },
            },
        ],
    },
    {
        path: '/exception',
        name: 'exception',
        component: layouts.RouteViewLayout,
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/exception/404'),
            },
        ],
    },
]

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
            keepAlive: false,
            permission: '*',
        },
        children: [
            {
                path: 'vue',
                name: 'vue',
                component: 'iframe',
                meta: {
                    type: 'iframe',
                    iframeUrl: 'https://cn.vuejs.org/',
                    title: 'Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'antd',
                name: 'antd',
                component: 'iframe',
                meta: {
                    type: 'iframe',
                    iframeUrl: 'https://www.antdv.com/docs/vue/introduce-cn/',
                    title: 'Ant Design Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
