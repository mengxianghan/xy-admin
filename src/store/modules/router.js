import { defineStore } from 'pinia'

import { asyncRouterMap } from '@/config/router'
import router from '@/router'
import { notFoundRoute } from '@/router/config'
import { filterRoutes, formatRoutes, generateMenuList, generateRoutes, getIndexRoute } from '@/router/util'
import { findTree } from '@/utils'

import useUserStore from './user'

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
            const userStore = useUserStore()
            return new Promise((resolve) => {
                ;(async () => {
                    const list = asyncRouterMap
                    const validRoutes =
                        import.meta.env.VITE_PERMISSION === 'true'
                            ? filterRoutes(formatRoutes(list), userStore.permission)
                            : formatRoutes(list)
                    const menuList = generateMenuList(validRoutes)
                    const routes = [...generateRoutes(validRoutes), notFoundRoute]
                    const indexRoute = getIndexRoute(menuList)
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
