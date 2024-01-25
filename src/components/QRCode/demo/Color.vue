<demo>
## 自定义颜色
通过设置 `color` 自定义二维码颜色
</demo>

<!-- #region snippet -->
<template>
    <a-space :size="24">
        <x-qrcode
            :value="text"
            color="#72c240"></x-qrcode>
        <x-qrcode
            :value="text"
            color="#3875f7"></x-qrcode>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
