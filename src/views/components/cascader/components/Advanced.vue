<demo>
## 高级用法
不同层级使用不同的数据接口。用于特殊场景的级联选择
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
    :load-data="[getOptions, getOptions, getOptions]"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
