import * as layouts from '@/layouts'
import {isFunction, omit, has} from 'lodash'

/**
 * 格式化路由
 * 格式化成符合 vue-router 标准的路由结构
 * @param {array} routes 路由
 * @param {object} parent 父级路由
 * @return {*}
 */
export function formatRoutes(routes = [], parent = {}) {
    return routes.map(item => {
        const {meta = {}} = item
        const isLink = item?.meta?.type === 'link'
        const component = item?.component || 'exception/404'
        const route = {
            // 如果路由设置的 path 是 / 开头或是外链，则默认使用 path，否则动态拼接路由地址
            path: (new RegExp('^\\/.*').test(item.path) || isLink) ? item.path : `${(parent?.path ?? '')}/${item.path}`,
            // 路由名称，建议唯一
            name: item.name || '',
            // 路由对应的页面，动态加载
            component: layouts[component] || (() => import(`@/views/${component}`)),
            // meta，页面标题, 图标, 权限等附加信息
            meta: {
                target: meta?.target || '',
                layout: meta?.layout || parent?.meta?.layout || 'DefaultLayout',
                openKeys: isLink ? [] : [...parent?.meta?.openKeys ?? [], meta?.active ?? item?.name],
                actions: meta?.actions ?? ['*'],
                breadcrumb: [...parent?.meta?.breadcrumb ?? [], item],
                ...meta,
            },
        }
        // 重定向
        item.redirect && (route.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            route.children = formatRoutes(item.children, route)
        }
        return route
    }).filter(item => item)
}

/**
 * 过滤路由
 * 移除没有权限的路由
 * @param routes
 * @param userPermission
 * @return {*}
 */
export function filterRoutes(routes, userPermission = []) {
    return routes.filter(item => {
        let permission = item?.meta?.permission ?? []
        permission = typeof permission === 'string' ? permission.split(',') : permission
        const index = userPermission.findIndex(o => permission.includes(o.permission))
        const hasAuth = index > -1 || permission.includes('*') ? true : false
        if (hasAuth) {
            item.meta.actions = index > -1 ? userPermission[index]['actions'] : ['*']
            if (item.children && item.children.length > 0) {
                item.children = filterRoutes(item.children, userPermission)
            }
            return item
        }
    })
}

/**
 * 拉平路由
 * @param {array} routes
 * @return {[]}
 */
export function flattenRoutes(routes = []) {
    let data = []
    routes.forEach(item => {
        if (item.children && item.children.length) {
            if (isFunction(item.component)) {
                data.push(omit(item, ['children']))
            }
            data = [
                ...data,
                ...flattenRoutes(item.children),
            ]
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
    flattenRoutes(routes).forEach(item => {
        const {meta: {layout = ''}} = item
        let index = result.findIndex(o => o.name === layout)
        if (index === -1) {
            result.push({
                path: '',
                name: layout,
                component: layouts[layout] || (() => import(`@/layouts/${layout}`)),
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
    return routes.filter(item => item?.meta?.isMenu).map(item => {
        const menuItem = {
            path: item.path,
            name: item.name,
            meta: {
                type: item?.meta?.type ?? '',
                icon: item?.meta?.icon ?? '',
                title: item?.meta?.title ?? '未命名菜单',
                openKeys: item?.meta?.openKeys ?? [],
                target: item?.meta?.target ?? '_self',
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
export function getIndexRouter(menuList) {
    let index = null
    for (let item of menuList) {
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
