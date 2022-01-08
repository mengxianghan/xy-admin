import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRouterMap} from '@/router/config'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...constantRouterMap
    ]
})

export default router
