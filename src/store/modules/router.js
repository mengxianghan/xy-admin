import { defineStore } from 'pinia'
import { notFoundRoute } from '@/router/config'
import { formatRoutes, generateMenuList, generateRoutes, getFirstValidRoute } from '@/router/util'
import { findTree } from '@/utils/util'
import router from '@/router'
import asyncRoutes from '@/router/routes'

const useRouterStore = defineStore('router', {
    state: () => ({
        routes: [],
        menuList: [],
        indexRoute: null,
    }),
    getters: {},
    actions: {
        /**
         * 获取路由列表
         * @returns {Promise}
         */
        getRouterList() {
            return new Promise((resolve) => {
                ;(async () => {
                    // TODO: 通过接口获取路由，这里使用本地路由演示
                    const validRoutes = formatRoutes(asyncRoutes)
                    const menuList = generateMenuList(validRoutes)
                    const routes = [...generateRoutes(validRoutes), notFoundRoute]
                    const indexRoute = getFirstValidRoute(menuList)
                    routes.forEach((route) => {
                        router.addRoute(route)
                    })
                    this.routes = routes
                    this.menuList = menuList
                    this.indexRoute = indexRoute
                    resolve()
                })()
            })
        },
        /**
         * 设置徽标
         * @param {string} name 名称
         * @param {number} count 数量
         */
        setBadge({ name, count } = {}) {
            let menuInfo = null
            findTree(
                this.menuList,
                name,
                (item) => {
                    menuInfo = item
                },
                { key: 'name', children: 'children' }
            )
            if (menuInfo) {
                menuInfo.meta.badge = count
            }
        },
    },
})

export default useRouterStore
