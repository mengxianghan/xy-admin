import { useProgress } from '@/hooks'
import { whiteList } from '@/router/config'
import { useAppStore, useUserStore } from '@/store'
import router from '@/router'

const progress = useProgress()

function checkPath(path) {
    return ['/'].includes(path)
}

router.beforeEach((to, from, next) => {
    const { meta } = to
    const { title } = meta
    const appStore = useAppStore()
    const userStore = useUserStore()
    const isLogin = userStore.isLogin
    const complete = appStore.complete

    progress.start()

    // 设置标题
    document.title = title ? `${title} - ${import.meta.env.VITE_TITLE}` : import.meta.env.VITE_TITLE

    if (whiteList.includes(to.name)) {
        // 在白名单
        next()
    } else {
        // 判断当前登录状态
        if (isLogin) {
            // 已登录
            if (complete) {
                // 初始化完成
                if (checkPath(to.path)) {
                    userStore.goIndex({ welcomeMsg: false }).catch(() => {
                        userStore.logout()
                        next({ name: 'login', replace: true })
                    })
                } else {
                    next()
                }
            } else {
                // 初始化未加载完成
                appStore.init().then(() => {
                    next({ ...to, replace: true })
                })
            }
        } else {
            // 未登录
            const query = {}
            if (!checkPath(to.path)) {
                query.redirect = encodeURIComponent(location.href)
            }
            next({
                name: 'login',
                replace: true,
                query,
            })
        }
    }
})

router.afterEach(() => {
    progress.done()
})
