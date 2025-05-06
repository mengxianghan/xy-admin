<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: '404',
})

const router = useRouter()

function handleBack() {
  router.back()
}
</script>

<template>
  <a-result
    status="404"
    sub-title="很抱歉，您访问的页面不存在。"
    title="404"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="handleBack"
      >
        返回
      </a-button>
    </template>
  </a-result>
</template>

<style lang="less" scoped></style>
