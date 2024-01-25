# 去除权限控制

当你要开发一个小系统，或一个完全不需要权限控制的，开放后台任意访问的管理面板。

在 `src/store/modules/router.js` 文件中找到 `getRouterList` 方法，并做如下调整。

```js
import { defineStore } from 'pinia'
import { notFoundRoute } from '@/router/config'
import { formatRoutes, generateMenuList, generateRoutes, getFirstValidRoute } from '@/router/util'
import { findTree } from '@/utils'
import { config } from '@/config'
import router from '@/router'
import apis from '@/apis' // [!code --] // [!code focus]
import routes from '@/router/routes'

const useRouterStore = defineStore('router', {
    state: () => ({
        routeList: [],
        menuList: [],
        indexRoute: null,
    }),
    getters: {},
    actions: {
        /**
         * 获取路由列表
         * @returns {Promise}
         */
        getRouterList() { // [!code focus:26]
            return new Promise((resolve, reject) => {
                ;(async () => {
                    try {
                        const { code, data } = await apis.user.getAuthList().catch(() => { // [!code --:5]
                            throw new Error()
                        })
                        if (config('http.code.success') === code) {
                            const validRoutes = formatRoutes(routes, data)
                            const validRoutes = formatRoutes(routes, false) // [!code ++]
                            const menuList = generateMenuList(validRoutes)
                            const routeList = [...generateRoutes(validRoutes), notFoundRoute]
                            const indexRoute = getFirstValidRoute(menuList)
                            routeList.forEach((route) => {
                                router.addRoute(route)
                            })
                            this.routeList = routeList
                            this.menuList = menuList
                            this.indexRoute = indexRoute
                            resolve()
                        } // [!code --]
                    } catch (error) {
                        reject()
                    }
                })()
            })
        },
        /**
         * 设置徽标
         * @param {string} name 名称
         * @param {number} count 数量
         */
        setBadge({ name, count } = {}) {
            findTree(
                this.menuList,
                name,
                (item) => {
                    item.meta.badge = count
                },
                { key: 'name', children: 'children' }
            )
        },
    },
})

export default useRouterStore

```
