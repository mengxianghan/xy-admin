import {XLoading} from '@/plugins/XLoading'

const state = {
    complete: false
}

const getters = {
    complete: state => state.complete
}

const mutations = {
    /**
     * 设置初始化完成状态
     * @param state
     * @param complete
     * @constructor
     */
    SET_COMPLETE(state, complete = false) {
        state.complete = complete
    }
}

const actions = {
    /**
     * 初始化
     * @param dispatch
     * @returns {Promise}
     */
    init({commit, dispatch}) {
        return new Promise((resolve) => {
            XLoading.show()
            Promise.all([
                dispatch('router/getRouterList', null, {root: true})
            ]).then(() => {
                XLoading.hide()
                commit('SET_COMPLETE', true)
                resolve()
            }).catch(() => {
                XLoading.hide()
            })
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
