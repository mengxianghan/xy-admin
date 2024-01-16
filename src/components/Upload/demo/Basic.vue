<demo>
## 基本用法
基本用法
</demo>

<template>
    <a-space :size="24">
        <x-upload-image v-model="images"></x-upload-image>

        <x-upload-image
            v-model="images"
            :width="200"></x-upload-image>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'

const images = ref('')
</script>

<style lang="less" scoped></style>
