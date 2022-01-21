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

        <a-button @click="getData">点击</a-button>
    </div>
</template>

<script>
import {onMounted, ref, toRefs, watch} from 'vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

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
    },
    setup(props) {
        const {aspectRatio} = toRefs(props)
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

        function getData() {
            console.log(crop.value.getCanvasData())
        }

        watch(() => aspectRatio.value, (val) => crop.value.setAspectRatio(val))

        onMounted(() => {
            _init()
        })

        return {
            imgRef,
            previewRef,
            getData,
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
        height: 100%;
        background: @background-color-base;
        margin: 0 @margin-md 0 0;

        img {
            display: none;
        }
    }


    &__preview {
        width: 120px;

        h4 {
            font-weight: normal;
            font-size: 12px;
            margin-bottom: @margin-sm;
        }

        &-img {
            width: 120px;
            height: 120px;
            border: 1px solid @border-color-base;
            overflow: hidden;
        }
    }
}
</style>
