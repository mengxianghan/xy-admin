<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<template>
  <a-space :size="24">
    <x-upload-image v-model="images" />

    <x-upload-image
      v-model="images"
      :width="200"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
