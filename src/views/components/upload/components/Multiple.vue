<demo>
## 批量上传
`multiple` 启用批量上传，`draggable` 启用拖拽排序
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const images = ref([])
</script>

<template>
  <x-upload-image
    v-model="images"
    draggable
    multiple
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
