import { get, head, omit } from 'lodash-es'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useAppStore, useRouterStore } from '@/store'

export default () => {
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const route = useRoute()

    const sideMenuList = ref([])
    const topMenuList = ref([])

    watch(
        () => appStore.config.menuMode,
        (val) => {
            // 顶部菜单
            if ('top' === val) {
                topMenuList.value = routerStore.menuList
            }
            // 侧边菜单
            if ('side' === val) {
                sideMenuList.value = routerStore.menuList
            }
            // 混合菜单
            if ('mix' === val) {
                topMenuList.value = routerStore.menuList.map((item) => {
                    return {
                        ...omit(item, ['children']),
                        path: item.children ? '' : item.path,
                        props: {
                            children: item.children,
                            click: (res) => {
                                sideMenuList.value = res?.props?.children || []
                            },
                        },
                    }
                })
                sideMenuList.value = get(head(route?.meta?._breadcrumb), 'children', [])
            }
        },
        { immediate: true }
    )

    return {
        sideMenuList,
        topMenuList,
    }
}
