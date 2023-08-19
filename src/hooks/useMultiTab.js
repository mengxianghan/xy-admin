import { cloneDeep } from 'lodash-es'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { useMultiTabStore } from '@/store'

export default () => {
    const multiTabStore = useMultiTabStore()
    const router = useRouter()

    /**
     * 获取简易路由
     * @param route
     * @return {{fullPath, path, meta, query, name, href, params, hash}}
     * @private
     */
    function getSimpleRoute(route) {
        const { fullPath, hash, href, meta, name, params, path, query } = router.resolve(route)
        return cloneDeep({ fullPath, hash, href, meta, name, params, path, query })
    }

    /**
     * 打开
     * @param route
     */
    function open(route) {
        multiTabStore.open({
            route: getSimpleRoute(route),
        })
    }

    /**
     * 关闭
     * @param route
     */
    function close(route) {
        return new Promise((resolve) => {
            route = route || router.currentRoute.value
            multiTabStore.close({
                route: getSimpleRoute(route),
            })
            resolve(router)
        })
    }

    /**
     * 关闭左侧
     * @param route
     */
    function closeLeft(route) {
        route = route || router.currentRoute.value
        multiTabStore
            .closeLeft({
                route: getSimpleRoute(route),
            })
            .then(({ route }) => {
                router.push(route)
            })
    }

    /**
     * 关闭右侧
     * @param route
     */
    function closeRight(route) {
        route = route || router.currentRoute.value
        multiTabStore
            .closeRight({
                route: getSimpleRoute(route),
            })
            .then(({ route }) => {
                router.push(route)
            })
    }

    /**
     * 关闭其他
     * @param route
     */
    function closeOther(route) {
        route = route || router.currentRoute.value
        multiTabStore.closeOther({
            route: getSimpleRoute(route),
        })
        if (route.fullPath !== router.currentRoute.value.fullPath) {
            router.push(route)
        }
    }

    /**
     * 重新加载
     * @param route
     */
    function reload(route) {
        route = route || router.currentRoute.value
        // 判断是否当前路由
        if (route.fullPath !== router.currentRoute.value.fullPath) {
            // 不是当前路由，跳转到指定路由
            router.push(getSimpleRoute(route))
        }
        setTimeout(() => {
            multiTabStore.reload({
                route: getSimpleRoute(route),
            })
            nextTick(() => {
                multiTabStore.reload({
                    route: getSimpleRoute(route),
                })
            })
        }, 0)
    }

    /**
     * 设置标题
     * @param title
     * @param route
     */
    function setTitle(title, route) {
        route = getSimpleRoute(route || router.currentRoute.value)
        multiTabStore.setTitle({ route, title })
    }

    return {
        getSimpleRoute,
        open,
        close,
        closeLeft,
        closeRight,
        closeOther,
        reload,
        setTitle,
    }
}
