<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
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
    Preview({
        urls: ['http://cdn.xuanyunet.com/test/1.jpeg'],
    })
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
