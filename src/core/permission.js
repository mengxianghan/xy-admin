import { whiteList } from '@/router/config'

import { useAppStore, useUserStore } from '@/store'

import router from '@/router'

router.beforeEach((to, from, next) => {
    const { meta } = to
    const { title } = meta
    const appStore = useAppStore()
    const userStore = useUserStore()
    const isLogin = userStore.isLogin
    const complete = appStore.complete

    // 设置标题
    document.title = title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE

    if (whiteList.includes(to.name)) {
        // 在白名单
        next()
    } else {
        // 判断当前登录状态
        if (isLogin) {
            // 已登录
            if (complete) {
                // 初始化完成
                next()
            } else {
                // 初始化未加载完成
                appStore.init().then(() => {
                    next({ ...to, replace: true })
                })
            }
        } else {
            // 未登录
            next({
                name: 'login',
                replace: true,
                query: { redirect: encodeURIComponent(location.href) },
            })
        }
    }
})

router.afterEach(() => {})
