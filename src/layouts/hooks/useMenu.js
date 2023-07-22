// eslint-disable-next-line no-unused-vars
import { find, get, head, omit } from 'lodash-es'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAppStore, useRouterStore } from '@/store'
import { storeToRefs } from 'pinia'

export default () => {
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    // eslint-disable-next-line no-unused-vars
    const route = useRoute()
    // eslint-disable-next-line no-unused-vars
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
                            },
                        },
                    }
                })
                const parentName = get(head(route?.meta?._breadcrumb), 'name', '')
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
