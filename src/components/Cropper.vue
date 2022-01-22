<template>
    <div class="x-cropper">
        <div class="x-cropper__img">
            <img ref="imgRef"
                 :src="src">
        </div>
        <div class="x-cropper__preview">
            <h4>图像预览</h4>
            <div class="x-cropper__preview-img"
                 ref="previewRef"></div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref, toRefs, watch} from 'vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

/**
 * 图片裁剪
 * @property {string} src，图片地址
 * @property {number} aspect-ratio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
export default {
    name: 'Cropper',
    props: {
        src: {
            type: String,
            default: '',
        },
        aspectRatio: {
            type: Number,
            default: 0,
        },
        quality: {
            type: Number,
            default: 1,
        },
    },
    setup(props) {
        const {aspectRatio, quality} = toRefs(props)
        const imgRef = ref()
        const previewRef = ref()
        const crop = ref(null)

        function _init() {
            crop.value = new Cropper(imgRef.value, {
                viewMode: 2,
                dragMode: 'move',
                responsive: false,
                aspectRatio: aspectRatio.value,
                preview: previewRef.value,
            })
        }

        /**
         * base64
         * @param type
         * @return {Promise<string>}
         */
        function getBase64(type = 'image/jpeg') {
            return new Promise((resolve) => {
                const base64 = crop.value.getCroppedCanvas().toDataURL(type, quality.value)
                resolve(base64)
            })
        }

        /**
         * 文件流
         * @param type
         * @return {Promise<void>}
         */
        async function getBlob(type = 'image/jpeg') {
            return new Promise((resolve => {
                crop.value.getCroppedCanvas().toBlob((blob) => {
                    resolve(blob)
                }, type, quality.value)
            }))
        }

        /**
         * 文件对象
         * @param fileName
         * @param type
         * @return {Promise<void>}
         */
        function getFile(fileName, type = 'image/jpeg') {
            return new Promise((resolve) => {
                crop.value.getCroppedCanvas().toBlob((blob) => {
                    const file = new File([blob], fileName, {type})
                    resolve(file)
                }, type, quality.value)
            })
        }

        watch(() => aspectRatio.value, (val) => crop.value.setAspectRatio(val))

        onMounted(() => {
            _init()
        })

        return {
            imgRef,
            previewRef,
            getBase64,
            getBlob,
            getFile,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-cropper {
    height: 300px;
    display: flex;

    &__img {
        width: 400px;
        flex: 0 0 400px;
        height: 100%;
        background: @background-color-base;
        margin: 0 @margin-md 0 0;

        img {
            display: none;
        }
    }


    &__preview {
        width: 120px;
        flex: 0 0 120px;

        h4 {
            font-weight: normal;
            font-size: 12px;
            margin-bottom: @margin-sm;
        }

        &-img {
            width: 100%;
            height: 120px;
            border: 1px solid @border-color-base;
            overflow: hidden;
        }
    }
}
</style>
