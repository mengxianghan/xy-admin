<demo>
# 基础用法
使用 `openModal` 打开弹窗，使用 `closeModal` 关闭弹窗
</demo>

<!-- #region snippet -->
<script setup>
import { useModal } from '@/hooks'

const { modal, openModal, closeModal } = useModal()

function handleOpen() {
  openModal({
    title: '基础用法',
  })
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
    :open="modal.open"
    :title="modal.title"
    @cancel="closeModal()"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
