<demo>
## 上传框
单一文件上传，不需要预览的图片或者位置格式的文件
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const file = ref('')
</script>

<template>
  <x-upload-input v-model="file" />
</template>

<style lang="less" scoped>
.custom {
  width: 240px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: @color-border dashed 1px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: @color-primary;
    color: @color-primary;
  }
}
</style>
<!-- #endregion snippet -->
