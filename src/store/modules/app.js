import { defineStore } from 'pinia'

import useRouterStore from './router'

const useAppStore = defineStore('app', {
    name: 'useAppStore',
    state: () => ({
        complete: false,
        config: {
            menuMode: 'combination', // 菜单模式【left=左侧菜单，top=顶部菜单，combination=组合菜单】
            side: {
                collapsedWidth: 48,
                width: 208,
            },
            header: {
                height: 48,
            },
        },
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
