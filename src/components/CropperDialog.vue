<template>
    <a-modal
        destroy-on-close
        title="裁剪图片"
        :visible="visible"
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

<script>
import { ref } from 'vue'

import Cropper from './Cropper.vue'

/**
 * 裁剪图片弹窗
 * @property {number} aspectRatio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
export default {
    name: 'XCropperDialog',
    components: {
        Cropper,
    },
    props: {
        aspectRatio: {
            type: Number,
            default: 0,
        },
        quality: {
            type: Number,
            default: 1,
        },
    },
    emits: ['ok', 'cancel'],
    setup(props, { emit }) {
        const visible = ref(false)
        const cropperRef = ref()
        const imgSrc = ref('')
        const loading = ref(false)

        /**
         * 打开
         * @param src
         */
        function handleOpen(src) {
            imgSrc.value = src
            visible.value = true
        }

        /**
         * 确定
         */
        async function handleOk() {
            loading.value = true
            const file = await cropperRef.value?.getFile()
            loading.value = false
            visible.value = false
            emit('ok', file)
        }

        /**
         * 关闭
         */
        function handleCancel() {
            visible.value = false
            emit('cancel')
        }

        /**
         * 关闭后
         */
        function onAfterClose() {
            imgSrc.value = ''
        }

        return {
            visible,
            cropperRef,
            imgSrc,
            loading,
            handleOpen,
            handleOk,
            handleCancel,
            onAfterClose,
        }
    },
}
</script>

<style scoped></style>
