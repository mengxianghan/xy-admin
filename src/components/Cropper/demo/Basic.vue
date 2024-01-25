<demo>
## 基础用法
基础用法
</demo>

<!-- #region snippet -->
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
<!-- #endregion snippet -->
