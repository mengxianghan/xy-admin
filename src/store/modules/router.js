import axios from 'axios';
import router from '@/router';
import {
    notFoundRouter,
    formatRouteList,
    generateDynamicRouteList,
    getIndexRouter,
    listToTree,
    generateRouteListByPermission
} from '@/config/router';

const state = {
    routeList: [],
    menuList: [],
    indexRouter: {}
};

const getters = {
    menuList: state => state.menuList,
    indexRouter: state => state.indexRouter
};

const mutations = {
    /**
     * 设置路由
     * @param state
     * @param routeList
     * @constructor
     */
    SET_ROUTE_LIST(state, routeList) {
        state.routeList = routeList;
    },
    /**
     * 设置菜单
     * @param state
     * @param menuList
     * @constructor
     */
    SET_MENU_LIST(state, menuList) {
        state.menuList = menuList;
    },
    /**
     * 设置首页路由
     * @param state
     * @param indexRouter
     * @constructor
     */
    SET_INDEX_ROUTER(state, indexRouter) {
        state.indexRouter = indexRouter;
    }
};

const actions = {
    /**
     * 获取路由列表
     * @param commit
     * @returns {Promise}
     */
    getRouterList({commit, rootState}) {
        return new Promise(resolve => {
            axios.get('/router.json', {
                headers: {
                    'cache-control': 'no-cache'
                }
            }).then(res => {
                const {
                    data: {format, list}
                } = res.data;
                let menuList = format ? listToTree(list) : list;
                menuList = process.env.VUE_APP_PERMISSION === 'true'
                    ? generateRouteListByPermission(formatRouteList(menuList), rootState.user.permission)
                    : formatRouteList(menuList);
                const routeList = [
                    ...generateDynamicRouteList(menuList),
                    notFoundRouter
                ];
                const indexRouter = getIndexRouter(menuList);
                routeList.forEach(route => {
                    router.addRoute(route);
                });
                commit('SET_ROUTE_LIST', routeList);
                commit('SET_MENU_LIST', menuList);
                commit('SET_INDEX_ROUTER', indexRouter);
                resolve();
            });
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
