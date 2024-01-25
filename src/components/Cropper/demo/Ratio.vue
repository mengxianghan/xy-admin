<demo>
## 比例
将裁剪比例设置为 `1/1`
</demo>

<!-- #region snippet -->
<template>
    <x-cropper
        ref="cropperRef"
        :aspect-ratio="1 / 1"
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
