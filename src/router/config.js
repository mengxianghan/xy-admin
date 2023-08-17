import * as layouts from '@/layouts'

/**
 * 白名单
 * @type {string[]}
 */
export const whiteList = ['login', 'logout', '404']

/**
 * 未找到页面路由
 * @type {{redirect: string, path: string, hidden: boolean}}
 */
export const notFoundRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/exception/404.vue',
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
export const constantRoutes = [
    {
        path: '/',
        name: 'index',
        redirect: '/login',
    },
    {
        path: '/base',
        component: layouts.UserLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/index.vue'),
                meta: {
                    title: '登录',
                },
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404.vue'),
    },
]
