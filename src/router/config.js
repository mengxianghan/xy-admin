import * as layouts from '@/layouts'

/**
 * 白名单
 * @type {string[]}
 */
export const whiteList = [
    'login',
    '404',
]

/**
 * 未找到页面路由
 * @type {{redirect: string, path: string, hidden: boolean}}
 */
export const notFoundRouter = {
    path: '/:pathMatch(.*)*',
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
                meta: {
                    title: '登录',
                },
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404'),
    },
]