<demo>
## 基本用法
基本用法
</demo>

<template>
    <x-cropper
        ref="cropperRef"
        :src="assets('avatar.jpg')"
        @change="onChange"></x-cropper>
</template>

<script setup>
import { assets } from '@/utils'
import { ref } from 'vue'

const cropperRef = ref()

function onChange(info) {
    console.log(info)
}
</script>

<style lang="less" scoped></style>
