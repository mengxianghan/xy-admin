import { find, get, head, omit } from 'lodash-es'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAppStore, useRouterStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getFirstValidRoute } from '../../router/util'

export default () => {
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const route = useRoute()
    const router = useRouter()

    const { menuList } = storeToRefs(routerStore)
    const sideMenuList = ref([])
    const topMenuList = ref([])

    watch(
        () => appStore.config.menuMode,
        (val) => {
            // 顶部菜单
            if ('top' === val) {
                topMenuList.value = menuList.value
            }
            // 侧边菜单
            if ('side' === val) {
                sideMenuList.value = menuList.value
            }
            // 混合菜单
            if ('mix' === val) {
                topMenuList.value = menuList.value.map((item) => {
                    return {
                        ...omit(item, ['children']),
                        path: item.children ? '' : item.path,
                        props: {
                            children: item.children,
                            click: (res) => {
                                sideMenuList.value = res?.props?.children || []
                                // 获取侧边栏第一个有效路由
                                const firstRoute = getFirstValidRoute(sideMenuList.value)
                                if (firstRoute) {
                                    // 如果第一个路由是外部链接，则不跳转
                                    if (firstRoute?.meta?.isLink) return
                                    // 跳转到符合条件的路由中
                                    router.push({
                                        path: firstRoute.path,
                                        query: firstRoute?.meta?.query || {},
                                    })
                                }
                            },
                        },
                    }
                })
                const parentName = get(head(route?.meta?.breadcrumb), 'name', '')
                sideMenuList.value = get(find(menuList.value, { name: parentName }), 'children', [])
            }
        },
        { immediate: true }
    )

    return {
        sideMenuList,
        topMenuList,
    }
}
