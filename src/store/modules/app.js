import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import useRouterStore from './router'
import { config } from '@/config'

const defaultConfig = {
    layout: 'topBottom', // 页面布局【topBottom=上下布局，leftRight=左右布局】
    menuMode: 'side', // 菜单模式【side=侧边菜单，top=顶部菜单，mix=混合菜单】
    sideCollapsedWidth: 60,
    sideWidth: 220,
    headerHeight: 60,
    sideTheme: 'light', // 侧边菜单主题【dark=暗色，light=亮色】
    headerTheme: 'light', // 侧边菜单主题【dark=暗色，light=亮色】
    multiTab: true,
}

const useAppStore = defineStore('app', {
    name: 'useAppStore',
    state: () => ({
        complete: false,
        config: storage.local.getItem(config('storage.config'), defaultConfig),
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

        /**
         * 更新 config
         */
        updateConfig() {
            storage.local.setItem(config('storage.config'), this.config)
        },
    },
})

export default useAppStore
