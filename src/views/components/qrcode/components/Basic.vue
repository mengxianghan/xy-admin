<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<template>
  <a-space
    :size="24"
    direction="vertical"
  >
    <x-qrcode :value="text" />
    <a-input
      v-model:value="text"
      :maxlength="60"
      placeholder="-"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
