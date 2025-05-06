<script setup>
import { Form as AForm } from 'ant-design-vue'

defineOptions({
  name: 'XFilter',
})
</script>

<template>
  <a-form class="x-filter">
    <slot />
  </a-form>
</template>

<style lang="less" scoped>
.x-filter {
  :deep(.ant-form-item) {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    .ant-form-item-control-input-content {
      line-height: 32px;
    }
  }
}
</style>
