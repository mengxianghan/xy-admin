<demo>
## 弹窗中使用
弹窗中使用
</demo>

<!-- #region snippet -->
<script setup>
import { assets } from '@/utils'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const cropperDialogRef = ref()

function handleOpen() {
  cropperDialogRef.value.open({
    src: assets('avatar.jpg'),
    aspectRatio: 1 / 1,
  })
}

function onOk(base64, info) {
  // eslint-disable-next-line no-console
  console.log(base64, info)
  message.success('已通过 console 打印')
}
</script>

<template>
  <a-button
    type="primary"
    @click="handleOpen"
  >
    打开弹窗
  </a-button>
  <x-cropper-dialog
    ref="cropperDialogRef"
    @ok="onOk"
  />
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
