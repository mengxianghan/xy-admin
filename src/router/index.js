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

export const setupRouter = (app) => {
    app.use(router)
    return app
}

export default router
