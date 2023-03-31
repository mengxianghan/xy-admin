import { computed } from 'vue'
import { useAppStore, useRouterStore } from '@/store'
import { useRoute } from 'vue-router'
import { get, head, omit } from 'lodash-es'

export default () => {
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const route = useRoute()

    // 左侧菜单
    const cpLeftMenuList = computed(() => {
        let result = []
        if ('left' === appStore.config.menuMode) {
            result = routerStore.menuList
        }
        // 组合菜单模式
        if ('combination' === appStore.config.menuMode) {
            result = get(head(route?.meta?._breadcrumb), 'children', [])
        }
        return result
    })

    // 顶部菜单
    const cpTopMenuList = computed(() => {
        let result = []
        // 顶部菜单模式
        if ('top' === appStore.config.menuMode) {
            result = routerStore.menuList
        }
        // 组合菜单模式
        if ('combination' === appStore.config.menuMode) {
            result = routerStore.menuList.map((item) => {
                return {
                    ...omit(item, ['children']),
                    path: '',
                    meta: {
                        ...item.meta,
                        callback: (res) => {
                            console.log(res)
                        },
                    },
                }
            })
        }
        return result
    })

    return {
        leftMenuList: cpLeftMenuList,
        topMenuList: cpTopMenuList,
    }
}
