<demo>
## 裁剪
上传完成后进行裁剪
</demo>

<!-- #region snippet -->
<template>
    <x-upload-image
        v-model="images"
        :aspect-ratio="1"
        cropper
        text="开启裁剪"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
