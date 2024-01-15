<demo>
## 基本用法
基本用法
</demo>

<template>
    <a-button
        type="primary"
        @click="handlePreview">
        预览
    </a-button>
</template>

<script setup>
import { Preview } from '@/components'

function handlePreview() {
    Preview.open({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg'],
    })
}
</script>

<style lang="less" scoped></style>
