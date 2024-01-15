<demo>
## 基本用法
基本用法
</demo>

<template>
    <a-space
        direction="vertical"
        :size="24">
        <x-qrcode :value="text"></x-qrcode>
        <a-input
            v-model:value="text"
            placeholder="-"
            :maxlength="60" />
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('http://xy-admin.xuanyunet.com')
</script>

<style lang="less" scoped></style>
