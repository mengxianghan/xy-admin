<demo>
## 高级用法
带气泡卡片的例子。
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<template>
  <a-popover :overlay-inner-style="{ padding: 0 }">
    <template #content>
      <x-qrcode
        :bordered="false"
        :value="text"
      />
    </template>
    <a-button>点击查看</a-button>
  </a-popover>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
