import { isFunction, omit, find } from 'lodash-es'
import { toList } from '@/utils/util'
import * as layouts from '@/layouts'
import localRoutes from '@/router/routes'

/**
 * 格式化路由
 * 格式化成符合 vue-router 标准的路由结构
 * @param {array} routes 路由
 * @param {object} parent 父级路由
 * @return {*}
 */
export function formatRoutes(routes = [], parent = {}) {
    const modules = import.meta.glob('../views/**/*.vue')
    return routes
        .map((item) => {
            const localRoute = find(toList(localRoutes), { name: item.name })
            const component = localRoute?.component || 'exception/404'
            const isLink = localRoute?.meta?.type === 'link'
            const isIframe = localRoute?.meta?.type === 'iframe'

            if (!localRoute) return

            const route = {
                // 如果路由设置的 path 是 / 开头或是外链，则默认使用 path，否则动态拼接路由地址
                path:
                    new RegExp('^\\/.*').test(localRoute.path) || isLink
                        ? localRoute.path
                        : `${parent?.path ?? ''}/${localRoute.path}`,
                // 路由名称，建议唯一
                name: localRoute.name || '',
                // 路由对应的页面，动态加载
                component: layouts[component] || modules[`../views/${component}`],
                // meta，页面标题, 图标, 权限等附加信息
                meta: {
                    ...(localRoute?.meta || {}),
                    target: localRoute?.meta?.target || '',
                    layout: localRoute?.meta?.layout || parent?.meta?.layout || 'BasicLayout',
                    openKeys: isLink
                        ? []
                        : [...(parent?.meta?.openKeys ?? []), localRoute?.meta?.active ?? localRoute?.name],
                    isLink,
                    isIframe,
                    actions: item?.meta?.actions ?? ['*'],
                    title: item?.meta?.title || '未命名',
                },
            }
            // 面包屑导航
            route.meta.breadcrumb = [...(parent?.meta?.breadcrumb ?? []), route]
            // 重定向
            localRoute.redirect && (route.redirect = localRoute.redirect)
            // 是否有子菜单，并递归处理
            if (item.children && item.children.length > 0) {
                route.children = formatRoutes(item.children, route)
            }
            return route
        })
        .filter((item) => item)
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
            const {
                meta: { layout = '' },
            } = item
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
                    title: item?.meta?.title ?? '未命名菜单',
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
 * @param {array} menuList
 * @return {null}
 */
export function getFirstValidRoute(menuList) {
    let index = null
    for (let item of menuList) {
        if (item.children && item.children.length) {
            let temp = getFirstValidRoute(item.children)
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
