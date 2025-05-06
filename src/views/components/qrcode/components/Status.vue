<demo>
## 不同的状态
可以通过 status 的值控制二维码的状态
</demo>

<!-- #region snippet -->
<script setup>
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')

function handleRefresh() {
  message.success('已刷新')
}
</script>

<template>
  <a-space :size="24">
    <x-qrcode
      :value="text"
      status="loading"
    />
    <x-qrcode
      :value="text"
      status="expired"
      @refresh="handleRefresh"
    />
    <x-qrcode
      :value="text"
      status="scanned"
    />
  </a-space>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
