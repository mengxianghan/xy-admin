import { defineStore } from 'pinia'
import { loading } from '@/components'

import useRouterStore from './router'

const useAppStore = defineStore('app', {
    name: 'useAppStore',
    state: () => ({
        complete: false,
    }),
    getters: {},
    actions: {
        /**
         * 初始化
         * @returns {Promise}
         */
        init() {
            const routerStore = useRouterStore()
            return new Promise((resolve) => {
                loading()
                Promise.all([routerStore.getRouterList()])
                    .then(() => {
                        loading.close()
                        this.complete = true
                        resolve()
                    })
                    .catch(() => {
                        loading.close()
                    })
            })
        },
    },
})

export default useAppStore
