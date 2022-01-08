import router from '@/router'
import {message} from 'ant-design-vue'
import {cloneDeep, findIndex} from 'lodash'

const state = {
    list: [],
    cacheList: [],
    iframeList: [],
    current: 0,
    keepAlive: true,
}

const getters = {
    list: state => state.list,
    cacheList: state => state.cacheList,
    iframeList: state => state.iframeList,
    current: state => state.current,
    keepAlive: state => state.keepAlive,
}

const mutations = {
    /**
     * 更新 current
     * @param state
     * @param current
     * @constructor
     */
    UPDATE_CURRENT(state, current) {
        state.current = current
    },
    /**
     * 更新列表
     * @param state
     * @param index
     * @param length
     * @param value
     * @constructor
     */
    UPDATE_LIST(state, {index, length, value}) {
        // 判断是否第一个标签页
        if (state.list.length) {
            // 不是第一个标签页，判断是删除还是替换
            if (value) {
                // 替换
                state.list.splice(index, length, value)
            } else {
                // 删除
                state.list.splice(index, length)
            }
        } else {
            // 是第一个标签页
            state.list.push(value)
        }
        // 更新缓存列表
        state.cacheList = state.list.filter(item => item?.meta?.keepAlive).map(item => item.name)
    },
    /**
     * 更新缓存列表
     * @param state
     * @param route
     * @constructor
     */
    UPDATE_CACHE_LIST(state, {route}) {
        const index = findIndex(state.cacheList, o => o === route.name)
        // 判断是移除或添加
        if (index > -1) {
            // 已存在，执行移除操作
            state.cacheList.splice(index, 1)
            state.keepAlive = false
        } else {
            // 不存在，执行添加操作
            state.cacheList.push(route.name)
            state.keepAlive = true
        }
    },
    /**
     * 更新 iframe 列表
     * @param state
     * @param iframeList
     * @constructor
     */
    UPDATE_IFRAME_LIST(state, {iframeList}) {
        state.iframeList = iframeList
    },
}

const actions = {
    /**
     * 打开
     * @param commit
     * @param state
     * @param route
     */
    open({commit, state}, {route} = {}) {
        const index = findIndex(state.list, {path: route?.path})
        // 判断是否已存在
        if (index > -1) {
            // 已存在
            commit('UPDATE_CURRENT', index)
            commit(
                'UPDATE_LIST',
                {
                    index,
                    length: 1,
                    value: route,
                },
            )
        } else {
            // 不存在，判断是否第一个标签页
            if (state.list.length) {
                // 不是第一个标签页
                commit(
                    'UPDATE_LIST',
                    {
                        index: state.current + 1,
                        length: 0,
                        value: route,
                    },
                )
                commit('UPDATE_CURRENT', state.current + 1)
            } else {
                // 是第一个标签页
                commit(
                    'UPDATE_LIST',
                    {
                        value: route,
                    },
                )
                commit('UPDATE_CURRENT', 0)
            }
            // 打开的标签页是 iframe
            //if ('iframe' === route?.meta?.type) {
            //    commit(
            //        'UPDATE_IFRAME_LIST',
            //        {
            //            iframeList: [...state.iframeList, route],
            //        },
            //    )
            //}
        }
    },
    /**
     * 关闭
     * @param commit
     * @param state
     * @param route
     */
    close({commit, state}, {route} = {}) {
        // 如果未传入路由，则默认当前路由
        route = route || state.list[state.current]
        const index = findIndex(state.list, {path: route?.path})
        // 判断是否最后一个标签页
        if (state.list.length === 1) {
            // 是最后又给标签页，禁止删除
            message.warning('至少保留一个标签页')
            return
        }
        commit(
            'UPDATE_LIST',
            {
                index,
                length: 1,
            },
        )
        // 关闭当前标签页
        if (state.current === index) {
            // 关闭最右侧标签页
            if (state.current === state.list.length) {
                commit('UPDATE_CURRENT', state.current - 1)
            }
            router.push(state.list[state.current])
        }
        // 关闭左侧标签页
        if (state.current > index) {
            commit('UPDATE_CURRENT', state.current - 1)
        }
        // 关闭的标签页是 iframe
        //if ('iframe' === route?.meta?.type) {
        //    const iframeIndex = findIndex(state.iframeList, {path: route?.path})
        //    const iframeList = cloneDeep(state.iframeList)
        //    if (iframeIndex > -1) {
        //        iframeList.splice(iframeIndex, 1)
        //    }
        //    commit(
        //        'UPDATE_IFRAME_LIST',
        //        {
        //            iframeList,
        //        },
        //    )
        //}
    },
    /**
     * 关闭左侧
     * @param state
     * @param commit
     * @param dispatch
     * @param route
     */
    closeLeft({state, commit, dispatch}, {route} = {}) {
        return new Promise((resolve) => {
            const index = findIndex(state.list, {path: route?.path})
            commit(
                'UPDATE_LIST',
                {
                    index: 0,
                    length: index,
                },
            )
            if (state.current <= index) {
                commit('UPDATE_CURRENT', 0)
            } else {
                commit('UPDATE_CURRENT', state.current - index)
            }
            if (state.current < index) {
                resolve({route})
            }
        })
        // 关闭的标签页中是否包含 iframe
        //const closeTabList = state.list.slice(1, index)
    },
    /**
     * 关闭右侧
     * @param commit
     * @param state
     * @param route
     */
    closeRight({commit, state}, {route} = {}) {
        return new Promise((resolve) => {
            const index = findIndex(state.list, {path: route?.path})
            const length = state.list.length - index
            commit(
                'UPDATE_LIST',
                {
                    index: index + 1,
                    length,
                },
            )
            if (state.current > index) {
                commit('UPDATE_CURRENT', index)
                resolve({route})
            }
        })
    },
    /**
     * 关闭其他
     * @param commit
     * @param route
     */
    closeOther({commit}, {route} = {}) {
        commit(
            'UPDATE_LIST',
            {
                index: 0,
                length: state.list.length,
                value: route,
            },
        )
        commit('UPDATE_CURRENT', 0)
    },
    /**
     * 刷新
     * @param commit
     * @param route
     */
    reload({commit}, {route}) {
        if (route?.meta?.keepAlive) {
            commit('UPDATE_CACHE_LIST', {route})
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
