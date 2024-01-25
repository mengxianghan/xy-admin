<demo>
## 不同的状态
可以通过 status 的值控制二维码的状态
</demo>

<!-- #region snippet -->
<template>
    <a-space :size="24">
        <x-qrcode
            :value="text"
            status="loading"></x-qrcode>
        <x-qrcode
            :value="text"
            status="expired"
            @refresh="handleRefresh"></x-qrcode>
        <x-qrcode
            :value="text"
            status="scanned"></x-qrcode>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const text = ref('http://xy-admin.xuanyunet.com')

function handleRefresh() {
    message.success('已刷新')
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
