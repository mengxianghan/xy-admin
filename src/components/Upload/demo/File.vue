<demo>
## 上传文件
单一文件上传
</demo>

<template>
    <x-upload-input v-model="file"></x-upload-input>
</template>

<script setup>
import { ref } from 'vue'

const file = ref('')
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
