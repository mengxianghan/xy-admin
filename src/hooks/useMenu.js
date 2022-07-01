import { useRouterStore } from '@/store'

export default () => {
    const routerStore = useRouterStore()

    /**
     * 设置徽标
     * @param {string} name 路由名称
     * @param {number} count 数量
     */
    function setBadge(name, count) {
        routerStore.setBadge({ name, count })
    }

    return {
        setBadge,
    }
}
