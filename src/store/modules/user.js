import api from '@/api';
import {useSessionStorage} from '@/utils/storage';
import {STORE_IS_LOGIN, STORE_USER_INFO, STORE_TOKEN, STORE_PERMISSION} from '@/constants/storage';

const state = {
    isLogin: useSessionStorage().get(STORE_IS_LOGIN, false),
    userInfo: useSessionStorage().get(STORE_USER_INFO, null),
    token: useSessionStorage().get(STORE_TOKEN, ''),
    permission: useSessionStorage().get(STORE_PERMISSION, [])
};

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token,
    permission: state => state.permission
};

const mutations = {
    /**
     * 设置登录状态
     * @param state
     * @param {Boolean} isLogin
     * @constructor
     */
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin;
        isLogin
            ? useSessionStorage().set(STORE_IS_LOGIN, isLogin)
            : useSessionStorage().remove(STORE_IS_LOGIN);
    },
    /**
     * 设置用户信息
     * @param state
     * @param {object} userInfo
     * @constructor
     */
    SET_USER_INFO(state, userInfo = null) {
        state.userInfo = userInfo;
        userInfo
            ? useSessionStorage().set(STORE_USER_INFO, userInfo)
            : useSessionStorage().remove(STORE_USER_INFO);
    },
    /**
     * 设置 token
     * @param state
     * @param {string} token
     * @constructor
     */
    SET_TOKEN(state, token = '') {
        state.token = token;
        token
            ? useSessionStorage().set(STORE_TOKEN, token)
            : useSessionStorage().remove(STORE_TOKEN);
    },
    /**
     * 设置权限列表
     * @param state
     * @param {array} permission
     * @constructor
     */
    SET_PERMISSION(state, permission = null) {
        state.permission = permission;
        permission
            ? useSessionStorage().set(STORE_PERMISSION, permission)
            : useSessionStorage().remove(STORE_PERMISSION);
    }
};

const actions = {
    /**
     * 登录
     * @param commit
     * @param {string} username
     * @param {string} password
     * @returns {Promise<unknown>}
     */
    login({commit, dispatch, rootState}, params) {
        return new Promise(async (resolve, reject) => {
            const result = await api.user.login(params);
            const {code, data} = result;
            console.log(result);
            if ('200' === code) {
                const {username, token} = data;
                commit('SET_USER_INFO', {
                    username
                });
                commit('SET_TOKEN', token);
                commit('SET_IS_LOGIN', true);
            }
            resolve(result);
        });
    },
    /**
     * 退出登录
     * @param commit
     */
    logout({commit}) {
        return new Promise((resolve) => {
            commit('SET_IS_LOGIN', false);
            commit('SET_TOKEN', '');
            commit('SET_USER_INFO', null);
            commit('app/SET_COMPLETE', false, {root: true});
            resolve();
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
