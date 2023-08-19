import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import useRouterStore from './router'
import { config } from '@/config'

const defaultConfig = {
    layout: 'leftRight', // 页面布局【topBottom=上下布局，leftRight=左右布局】
    menuMode: 'side', // 菜单模式【side=侧边菜单，top=顶部菜单，mix=混合菜单】
    sideCollapsedWidth: 60,
    sideWidth: 220,
    headerHeight: 60,
    sideTheme: 'dark', // 侧边菜单主题【dark=暗色，light=亮色】
    headerTheme: 'light', // 侧边菜单主题【dark=暗色，light=亮色】
    multiTab: true,
    multiTabHeight: 48,
    mainMargin: 16,
}

const useAppStore = defineStore('app', {
    name: 'useAppStore',
    state: () => ({
        complete: false,
        config: storage.session.getItem(config('storage.config'), defaultConfig),
    }),
    getters: {
        mainOffsetTop: (state) => {
            const multiTabHeight = state.config?.multiTab ? `${state.config.multiTabHeight}px` : '0px'
            return `calc(${state.config.headerHeight}px + ${multiTabHeight} + ${state.config.mainMargin}px)`
        },
        mainHeight: (state) => {
            const multiTabHeight = state.config?.multiTab ? `${state.config.multiTabHeight}px` : '0px'
            return `calc(100vh - ${state.config.headerHeight}px - ${multiTabHeight} - ${state.config.mainMargin * 2}px)`
        },
    },
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
            storage.session.setItem(config('storage.config'), this.config)
        },
    },
})

export default useAppStore
