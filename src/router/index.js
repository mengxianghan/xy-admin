import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { constantRoutes } from './config'
import { config } from '@/config'

const router = createRouter({
    history:
        'history' === config('router.history')
            ? createWebHistory(config('router.base'))
            : createWebHashHistory(config('router.base')),
    routes: [...constantRoutes],
})

/**
 * 打开新标签页
 * @param to
 */
router.open = function (to) {
    const { href } = router.resolve(to)
    if (!href) return
    window.open(href)
}

/**
 * 重新启动
 * @param to
 */
router.reLaunch = function (to) {
    const { href } = router.resolve(to)
    if (!href) return
    window.location.href = href
}

export const setupRouter = (app) => {
    app.use(router)
    return app
}

export default router
