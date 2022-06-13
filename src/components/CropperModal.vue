<template>
    <a-modal :visible="visible"
             destroy-on-close
             :after-close="onAfterClose"
             title="裁剪图片"
             :width="568"
             @ok="handleOk"
             @cancel="handleCancel">
        <cropper ref="cropperRef"
                 :src="imgSrc"
                 :aspect-ratio="aspectRatio"
                 :quality="quality" />
    </a-modal>
</template>

<script>
import { ref } from 'vue'

import Cropper from './Cropper'

/**
 * 裁剪图片弹窗
 * @property {number} aspectRatio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
export default {
    name: 'XCropperModal',
    components: { Cropper },
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
            const file = await cropperRef.value?.getFile()
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
            handleOpen,
            handleOk,
            handleCancel,
            onAfterClose,
        }
    },
}
</script>

<style scoped>
</style>
