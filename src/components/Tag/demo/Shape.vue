<demo>
## 形状
圆的 Tag 长得像个胶囊。
</demo>

<!-- #region snippet -->
<template>
    <a-space>
        <x-tag
            closable
            round
            size="small"
            type="success"
            @close="handleClose">
            不该
        </x-tag>
        <x-tag
            closable
            round
            type="error"
            @close="handleClose">
            手写的从前
        </x-tag>
        <x-tag
            closable
            round
            size="large"
            type="error"
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
<!-- #endregion snippet -->
