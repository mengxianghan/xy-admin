<demo>
## 可关闭
可关闭
</demo>

<template>
    <a-space>
        <x-tag
            closable
            @close="handleClose">
            爱在西元前
        </x-tag>
        <x-tag
            closable
            type="success"
            @close="handleClose">
            不该
        </x-tag>
        <x-tag
            closable
            type="warning"
            @close="handleClose">
            超人不会飞
        </x-tag>
        <x-tag
            closable
            type="error"
            @close="handleClose">
            手写的从前
        </x-tag>
        <x-tag
            closable
            type="info"
            @click="handleClick"
            @close="handleClose">
            哪里都是你
        </x-tag>
    </a-space>
</template>

<script setup>
import { message } from 'ant-design-vue'

function handleClick() {
    message.info('tag click')
}

function handleClose() {
    message.info('tag close')
}
</script>

<style lang="less" scoped></style>
