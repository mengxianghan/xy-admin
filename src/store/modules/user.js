import api from '@/api'
import {useSessionStorage} from '@/utils/storage'
import {STORAGE_IS_LOGIN, STORAGE_USER_INFO, STORAGE_TOKEN, STORAGE_PERMISSION} from '@/config/storage'

const state = {
    isLogin: useSessionStorage().get(STORAGE_IS_LOGIN, false),
    userInfo: useSessionStorage().get(STORAGE_USER_INFO, null),
    token: useSessionStorage().get(STORAGE_TOKEN, ''),
    permission: useSessionStorage().get(STORAGE_PERMISSION, [])
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token,
    permission: state => state.permission
}

const mutations = {
    /**
     * 设置登录状态
     * @param state
     * @param {Boolean} isLogin
     * @constructor
     */
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin
        isLogin
            ? useSessionStorage().set(STORAGE_IS_LOGIN, isLogin)
            : useSessionStorage().remove(STORAGE_IS_LOGIN)
    },
    /**
     * 设置用户信息
     * @param state
     * @param {object} userInfo
     * @constructor
     */
    SET_USER_INFO(state, userInfo = null) {
        state.userInfo = userInfo
        userInfo
            ? useSessionStorage().set(STORAGE_USER_INFO, userInfo)
            : useSessionStorage().remove(STORAGE_USER_INFO)
    },
    /**
     * 设置 token
     * @param state
     * @param {string} token
     * @constructor
     */
    SET_TOKEN(state, token = '') {
        state.token = token
        token
            ? useSessionStorage().set(STORAGE_TOKEN, token)
            : useSessionStorage().remove(STORAGE_TOKEN)
    },
    /**
     * 设置权限列表
     * @param state
     * @param {array} permission
     * @constructor
     */
    SET_PERMISSION(state, permission = null) {
        state.permission = permission
        permission
            ? useSessionStorage().set(STORAGE_PERMISSION, permission)
            : useSessionStorage().remove(STORAGE_PERMISSION)
    }
}

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
            const result = await api.user.login(params)
            const {code, data} = result
            if ('200' === code) {
                const {username, token} = data
                commit('SET_USER_INFO', {
                    username
                })
                commit('SET_TOKEN', token)
                commit('SET_IS_LOGIN', true)
            }
            resolve(result)
        })
    },
    /**
     * 退出登录
     * @param commit
     */
    logout({commit}) {
        return new Promise((resolve) => {
            commit('SET_IS_LOGIN', false)
            commit('SET_TOKEN', '')
            commit('SET_USER_INFO', null)
            commit('app/SET_COMPLETE', false, {root: true})
            resolve()
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
