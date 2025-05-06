<demo>
## 裁剪
上传完成后进行裁剪
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<template>
  <x-upload-image
    v-model="images"
    :aspect-ratio="1"
    cropper
    text="开启裁剪"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
