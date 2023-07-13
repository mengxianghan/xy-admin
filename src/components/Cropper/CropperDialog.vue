<template>
    <a-modal
        destroy-on-close
        title="裁剪图片"
        :open="open"
        :after-close="onAfterClose"
        :width="568"
        :confirm-loading="loading"
        @ok="handleOk"
        @cancel="handleCancel">
        <cropper
            ref="cropperRef"
            :src="imgSrc"
            :aspect-ratio="aspectRatio"
            :quality="quality" />
    </a-modal>
</template>

<script setup>
import { ref } from 'vue'

import Cropper from './Cropper.vue'

defineOptions({
    name: 'XCropperDialog',
})

/**
 * 裁剪图片弹窗
 * @property {number} aspectRatio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
defineProps({
    aspectRatio: {
        type: Number,
        default: 0,
    },
    quality: {
        type: Number,
        default: 1,
    },
})

const emit = defineEmits(['ok', 'cancel'])

const open = ref(false)
const cropperRef = ref()
const imgSrc = ref('')
const loading = ref(false)

/**
 * 打开
 * @param src
 */
function handleOpen(src) {
    imgSrc.value = src
    open.value = true
}

/**
 * 确定
 */
async function handleOk() {
    loading.value = true
    const file = await cropperRef.value?.getFile()
    loading.value = false
    open.value = false
    emit('ok', file)
}

/**
 * 关闭
 */
function handleCancel() {
    open.value = false
    emit('cancel')
}

/**
 * 关闭后
 */
function onAfterClose() {
    imgSrc.value = ''
}

defineExpose({
    handleOpen,
})
</script>

<style scoped></style>
