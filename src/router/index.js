import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from './config'

const { VUE_APP_ROUTER_HISTORY, VUE_APP_PUBLIC_PATH } = process.env

const router = createRouter({
    history:
        'history' === VUE_APP_ROUTER_HISTORY
            ? createWebHistory(VUE_APP_PUBLIC_PATH)
            : createWebHashHistory(VUE_APP_PUBLIC_PATH),
    routes: [...constantRouterMap],
})

export function setupRouter(app) {
    app.use(router)
    return app
}

export default router
