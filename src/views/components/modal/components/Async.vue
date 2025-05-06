<demo>
# 异步关闭
点击确定后异步关闭对话框，例如提交表单。
</demo>

<!-- #region snippet -->
<script setup>
import { useModal } from '@/hooks'

const { modal, openModal, closeModal, showLoading } = useModal()

function handleOpen() {
  openModal({
    title: '异步关闭',
  })
}

function handleOk() {
  showLoading()
  setTimeout(() => {
    closeModal()
  }, 2000)
}
</script>

<template>
  <a-button
    type="primary"
    @click="handleOpen()"
  >
    打开
  </a-button>

  <a-modal
    :confirm-loading="modal.confirmLoading"
    :open="modal.open"
    :title="modal.title"
    @cancel="closeModal()"
    @ok="handleOk"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
