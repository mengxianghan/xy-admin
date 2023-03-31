import { watch, ref } from 'vue'
import { useAppStore, useRouterStore } from '@/store'
import { useRoute } from 'vue-router'
import { get, head, omit } from 'lodash-es'

export default () => {
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const route = useRoute()

    const leftMenuList = ref([])
    const topMenuList = ref([])

    watch(
        () => appStore.config.menuMode,
        (val) => {
            if ('top' === val) {
                topMenuList.value = routerStore.menuList
            }
            if ('left' === val) {
                leftMenuList.value = routerStore.menuList
            }
            // 组合菜单模式
            if ('combination' === val) {
                topMenuList.value = routerStore.menuList.map((item) => {
                    return {
                        ...omit(item, ['children']),
                        path: item.children ? '' : item.path,
                        combination: {
                            children: item.children,
                            callback: (res) => {
                                leftMenuList.value = res?.combination?.children || []
                            },
                        },
                    }
                })
                leftMenuList.value = get(head(route?.meta?._breadcrumb), 'children', [])
            }
        },
        { immediate: true }
    )

    // // 左侧菜单
    // const cpLeftMenuList = computed(() => {
    //     let result = []
    //     if ('left' === appStore.config.menuMode) {
    //         result = routerStore.menuList
    //     }
    //     // 组合菜单模式
    //     if ('combination' === appStore.config.menuMode) {
    //         result = get(head(route?.meta?._breadcrumb), 'children', [])
    //     }
    //     return result
    // })

    // // 顶部菜单
    // const cpTopMenuList = computed(() => {
    //     let result = []
    //     // 顶部菜单模式
    //     if ('top' === appStore.config.menuMode) {
    //         result = routerStore.menuList
    //     }
    //     // 组合菜单模式
    //     if ('combination' === appStore.config.menuMode) {
    //         result = routerStore.menuList.map((item) => {
    //             return {
    //                 ...omit(item, ['children']),
    //                 path: '',
    //                 meta: {
    //                     ...item.meta,
    //                     callback: (res) => {
    //                         console.log(res)
    //                     },
    //                 },
    //             }
    //         })
    //     }
    //     return result
    // })

    return {
        leftMenuList,
        topMenuList,
    }
}
