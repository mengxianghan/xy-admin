import { defineStore } from 'pinia'

import apis from '@/apis'
import { CODE_SUCCESS } from '@/config/http'
import { STORAGE_IS_LOGIN, STORAGE_PERMISSION, STORAGE_TOKEN, STORAGE_USER_INFO } from '@/config/storage'
import { useStorage } from '@/utils/storage'

import useAppStore from './app'

const { local } = useStorage()

const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: local.getItem(STORAGE_IS_LOGIN, false),
        userInfo: local.getItem(STORAGE_USER_INFO, null),
        token: local.getItem(STORAGE_TOKEN, ''),
        permission: local.getItem(STORAGE_PERMISSION, []),
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
                    if (CODE_SUCCESS === code) {
                        const { token, ...others } = data
                        const isLogin = true
                        this.$patch({
                            userInfo: others,
                            token,
                            isLogin,
                        })
                        local.setItem(STORAGE_USER_INFO, others)
                        local.setItem(STORAGE_TOKEN, token)
                        local.setItem(STORAGE_IS_LOGIN, isLogin)
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
                local.removeItem(STORAGE_IS_LOGIN)
                local.removeItem(STORAGE_TOKEN)
                local.removeItem(STORAGE_USER_INFO)
                appStore.complete = false
                resolve()
            })
        },
    },
})

export default useUserStore
