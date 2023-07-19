import { defineStore } from 'pinia'

import useRouterStore from './router'

const useAppStore = defineStore('app', {
    name: 'useAppStore',
    state: () => ({
        complete: false,
        config: {
            menuMode: 'side', // 菜单模式【side=侧边菜单，top=顶部菜单，mix=混合菜单】
            sideCollapsedWidth: 60,
            sideWidth: 220,
            headerHeight: 60,
            sideTheme: 'dark',
            headerTheme: 'light',
            multiTab: true,
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
