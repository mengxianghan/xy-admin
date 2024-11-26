import { filter, find, findIndex, omit } from 'lodash-es'
import { isFunction } from '@/utils/is'
import * as layouts from '@/layouts'

/**
 * 格式化路由
 * 格式化成符合 vue-router 标准的路由结构
 * @param {array} routes 路由
 * @param {array | boolean} asyncRoutes 异步路由
 * @param {object} parent 父级路由
 * @return {*}
 */
export function formatRoutes(routes, asyncRoutes = [], parent = {}) {
    const modules = import.meta.glob('../views/**/*.vue')
    asyncRoutes = asyncRoutes === false ? routes : asyncRoutes
    return routes
        .sort((a, b) => {
            const indexA = findIndex(asyncRoutes, { name: a.name })
            const indexB = findIndex(asyncRoutes, { name: b.name })

            if (indexA < 0 && indexB > -1) {
                return 1
            }

            if (indexA > -1 && indexB < 0) {
                return -1
            }

            return indexA - indexB
        })
        .filter((item) => {
            return item.meta.permission === '*' || find(asyncRoutes, { name: item.name })
        })
        .map((item) => {
            const asyncRoute = find(asyncRoutes, { name: item.name })
            const component = item?.component || 'exception/404'
            const isLink = item?.meta?.type === 'link'
            const isIframe = item?.meta?.type === 'iframe'
            const parentPath = parent?.path ?? ''

            const route = {
                // 如果路由设置的 path 是 / 开头或是外链，则默认使用 path，否则动态拼接路由地址
                path:
                    new RegExp('^\\/.*').test(item.path) || isLink
                        ? item.path
                        : `${parentPath}${parentPath.endsWith('/') ? '' : '/'}${item.path}`,
                // 路由名称，建议唯一
                name: item.name || '',
                // 路由对应的页面，动态加载
                component: layouts[component] || modules[`../views/${component}`],
                // meta，页面标题, 图标, 权限等附加信息
                meta: {
                    ...(item?.meta || {}),
                    target: item?.meta?.target || '',
                    layout: item?.meta?.layout || parent?.meta?.layout || 'BasicLayout',
                    openKeys: isLink ? [] : [...(parent?.meta?.openKeys ?? []), item?.meta?.active ?? item?.name],
                    isLink,
                    isIframe,
                    actions: asyncRoute?.meta?.actions ?? ['*'],
                    title: asyncRoute?.meta?.title || item?.meta?.title || '未命名',
                },
            }
            // 面包屑导航
            route.meta.breadcrumb = [...(parent?.meta?.breadcrumb ?? []), route]
            // 重定向
            item.redirect && (route.redirect = item.redirect)

            // 是否有子菜单，并递归处理
            if (item.children && item.children.length > 0) {
                route.children = formatRoutes(item.children, asyncRoute?.children, route)
            }
            return route
        })
}

/**
 * 将没有权限的路由过滤掉
 * @param routes
 * @param userPermission
 * @return {*}
 */
// export function filterRoutes(routes, userPermission = []) {
//     return routes.filter((item) => {
//         let permission = item?.meta?.permission ?? []
//         permission = typeof permission === 'string' ? permission.split(',') : permission
//         const index = userPermission.findIndex((o) => permission.includes(o.permission))
//         const hasAuth = index > -1 || permission.includes('*')
//         if (hasAuth) {
//             item.meta.actions = index > -1 ? userPermission[index]['actions'] : ['*']
//             if (item.children && item.children.length > 0) {
//                 item.children = filterRoutes(item.children, userPermission)
//             }
//             return item
//         }
//     })
// }

/**
 * 拉平路由
 * @param {array} routes
 * @return {[]}
 */
export function flattenRoutes(routes = []) {
    let data = []
    routes.forEach((item) => {
        if (item.children && item.children.length) {
            if (isFunction(item.component)) {
                data.push(omit(item, ['children']))
            }
            data = [...data, ...flattenRoutes(item.children)]
        } else {
            data.push(item)
        }
    })
    return data
}

/**
 * 生成路由
 * @param {array} routes
 */
export function generateRoutes(routes) {
    const result = []
    flattenRoutes(routes)
        .filter((item) => item.component) // 过滤掉无效的 route
        .forEach((item) => {
            const { layout } = item.meta
            const modules = import.meta.glob('../layouts/**/*.vue')
            let index = result.findIndex((o) => o.name === layout)
            if (index === -1) {
                result.push({
                    path: '',
                    name: layout,
                    component:
                        layouts[layout] || modules[`../layouts/${layout}${layout.endsWith('.vue') ? '' : '.vue'}`],
                    children: [],
                })
                index = result.length - 1
            }
            result[index].children.push(item)
        })
    return result
}

/**
 * 生成菜单列表
 * @param routes
 */
export function generateMenuList(routes) {
    return routes
        .filter((item) => item?.meta?.isMenu)
        .map((item) => {
            const menuItem = {
                path: item.path,
                name: item.name,
                meta: {
                    icon: item?.meta?.icon ?? '',
                    title: item?.meta?.title ?? '未命名',
                    target: item?.meta?.target ?? '_self',
                    ...(item?.meta ?? {}),
                },
            }
            const children = generateMenuList(item?.children ?? [])
            if (children.length) {
                menuItem.children = children
            }

            return menuItem
        })
}

/**
 * 获取首页路由
 * @param {array} list
 * @param predicate
 * @return {null}
 */
export function getFirstValidRoute(list, predicate) {
    let index = null
    list = filter(list, predicate)
    for (let item of list) {
        const children = filter(item?.children || [], predicate)
        if (children.length) {
            let temp = getFirstValidRoute(children, predicate)
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
