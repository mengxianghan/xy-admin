<demo>
## 比例
将裁剪比例设置为 `1/1`
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'
import { assets } from '@/utils'

const cropperRef = ref()

function onChange(info) {
  // eslint-disable-next-line no-console
  console.log(info)
}
</script>

<template>
  <x-cropper
    ref="cropperRef"
    :aspect-ratio="1 / 1"
    :src="assets('avatar.jpg')"
    @change="onChange"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
