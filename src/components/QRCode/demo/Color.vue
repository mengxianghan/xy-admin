<demo>
## 自定义颜色
通过设置 `color` 自定义二维码颜色
</demo>

<template>
    <a-space :size="24">
        <x-qrcode
            color="#72c240"
            :value="text"></x-qrcode>
        <x-qrcode
            color="#3875f7"
            :value="text"></x-qrcode>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<style lang="less" scoped></style>
