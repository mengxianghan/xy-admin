<script setup>
import apis from '@/apis'
import { useForm, useModal } from '@/hooks'
import { cloneDeep } from 'lodash-es'

const emit = defineEmits(['ok'])

const { modal, openModal, closeModal, showLoading, hideLoading } = useModal()
const { formRef, formRules, formRecord, formData, resetForm } = useForm()

formRules.value = {
  title: { required: true, message: '请输入标题' },
}

/**
 * 新建
 */
function handleCreate() {
  openModal({
    type: 'create',
    title: '新建',
  })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
  openModal({
    type: 'edit',
    title: '编辑',
  })
  formRecord.value = record
  formData.value = cloneDeep(record)
}

/**
 * 确定
 */
function handleOk() {
  formRef.value
    .validateFields()
    .then(async (values) => {
      try {
        showLoading()
        const params = {
          ...values,
        }
        let result = null
        switch (modal.value.type) {
          case 'create':
            result = await apis.common.create(params).catch((err) => {
              throw new Error(err)
            })
            break
          case 'edit':
            result = await apis.common.update(formRecord.value.id, params).catch((err) => {
              throw new Error(err)
            })
            break
        }
        hideLoading()
        if (result?.code === 200) {
          closeModal()
          emit('ok')
        }
      }
      catch {
        hideLoading()
      }
    })
    .catch(() => {
      hideLoading()
    })
}

/**
 * 取消
 */
function handleCancel() {
  closeModal()
}

/**
 * 关闭后
 */
function onAfterClose() {
  resetForm()
}

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<template>
  <a-modal
    :after-close="onAfterClose"
    :confirm-loading="modal.confirmLoading"
    :open="modal.open"
    :title="modal.title"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :label-col="{ style: { width: '80px' } }"
      :model="formData"
      :rules="formRules"
      scroll-to-first-error
    >
      <a-form-item
        label="标题"
        name="title"
      >
        <a-input v-model:value="formData.title" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped></style>
