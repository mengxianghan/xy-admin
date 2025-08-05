<demo>
# 回调
这个东西看起来没啥用，实际上确实没啥用。
</demo>

<!-- #region snippet -->
<script setup>
import { Modal } from 'ant-design-vue'
import { useModal } from '@/hooks'

const { modal, openModal, closeModal } = useModal({
  beforeOpen: (done) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确认打开弹窗',
      onOk() {
        done()
      },
    })
  },
  afterOpen: () => {
    // eslint-disable-next-line no-console
    console.log('弹窗已打开')
  },
  beforeClose: (done) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确认关闭弹窗',
      onOk() {
        done()
      },
    })
  },
  afterClose: () => {
    // eslint-disable-next-line no-console
    console.log('弹窗已关闭', new Date().getTime())
  },
})

function handleOpen() {
  openModal({
    title: '基础用法',
  })
}

function handleCancel() {
  // eslint-disable-next-line no-console
  console.log('点击了取消')
  closeModal()
}

function handleOk() {
  // eslint-disable-next-line no-console
  console.log('点击了确定')
  closeModal()
}

function onAfterClose() {
  // eslint-disable-next-line no-console
  console.log('弹窗已完全关闭', new Date().getTime())
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
    :after-close="onAfterClose"
    :open="modal.open"
    :title="modal.title"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
