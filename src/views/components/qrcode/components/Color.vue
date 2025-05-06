<demo>
## 自定义颜色
通过设置 `color` 自定义二维码颜色
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<template>
  <a-space :size="24">
    <x-qrcode
      :value="text"
      color="#72c240"
    />
    <x-qrcode
      :value="text"
      color="#3875f7"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
