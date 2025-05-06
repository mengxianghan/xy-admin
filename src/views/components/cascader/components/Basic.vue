<demo>
## 基础用法
主要解决 `ant-design-vue` 中 `Cascader` 使用远程加载数据时表单回填逻辑复杂的问题。
</demo>

<!-- #region snippet -->
<script setup>
import apis from '@/apis'
import { ref } from 'vue'

const selectedKeys = ref([])

async function getOptions() {
  return await apis.common.getOptions()
}
</script>

<template>
  <x-cascader
    v-model="selectedKeys"
    :level="3"
    :load-data="getOptions"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
