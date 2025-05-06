<demo>
## 纠错比例
通过设置 errorLevel 调整不同的容错等级
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
const segmentedData = ['L', 'M', 'Q', 'H']
const level = ref(segmentedData[0])
</script>

<template>
  <a-space
    :size="24"
    direction="vertical"
  >
    <x-qrcode
      :error-level="level"
      :value="text"
    />
    <a-segmented
      v-model:value="level"
      :options="segmentedData"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
