import { defineStore } from 'pinia'

import apis from '@/apis'
import { config } from '@/config'
import { useStorage } from '@/utils/storage'

import useAppStore from './app'

const { local } = useStorage()

const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: local.getItem(config('storage.isLogin'), false),
        userInfo: local.getItem(config('storage.userInfo'), null),
        token: local.getItem(config('storage.token'), ''),
        permission: local.getItem(config('storage.permission'), []),
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
                        local.setItem(config('storage.userInfo'), others)
                        local.setItem(config('storage.token'), token)
                        local.setItem(config('storage.isLogin'), isLogin)
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
                local.removeItem(config('storage.isLogin'))
                local.removeItem(config('storage.token'))
                local.removeItem(config('storage.userInfo'))
                appStore.complete = false
                resolve()
            })
        },
    },
})

export default useUserStore
