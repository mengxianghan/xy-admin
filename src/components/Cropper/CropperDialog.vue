<template>
    <a-modal
        :after-close="onAfterClose"
        :confirm-loading="loading"
        :open="modal.open"
        :width="584"
        destroy-on-close
        title="裁剪图片"
        @cancel="handleCancel"
        @ok="handleOk">
        <cropper
            ref="cropperRef"
            :aspect-ratio="aspectRatio"
            :quality="quality"
            :src="src"
            :type="type" />
    </a-modal>
</template>

<script setup>
import { ref } from 'vue'

import Cropper from './Cropper.vue'
import { useModal } from '@/hooks'

defineOptions({
    name: 'XCropperDialog',
})

const emit = defineEmits(['ok', 'cancel'])

const { modal, openModal, closeModal } = useModal()

const cropperRef = ref()
const src = ref('')
const aspectRatio = ref()
const quality = ref()
const type = ref()
const loading = ref(false)

/**
 * 打开
 * @param src
 */
function open({ src: _src, aspectRatio: _aspectRatio = 0, quality: _quality = 1, type: _type = 'jpg' }) {
    src.value = _src
    aspectRatio.value = _aspectRatio
    quality.value = _quality
    type.value = _type
    openModal()
}

/**
 * 确定
 */
async function handleOk() {
    loading.value = true
    const base64 = await cropperRef.value?.getBase64()
    const blob = await cropperRef.value?.getBlob()
    const file = await cropperRef.value?.getFile()
    loading.value = false
    closeModal()
    emit('ok', base64, { base64, blob, file })
}

/**
 * 关闭
 */
function handleCancel() {
    closeModal()
    emit('cancel')
}

/**
 * 关闭后
 */
function onAfterClose() {
    src.value = ''
}

defineExpose({
    open,
})
</script>

<style scoped></style>
