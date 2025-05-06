<script setup>
defineOptions({
  name: '403',
})
</script>

<template>
  <a-result
    status="403"
    sub-title="抱歉，您无权访问此页面。"
    title="403"
  >
    <template #extra>
      <a-button type="primary">
        返回
      </a-button>
    </template>
  </a-result>
</template>

<style lang="less" scoped></style>
