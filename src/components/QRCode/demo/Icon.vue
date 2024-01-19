<demo>
## 带 Icon
带 Icon 的二维码，支持定义背景色、间距、尺寸
</demo>

<template>
    <x-qrcode
        :icon="assets('logo.svg')"
        :value="text"
        icon-background-color="#fff"></x-qrcode>
</template>

<script setup>
import { ref } from 'vue'
import { assets } from '@/utils'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<style lang="less" scoped></style>
