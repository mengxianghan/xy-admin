<demo>
## 不限
使用 `unlimited` 启用不限选项
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const options = ref([
  { label: '不限', value: 0, unlimited: true },
  { label: '类目1', value: 1 },
  { label: '类目2', value: 2 },
  { label: '类目3', value: 3 },
  { label: '类目4', value: 4 },
  { label: '类目5', value: 5 },
  { label: '类目6', value: 6 },
])
const selectedKeys = ref([0])
</script>

<template>
  <x-tag-select
    v-model="selectedKeys"
    :options="options"
    multiple
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
