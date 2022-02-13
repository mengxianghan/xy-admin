import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import {constantRouterMap} from '@/config/router'

const {VUE_APP_ROUTER_HISTORY, VUE_APP_ROUTER_BASE} = process.env

const router = createRouter({
    history: 'history' === VUE_APP_ROUTER_HISTORY ? createWebHistory(VUE_APP_ROUTER_BASE) : createWebHashHistory(VUE_APP_ROUTER_BASE),
    routes: [
        ...constantRouterMap,
    ],
})

export function setupRouter(app) {
    app.use(router)
}

export default router
