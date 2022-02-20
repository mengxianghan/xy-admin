import router from '@/router'
import {notFoundRouter, asyncRouterMap} from '@/config/router'
import {
    generateRoutes,
    getIndexRouter,
    filterRoutes,
    formatRoutes,
    generateMenuList,
} from '@/router/util'
import {findTree} from '@/utils'

const state = {
    routes: [],
    menuList: [],
    indexRouter: {},
}

const getters = {
    menuList: state => state.menuList,
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
     * @param menuList
     * @constructor
     */
    SET_MENU_LIST(state, menuList) {
        state.menuList = menuList
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
    /**
     * 设置徽标
     * @param state
     * @param {string} name 名称
     * @param {number} count 数量
     * @constructor
     */
    SET_BADGE(state, {name, count}) {
        let menuInfo = null
        findTree(state.menuList, name, (item) => {
            menuInfo = item
        }, {key: 'name', children: 'children'})
        if (menuInfo) {
            menuInfo.meta.badge = count
        }
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
            const menuList = generateMenuList(validRoutes)
            const routes = [
                ...generateRoutes(validRoutes),
                notFoundRouter,
            ]
            const indexRouter = getIndexRouter(menuList)
            routes.forEach(route => {
                router.addRoute(route)
            })
            commit('SET_ROUTES', routes)
            commit('SET_MENU_LIST', menuList)
            commit('SET_INDEX_ROUTER', indexRouter)
            resolve()
        })
    },
    /**
     * 设置徽标
     * @param {string} name 名称
     * @param {number} count 数量
     */
    setBadge({commit}, {name, count} = {}) {
        commit('SET_BADGE', {name, count})
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
