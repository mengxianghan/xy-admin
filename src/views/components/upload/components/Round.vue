<demo>
## 圆角
圆角
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<template>
  <x-upload-image
    v-model="images"
    round
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
