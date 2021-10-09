import {message} from 'ant-design-vue';
import router from '@/router';

const state = {
    list: [],
    cacheList: [],
    current: 0
};

const getters = {
    list: state => state.list,
    cacheList: state => state.cacheList,
    current: state => state.current
};

const mutations = {
    /**
     * 设置当前
     * @param state
     * @param current
     * @constructor
     */
    SET_CURRENT(state, current) {
        state.current = current < 0 ? 0 : current;
    },
    /**
     * 添加缓存
     * @param state
     * @param route
     * @constructor
     */
    ADD_CACHE_LIST(state, route) {
        const {name} = route;
        if (!state.cacheList.includes(name)) {
            state.cacheList.push(name);
        }
    },
    /**
     * 删除缓存
     * @param state
     * @param route
     * @constructor
     */
    DELETE_CACHE_LIST(state, route) {
        const index = state.cacheList.indexOf(route.name);
        if (index > -1) {
            state.cacheList.splice(index, 1);
        }
    },
    /**
     * PUSH
     * @param state
     * @param route
     * @constructor
     */
    PUSH(state, route) {
        state.list.push(route);
    },
    /**
     * REPLACE
     * @param state
     * @param route
     * @constructor
     */
    REPLACE(state, {route}) {
        const index = state.list.findIndex((item) => item.path === route.path);
        state.list.splice(index, 1, route);
    },
    /**
     * 刷新
     * @param state
     * @param route
     * @constructor
     */
    REFRESH(state, route) {
        const index = state.list.findIndex((item) => item.name === route.name);
        state.cacheList.splice(index, 1);
    },
    /**
     * 关闭
     * @param state
     * @param route
     * @constructor
     */
    CLOSE(state, {route, index}) {
        state.list.splice(index, 1);
        state.cacheList.splice(state.cacheList.findIndex((item) => item.name === route.name), 1);
    },
    /**
     * 关闭其他
     * @param state
     * @param route
     * @param index
     * @constructor
     */
    CLOSE_OTHER(state, {route, index}) {
        const list = [];
        const cacheList = [];
        list.push(state.list[index]);
        cacheList.push(route.name);
        state.list = list;
        state.cacheList = cacheList;
    },
    /**
     * 关闭左侧
     * @param state
     * @param route
     * @param index
     * @constructor
     */
    CLOSE_LEFT(state, {route, index}) {
        const waitCloseList = state.list.slice(0, index).map(item => item.name);
        const cacheList = state.cacheList.filter(item => !waitCloseList.includes(item));
        state.cacheList = cacheList;
        state.list.splice(0, index);
    },
    /**
     * 关闭右侧
     * @param state
     * @param roure
     * @param index
     * @constructor
     */
    CLOSE_RIGHT(state, {route, index}) {
        const waitCloseList = state.list.slice(index + 1).map(item => item.name);
        const cacheList = state.cacheList.filter(item => !waitCloseList.includes(item));
        state.cacheList = cacheList;
        state.list.splice(index + 1);
    }
};

const actions = {
    /**
     * Push
     * @param dispatch
     * @param commit
     * @param state
     * @param route
     */
    push({dispatch, commit, state}, {route} = {}) {
        route = route ?? router.currentRoute.value;
        const index = state.list.findIndex((item) => item.path === route.path);
        // 标签页是否已存在
        if (index > -1) {
            // 存在
            dispatch('replace', {route, index});
        } else {
            // 不存在
            commit('PUSH', route);
            commit('SET_CURRENT', state.list.length - 1);
        }
        commit('ADD_CACHE_LIST', route);
    },
    /**
     * Replace
     * @param commit
     * @param route
     * @param index
     */
    replace({commit}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        commit('REPLACE', {route, index});
        commit('SET_CURRENT', index);
    },
    /**
     * 切换标签页
     * @param dispatch
     * @param route
     */
    switch({dispatch}, {route} = {}) {
        router.replace(route);
    },
    /**
     * 刷新
     * @param dispatch
     * @param commit
     * @param state
     * @param route
     */
    refresh({dispatch, commit, state}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        commit('DELETE_CACHE_LIST', route);
        commit('SET_CURRENT', index);

        const {name, query} = state.list[index];
        router.replace({
            path: `/redirect/${name}`,
            query
        });
    },
    /**
     * 关闭
     * @param dispatch
     * @param commit
     * @param state
     * @param index
     */
    close({dispatch, commit, state}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        // 最后一个标签页
        if (state.list.length === 1) {
            message.warning('至少保留一个标签页');
            return;
        }
        commit('CLOSE', {route, index});

        // 关闭前面的标签
        if (index < state.current) {
            commit('SET_CURRENT', state.current - 1);
            return;
        }

        // 关闭当前标签
        if (index === state.current) {
            commit('SET_CURRENT', index - 1);
            // 更新标签页
            router.push(state.list[state.current]);
        }
    },
    /**
     * 关闭其他
     * @param commit
     * @param state
     * @param route
     * @param index
     */
    closeOther({commit, state}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        // 不是当前页面
        if (state.current !== index) {
            // 更新标签页
            router.push(state.list[index]);
        }
        commit('CLOSE_OTHER', {route, index});
        commit('SET_CURRENT', 0);
    },
    /**
     * 关闭左侧
     * @param commit
     * @param state
     * @param route
     * @param index
     */
    closeLeft({commit, state}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        // 不是当前页
        if (state.current !== index) {
            // 更新标签页
            router.push(state.list[index]);
        }
        commit('CLOSE_LEFT', {route, index});
        commit('SET_CURRENT', 0);
    },
    /**
     * 关闭右侧
     * @param commit
     * @param state
     * @param route
     * @param index
     */
    closeRight({commit, state}, {route, index} = {}) {
        route = route ?? router.currentRoute.value;
        index = index ?? state.list.findIndex((item) => item.name === route.name);
        // 是否关闭了当前页
        if (state.current > index) {
            router.push(state.list[index]);
        }
        commit('CLOSE_RIGHT', {route, index});
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
