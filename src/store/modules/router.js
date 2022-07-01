import { defineStore } from 'pinia'
import { notFoundRouter } from '@/router/config'
import { asyncRouterMap } from '@/config/router'
import { generateRoutes, getIndexRouter, filterRoutes, formatRoutes, generateMenuList } from '@/router/util'
import { findTree } from '@/utils'

import router from '@/router'

const useRouterStore = defineStore('router', {
    state: () => ({
        routes: [],
        menuList: [],
        indexRouter: null,
    }),
    getters: {},
    actions: {
        /**
         * 获取路由列表
         * @returns {Promise}
         */
        getRouterList() {
            return new Promise(async (resolve) => {
                const list = asyncRouterMap
                const validRoutes =
                    process.env.VUE_APP_PERMISSION === 'true'
                        ? filterRoutes(formatRoutes(list), rootState.user.permission)
                        : formatRoutes(list)
                const menuList = generateMenuList(validRoutes)
                const routes = [...generateRoutes(validRoutes), notFoundRouter]
                const indexRouter = getIndexRouter(menuList)
                routes.forEach((route) => {
                    router.addRoute(route)
                })
                this.routes = routes
                this.menuList = menuList
                this.indexRouter = indexRouter
                resolve()
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
