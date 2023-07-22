<template>
    <div class="x-cropper">
        <div class="x-cropper__img">
            <img
                ref="imgRef"
                alt=""
                :src="src" />
        </div>
        <div class="x-cropper__preview">
            <h4>图像预览</h4>
            <div
                ref="previewRef"
                class="x-cropper__preview-img"></div>
        </div>
    </div>
</template>

<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { onMounted, ref, watch } from 'vue'

defineOptions({
    name: 'XCropper',
})

/**
 * 图片裁剪
 * @property {string} src 图片地址
 * @property {number} aspectRatio 比例，默认：自由裁剪
 * @property {number} quality 图片质量，取值范围：0-1，默认：1
 */
const props = defineProps({
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
})

const emit = defineEmits(['init'])

const imgRef = ref()
const previewRef = ref()
const cropper = ref(null)

watch(
    () => props.aspectRatio,
    (val) => cropper.value.setAspectRatio(val)
)

onMounted(() => {
    init()
})

/**
 * 初始化
 */
function init() {
    cropper.value = new Cropper(imgRef.value, {
        viewMode: 2,
        dragMode: 'move',
        responsive: false,
        aspectRatio: props.aspectRatio,
        preview: previewRef.value,
        ready: () => {
            emit('init', cropper.value)
        },
    })
}

/**
 * base64
 * @param type
 * @return {Promise<string>}
 */
function getBase64(type = 'image/jpeg') {
    return new Promise((resolve) => {
        const base64 = cropper.value.getCroppedCanvas().toDataURL(type, props.quality)
        resolve(base64)
    })
}

/**
 * 文件流
 * @param type
 * @return {Promise<void>}
 */
function getBlob(type = 'image/jpeg') {
    return new Promise((resolve) => {
        cropper.value.getCroppedCanvas().toBlob(
            (blob) => {
                resolve(blob)
            },
            type,
            props.quality
        )
    })
}

/**
 * 文件对象
 * @param fileName
 * @param type
 * @return {Promise<void>}
 */
function getFile(fileName, type = 'image/jpeg') {
    return new Promise((resolve) => {
        cropper.value.getCroppedCanvas().toBlob(
            (blob) => {
                const file = new File([blob], fileName, { type })
                resolve(file)
            },
            type,
            props.quality
        )
    })
}

defineExpose({
    getBase64,
    getBlob,
    getFile,
})
</script>

<style lang="less" scoped>
.x-cropper {
    height: 300px;
    display: flex;

    &__img {
        width: 400px;
        flex: 0 0 400px;
        height: 100%;
        background: hsv(0, 0, 96%);
        margin: 0 16px 0 0;

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
            margin-bottom: 12px;
        }

        &-img {
            width: 100%;
            height: 120px;
            border: 1px solid @color-border;
            overflow: hidden;
        }
    }

    :deep(.cropper-view-box) {
        outline-color: @color-primary;
    }

    :deep(.cropper-line) {
        background-color: @color-primary;
    }

    :deep(.cropper-point) {
        background-color: @color-primary;
    }
}
</style>
