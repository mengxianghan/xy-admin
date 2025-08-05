<demo>
## 基础用法
基础用法
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
    :src="assets('avatar.jpg')"
    @change="onChange"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
