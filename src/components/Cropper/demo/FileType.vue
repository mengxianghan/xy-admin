<demo>
## 文件类型
使用方法获取不同的裁剪结果
</demo>

<!-- #region snippet -->
<template>
    <x-cropper
        ref="cropperRef"
        :src="assets('avatar.jpg')"></x-cropper>
    <a-space class="mt-8-1">
        <a-button
            type="primary"
            @click="handleBase64">
            Base64
        </a-button>
        <a-button
            type="primary"
            @click="handleBlob">
            Blob
        </a-button>
        <a-button
            type="primary"
            @click="handleFile">
            File
        </a-button>
    </a-space>
</template>

<script setup>
import { assets } from '@/utils'
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const cropperRef = ref()

async function handleBase64() {
    const result = await cropperRef.value.getBase64()
    console.log(result)
    message.success('已通过 console 打印')
}

async function handleBlob() {
    const result = await cropperRef.value.getBlob()
    console.log(result)
    message.success('已通过 console 打印')
}

async function handleFile() {
    const result = await cropperRef.value.getFile()
    console.log(result)
    message.success('已通过 console 打印')
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
