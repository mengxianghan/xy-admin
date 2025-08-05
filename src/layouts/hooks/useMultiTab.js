import { onMounted } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useMultiTab } from '@/hooks'

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
