import { defineStore } from 'pinia'
import { config } from '@/config'
import storage from '@/utils/storage'
import apis from '@/apis'

import useAppStore from './app'

const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: storage.local.getItem(config('storage.isLogin'), false),
        userInfo: storage.local.getItem(config('storage.userInfo'), null),
        token: storage.local.getItem(config('storage.token'), ''),
        permission: storage.local.getItem(config('storage.permission'), []),
    }),
    getters: {},
    actions: {
        /**
         * 登录
         * @param {object} params
         * @returns {Promise<unknown>}
         */
        login(params) {
            return new Promise((resolve, reject) => {
                ;(async () => {
                    const result = await apis.user.login(params).catch(() => {
                        reject()
                    })
                    const { code, data } = result
                    if (config('http.code.success') === code) {
                        const { token, ...others } = data
                        const isLogin = true
                        this.$patch({
                            userInfo: others,
                            token,
                            isLogin,
                        })
                        storage.local.setItem(config('storage.userInfo'), others)
                        storage.local.setItem(config('storage.token'), token)
                        storage.local.setItem(config('storage.isLogin'), isLogin)
                    }
                    resolve(result)
                })()
            })
        },
        /**
         * 退出登录
         */
        logout() {
            return new Promise((resolve) => {
                const appStore = useAppStore()
                this.$patch({
                    isLogin: false,
                    token: '',
                    userInfo: null,
                })
                storage.local.removeItem(config('storage.isLogin'))
                storage.local.removeItem(config('storage.token'))
                storage.local.removeItem(config('storage.userInfo'))
                appStore.complete = false
                resolve()
            })
        },
    },
})

export default useUserStore
