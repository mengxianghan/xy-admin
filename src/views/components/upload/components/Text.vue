<demo>
## 自定义文案
自定义文案
</demo>

<!-- #region snippet -->
<template>
    <x-upload-image
        v-model="images"
        text="选择图片"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
