import { defineStore } from 'pinia'

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
                Promise.all([routerStore.getRouterList()])
                    .then(() => {
                        this.complete = true
                        resolve()
                    })
                    .catch(() => {})
            })
        },
    },
})

export default useAppStore
