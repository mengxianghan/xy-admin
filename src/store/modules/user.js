import { defineStore } from 'pinia'
import { useLocal } from '@/utils/storage'
import { STORAGE_IS_LOGIN, STORAGE_USER_INFO, STORAGE_TOKEN, STORAGE_PERMISSION } from '@/config/storage'

import useAppStore from './app'
import api from '@/api'

const local = useLocal()

const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: local.get(STORAGE_IS_LOGIN, false),
        userInfo: local.get(STORAGE_USER_INFO, null),
        token: local.get(STORAGE_TOKEN, ''),
        permission: local.get(STORAGE_PERMISSION, []),
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
                    const result = await api.user.login(params).catch(() => {
                        reject()
                    })
                    const { code, data } = result
                    if (200 === code) {
                        const { token, ...others } = data
                        const isLogin = true
                        this.$patch({
                            userInfo: others,
                            token,
                            isLogin,
                        })
                        local.set(STORAGE_USER_INFO, others)
                        local.set(STORAGE_TOKEN, token)
                        local.set(STORAGE_IS_LOGIN, isLogin)
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
                local.remove(STORAGE_IS_LOGIN)
                local.remove(STORAGE_TOKEN)
                local.remove(STORAGE_USER_INFO)
                appStore.complete = false
                resolve()
            })
        },
    },
})

export default useUserStore
