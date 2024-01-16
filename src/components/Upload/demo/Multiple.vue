<demo>
## 批量上传
`multiple` 启用批量上传，`drag-sort` 启用拖拽排序
</demo>

<template>
    <x-upload-image
        multiple
        drag-sort
        v-model="images"></x-upload-image>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([])
</script>

<style lang="less" scoped></style>
