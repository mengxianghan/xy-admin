<script setup>
import Cropper from 'cropperjs'
import mime from 'mime'
import { nanoid } from 'nanoid'
import { onMounted, ref, watch } from 'vue'
import 'cropperjs/dist/cropper.min.css'

defineOptions({
  name: 'XCropper',
})

const props = defineProps({
  /**
   * 图片地址
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * 比例，默认：自由裁剪
   */
  aspectRatio: {
    type: Number,
    default: 0,
  },
  /**
   * 图片质量，默认：1；取值范围：0-1
   */
  quality: {
    type: Number,
    default: 1,
  },
  /**
   * 图片类型，默认：jpg；可选：jpg、png、gif
   */
  type: {
    type: String,
    default: 'jpg',
  },
})
const emit = defineEmits(['initialized', 'change'])

const imgRef = ref()
const previewRef = ref()
const cropper = ref(null)

watch(
  () => props.aspectRatio,
  val => cropper.value.setAspectRatio(val),
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
    ready() {
      emit('initialized', cropper.value)
    },
    async cropend() {
      const base64 = await getBase64()
      const blob = await getBlob()
      const file = await getFile()

      emit('change', {
        base64,
        blob,
        file,
      })
    },
  })
}

/**
 * base64
 * @param type
 * @return {Promise<string>}
 */
function getBase64(type = props.type) {
  return new Promise((resolve) => {
    const base64 = cropper.value.getCroppedCanvas().toDataURL(mime.getType(type), props.quality)
    resolve(base64)
  })
}

/**
 * 文件流
 * @param type
 * @return {Promise<void>}
 */
function getBlob(type = props.type) {
  return new Promise((resolve) => {
    cropper.value.getCroppedCanvas().toBlob(
      (blob) => {
        resolve(blob)
      },
      mime.getType(type),
      props.quality,
    )
  })
}

/**
 * 文件对象
 * @param fileName
 * @param type
 * @return {Promise<void>}
 */
function getFile(fileName, type = props.type) {
  fileName = fileName || `${nanoid()}.${type}`
  return new Promise((resolve) => {
    cropper.value.getCroppedCanvas().toBlob(
      (blob) => {
        const file = new File([blob], fileName, { type: mime.getType(type) })
        resolve(file)
      },
      type,
      props.quality,
    )
  })
}

defineExpose({
  getBase64,
  getBlob,
  getFile,
})
</script>

<template>
  <div class="x-cropper">
    <div class="x-cropper__img">
      <img
        ref="imgRef"
        :src="src"
        alt=""
      >
    </div>
    <div class="x-cropper__preview">
      <h4>图像预览</h4>
      <div
        ref="previewRef"
        class="x-cropper__preview-img"
      />
    </div>
  </div>
</template>

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
