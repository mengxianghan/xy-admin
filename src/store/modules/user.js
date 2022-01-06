import storage, {STORE_IS_LOGIN, STORE_USER_INFO, STORE_TOKEN, STORE_PERMISSION} from '@/utils/storage'
import {login} from '@/api/modules/user'

const state = {
    isLogin: storage.session.get(STORE_IS_LOGIN, false),
    userInfo: storage.session.get(STORE_USER_INFO, null),
    token: storage.session.get(STORE_TOKEN, ''),
    permission: storage.session.get(STORE_PERMISSION, [])
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
            ? storage.session.set(STORE_IS_LOGIN, isLogin)
            : storage.session.remove(STORE_IS_LOGIN)
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
            ? storage.session.set(STORE_USER_INFO, userInfo)
            : storage.session.remove(STORE_USER_INFO)
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
            ? storage.session.set(STORE_TOKEN, token)
            : storage.session.remove(STORE_TOKEN)
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
            ? storage.session.set(STORE_PERMISSION, permission)
            : storage.session.remove(STORE_PERMISSION)
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
            const result = await login(params).catch(() => {
                reject()
            })
            const {code, data} = result
            if (code === '200') {
                const {username, token} = data
                commit('SET_USER_INFO', {
                    username
                })
                commit('SET_IS_LOGIN', true)
                commit('SET_TOKEN', token)
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
            commit('SET_USER_INFO', null)
            commit('SET_IS_LOGIN', false)
            commit('SET_TOKEN', '')
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
