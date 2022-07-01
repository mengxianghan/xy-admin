import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from './config'

const { VITE_ROUTER_HISTORY, VITE_PUBLIC_PATH } = import.meta.env

const router = createRouter({
    history:
        'history' === VITE_ROUTER_HISTORY
            ? createWebHistory(VITE_PUBLIC_PATH)
            : createWebHashHistory(VITE_PUBLIC_PATH),
    routes: [...constantRouterMap],
})

export function setupRouter(app) {
    app.use(router)
    return app
}

export default router
