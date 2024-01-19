import { useMultiTab } from '@/hooks'
import { onMounted } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

export default () => {
    const { getSimpleRoute, open } = useMultiTab()
    const router = useRouter()

    onBeforeRouteUpdate((to) => {
        open(getSimpleRoute(to))
    })

    onMounted(() => {
        open(getSimpleRoute(router.currentRoute.value))
    })
}
