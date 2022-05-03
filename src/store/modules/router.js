import {asyncRouterMap} from '@/config/router'
import {notFoundRouter} from '@/router/config'
import {
    generateRoutes,
    getIndexRouter,
    filterRoutes,
    formatRoutes,
    generateMenus,
} from '@/router/util'
import router from '@/router'

const state = {
    routes: [],
    menus: [],
    indexRouter: {},
}

const getters = {
    menus: state => state.menus,
    indexRouter: state => state.indexRouter,
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
     * @param indexRouter
     * @constructor
     */
    SET_INDEX_ROUTER(state, indexRouter) {
        state.indexRouter = indexRouter
    },
}

const actions = {
    /**
     * 获取路由列表
     * @param commit
     * @returns {Promise}
     */
    getRouterList({commit, rootState}) {
        return new Promise(async (resolve) => {
            const list = asyncRouterMap
            const validRoutes = process.env.VUE_APP_PERMISSION === 'true' ? filterRoutes(formatRoutes(list), rootState.user.permission) : formatRoutes(list)
            const menus = generateMenus(validRoutes)
            const routes = [
                ...generateRoutes(validRoutes),
                notFoundRouter,
            ]
            const indexRouter = getIndexRouter(menus)
            router.addRoutes(routes)
            commit('SET_ROUTES', routes)
            commit('SET_MENUS', menus)
            commit('SET_INDEX_ROUTER', indexRouter)
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
