<script setup>
import { cloneDeep } from 'lodash-es'

import apis from '@/apis'
import { useForm, useModal } from '@/hooks'

const emit = defineEmits(['ok'])

const { modal, openModal, closeModal, showLoading, hideLoading } = useModal()
const { formRef, formRules, formRecord, formData, resetForm } = useForm()

formRules.value = {
  key1: { required: true, message: '请输入任务名称' },
  key2: { required: true, message: '请选择开始时间' },
  key3: { required: true, message: '请选择任务负责人' },
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
      :model="formData"
      :rules="formRules"
      layout="vertical"
      scroll-to-first-error
    >
      <a-form-item
        label="任务名称"
        name="key1"
      >
        <a-input v-model:value="formData.key1" />
      </a-form-item>
      <a-form-item
        label="开始时间"
        name="key2"
      >
        <a-date-picker v-model:value="formData.key2" />
      </a-form-item>
      <a-form-item
        label="任务负责人"
        name="key3"
      >
        <a-select v-model:value="formData.key3" />
      </a-form-item>
      <a-form-item
        label="产品描述"
        name="key4"
      >
        <a-textarea v-model:value="formData.key4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped></style>
