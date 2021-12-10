import router from '@/router'
import store from '@/store'
import {whiteList} from '@/router/router.config'

router.beforeEach((to, form, next) => {
    if (whiteList.includes(to.name)) {
        // 在白名单
        next()
    } else {
        // 需要登录
        if (store.getters['user/isLogin']) {
            // 已登录
            if (store.getters['app/complete']) {
                // 初始化完成
                next()
            } else {
                // 初始化未加载完成
                store.dispatch('app/init').then(() => {
                    next({...to, replace: true})
                })
            }
        } else {
            // 未登录
            next({name: 'login', replace: true})
        }
    }
})

router.afterEach(() => {
})
