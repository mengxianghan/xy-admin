<demo>
## 形状
圆的 Tag 长得像个胶囊。
</demo>

<template>
    <a-space>
        <x-tag
            type="success"
            size="small"
            round
            closable
            @close="handleClose">
            不该
        </x-tag>
        <x-tag
            type="error"
            closable
            round
            @close="handleClose">
            手写的从前
        </x-tag>
        <x-tag
            type="error"
            closable
            size="large"
            round
            @close="handleClose">
            手写的从前
        </x-tag>
    </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

function handleClose() {
    message.info('tag close')
}
</script>

<style lang="less" scoped></style>
