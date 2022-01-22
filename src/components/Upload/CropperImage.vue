<template>
    <a-modal :visible="visible"
             destroy-on-close
             :after-close="onAfterClose"
             title="裁剪图片"
             centered
             :width="568"
             @ok="handleOk"
             @cancel="handleCancel">
        <cropper ref="cropperRef"
                 :src="src"
                 :aspect-ratio="aspectRatio"
                 :quality="quality"/>
    </a-modal>
</template>

<script>
import {ref} from 'vue'

import Cropper from '../Cropper'

/**
 * 裁剪图片弹窗
 * @property {number} aspect-ratio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
export default {
    name: 'CropperImage',
    components: {Cropper},
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
    setup(props, ctx) {
        const visible = ref(false)
        const cropperRef = ref()
        const src = ref('')

        /**
         * 打开
         * @param file
         */
        function handleOpen(file) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = (e) => {
                src.value = e.target.result
                visible.value = true
            }
        }

        /**
         * 确定
         */
        async function handleOk() {
            const file = await cropperRef.value?.getFile()
            visible.value = false
            ctx.emit('ok', file)
        }

        /**
         * 关闭
         */
        function handleCancel() {
            visible.value = false
            ctx.emit('cancel')
        }

        /**
         * 关闭后
         */
        function onAfterClose() {
            src.value = ''
        }

        return {
            visible,
            cropperRef,
            src,
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