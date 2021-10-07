import * as layouts from '@/layouts'
import {isUrl} from '@/utils/is'

export const whiteList = [
    'login',
    '404'
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
        isMenu: false
    }
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
        redirect: '/login'
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
                    title: '登录'
                }
            }
        ]
    },
    {
        path: '/exception',
        name: 'exception',
        component: layouts.RouteViewLayout,
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/exception/404')
            }
        ]
    },
    {
        path: '/redirect/:name(.*)',
        component: layouts.RouteViewLayout,
        children: [
            {
                path: '',
                name: 'redirect',
                component: {
                    template: `<div></div>`,
                    created() {
                        const {params: {name}, query} = this.$route
                        this.$router.replace({
                            name,
                            query
                        })
                    }
                }
            }
        ]
    }
]

/**
 * 线型结构转树型结构
 * @param {array} list
 * @param {string} parentId
 * @returns {[]}
 */
export function listToTree(list, parentId) {
    let result = []
    list.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = item
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            const children = listToTree(list, item.id)
            // 删掉不存在 children 值的属性
            if (children.length) {
                child.children = children
            }
            // 加入到树中
            result.push(child)
        }
    })
    return result
}

/**
 * 树型结构转线型结构
 * @param {array} list
 * @return {[]}
 */
export function treeToList(list = []) {
    let result = []
    list.forEach(item => {
        if (item.children && item.children.length) {
            result = [
                ...result,
                ...treeToList(item.children)
            ]
        } else {
            result.push(item)
        }
    })
    return result
}

/**
 * 格式化路由，生成 vue-router 层级路由表
 * @param {array} routeList 路由
 * @param {object} parent 父级路由
 * @return {*}
 */
export function formatRouteList(routeList = [], parent = {}) {
    return routeList.map(item => {
        const {meta = {}} = item
        const externalLink = isUrl(item.path)
        const component = item.component || 'exception/404'
        const route = {
            // 如果路由设置的 path 是 / 开头或是外链，则默认使用 path，否则动态拼接路由地址
            path: (new RegExp('^\\/.*').test(item.path) || externalLink) ? item.path : `${(parent?.path ?? '')}/${item.path}`,
            // 路由名称，建议唯一
            name: item.name || '',
            // 路由对应的页面，动态加载
            component: layouts[component] || (() => import(`@/views/${component}`)),
            // meta，页面标题, 图标, 权限等附加信息
            meta: {
                isUrl: externalLink,
                target: meta?.target || '',
                layout: meta?.layout || (parent?.meta?.layout ?? '') || 'DefaultLayout',
                openKeys: externalLink ? [] : [
                    ...parent?.meta?.openKeys ?? [],
                    meta?.active ?? item?.name
                ],
                action: meta?.action ?? ['*'],
                ...meta
            }
        }
        // 重定向
        item.redirect && (route.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            route.children = formatRouteList(item.children, route)
        }
        return route
    }).filter(item => item)
}

/**
 * 生成动态路由
 * @param {array} routeList
 */
export function generateDynamicRouteList(routeList) {
    const result = []
    treeToList(routeList).forEach(item => {
        const {meta: {layout = ''}} = item
        // 是否有模板
        if (layout) {
            let index = result.findIndex(o => o.name === layout)
            if (index === -1) {
                result.push({
                    path: '',
                    name: layout,
                    component: layouts[layout] || (() => import(`@/layouts/${layout}`)),
                    children: []
                })
                index = result.length - 1
            }
            result[index].children.push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

/**
 * 获取首页路由
 * @param {array} list
 * @return {null}
 */
export function getIndexRouter(list) {
    let index = null
    for (let item of list.filter(item => item?.meta?.isMenu)) {
        if (item.children && item.children.length) {
            let temp = getIndexRouter(item.children)
            if (temp && Object.keys(temp).length) {
                index = temp
                break
            }
        } else {
            index = item
            break
        }
    }
    return index
}

/**
 * 根据用户权限生成路由
 * @param routeList
 * @param userPermission
 * @return {*}
 */
export function generateRouteListByPermission(routeList, userPermission = []) {
    return routeList.filter(item => {
        let permission = item?.meta?.permission ?? []
        permission = typeof permission === 'string' ? permission.split(',') : permission
        const index = userPermission.findIndex(o => permission.includes(o.permission))
        const hasAuth = index > -1 || permission.includes('*') ? true : false
        if (hasAuth) {
            item.meta.action = index > -1 ? userPermission[index]['action'] : ['*']
            if (item.children && item.children.length > 0) {
                item.children = generateRouteListByPermission(item.children, userPermission)
            }
            return item
        }
    })
}
