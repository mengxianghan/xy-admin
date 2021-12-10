import router from '@/router'
import request from '@/utils/request'
import {
    notFoundRouter,
    formatRouteList,
    generateRoutes,
    getIndexRoute,
    filterRoutes, formatRoutes, generateMenus
} from '@/router/router.config'

const state = {
    routes: [],
    menus: [],
    indexRoute: {}
}

const getters = {
    menus: state => state.menus,
    indexRoute: state => state.indexRoute
}

const mutations = {
    /**
     * 设置路由
     * @param state
     * @param routes
     * @constructor
     */
    SET_ROUTES(state, routes) {
        state.routes = routes
    },
    /**
     * 设置菜单
     * @param state
     * @param menus
     * @constructor
     */
    SET_MENUS(state, menus) {
        state.menus = menus
    },
    /**
     * 设置首页路由
     * @param state
     * @param indexRoute
     * @constructor
     */
    SET_INDEX_ROUTE(state, indexRoute) {
        state.indexRoute = indexRoute
    }
}

const actions = {
    /**
     * 获取路由列表
     * @param commit
     * @returns {Promise}
     */
    getRouterList({commit, rootState}) {
        return new Promise(async (resolve) => {
            const {code, data} = await request.api.get('/routes.json', {
                params: {
                    r: Math.random()
                }
            })
            if (code === '200') {
                const {list} = data
                const validRoutes = process.env.VUE_APP_PERMISSION === 'true' ? filterRoutes(formatRoutes(list), rootState.user.permission) : formatRoutes(list)
                const menus = generateMenus(validRoutes)
                const routes = [
                    ...generateRoutes(validRoutes),
                    notFoundRouter
                ]
                const indexRoute = getIndexRoute(menus)
                routes.forEach(route => {
                    router.addRoute(route)
                })
                commit('SET_ROUTES', routes)
                commit('SET_MENUS', menus)
                commit('SET_INDEX_ROUTE', indexRoute)
                resolve()
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
