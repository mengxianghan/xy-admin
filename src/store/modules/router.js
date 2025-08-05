import { defineStore } from 'pinia'
import apis from '@/apis'
import { config } from '@/config'
import router from '@/router'
import { notFoundRoute } from '@/router/config'
import routes from '@/router/routes'
import { formatRoutes, generateMenuList, generateRoutes, getFirstValidRoute } from '@/router/util'
import { findTree } from '@/utils'

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
    getRouterList() {
      return new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const { code, data } = await apis.user.getAuthList().catch((err) => {
              throw new Error(err)
            })
            if (config('http.code.success') === code) {
              const validRoutes = formatRoutes(routes, data)
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
            }
          }
          catch (err) {
            reject(err)
          }
        })()
      })
    },
    /**
     * 设置徽标
     * @param {object} params
     * @param {string} params.name - 名称
     * @param {number} params.count - 数量
     */
    setBadge({ name, count } = {}) {
      findTree(
        this.menuList,
        name,
        (item) => {
          item.meta.badge = count
        },
        { key: 'name', children: 'children' },
      )
    },
  },
})

export default useRouterStore
