<demo>
## 圆角
圆角
</demo>

<!-- #region snippet -->
<template>
    <x-upload-image
        v-model="images"
        round></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
