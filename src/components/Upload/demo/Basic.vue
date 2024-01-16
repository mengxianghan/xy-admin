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

<style lang="less" scoped>
.custom {
    width: 240px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: @color-border dashed 1px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        border-color: @color-primary;
        color: @color-primary;
    }
}
</style>
