<demo>
## 自定义文案
自定义文案
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<template>
  <x-upload-image
    v-model="images"
    text="选择图片"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
