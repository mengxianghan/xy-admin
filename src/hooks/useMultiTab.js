import {useRouter} from 'vue-router'
import {nextTick} from 'vue'
import {useStore} from 'vuex'
import {cloneDeep} from 'lodash'

export default () => {
    const router = useRouter()
    const store = useStore()

    /**
     * 获取简易路由
     * @param route
     * @return {{fullPath, path, meta, query, name, href, params, hash}}
     * @private
     */
    function getSimpleRoute(route) {
        const {fullPath, hash, href, meta, name, params, path, query} = route
        return cloneDeep({fullPath, hash, href, meta, name, params, path, query})
    }

    /**
     * 打开
     * @param route
     */
    function open(route) {
        store.dispatch('multiTab/open', {
            route: getSimpleRoute(route),
        })
    }

    /**
     * 关闭
     * @param route
     */
    function close(route) {
        route = route || router.currentRoute.value
        store.dispatch('multiTab/close', {
            route: getSimpleRoute(route),
        })
    }

    /**
     * 关闭左侧
     * @param route
     */
    function closeLeft(route) {
        route = route || router.currentRoute.value
        store.dispatch('multiTab/closeLeft', {
            route: getSimpleRoute(route),
        }).then(({route}) => {
            router.push(route)
        })
    }

    /**
     * 关闭右侧
     * @param route
     */
    function closeRight(route) {
        route = route || router.currentRoute.value
        store.dispatch('multiTab/closeRight', {
            route: getSimpleRoute(route),
        }).then(({route}) => {
            router.push(route)
        })
    }

    /**
     * 关闭其他
     * @param route
     */
    function closeOther(route) {
        route = route || router.currentRoute.value
        store.dispatch('multiTab/closeOther', {
            route: getSimpleRoute(route),
        })
        if(route.fullPath !== router.currentRoute.value.fullPath){
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
            store.dispatch('multiTab/reload', {
                route: getSimpleRoute(route),
            })
            nextTick(() => {
                store.dispatch('multiTab/reload', {
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
        store.dispatch('multiTab/setTitle', {route, title})
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
