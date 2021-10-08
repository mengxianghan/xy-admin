import {createRouter, createWebHistory} from 'vue-router';
import {constantRouterMap} from '@/router/router.config';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.VUE_APP_ROUTER_BASE,
    routes: [
        ...constantRouterMap
    ]
});

export function setupRouter(app) {
    app.use(router);
}

export default router;
