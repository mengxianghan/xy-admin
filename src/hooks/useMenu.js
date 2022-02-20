import {useStore} from 'vuex'

export default () => {
    const store = useStore()

    /**
     * 设置徽标
     * @param {string} name 路由名称
     * @param {number} count 数量
     */
    function setBadge(name, count) {
        store.dispatch('router/setBadge', {name, count})
    }

    return {
        setBadge,
    }
}