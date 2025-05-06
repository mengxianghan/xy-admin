<script setup>
import apis from '@/apis'
import { config } from '@/config'
import { useForm, useModal } from '@/hooks'
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

const emit = defineEmits(['ok'])

const { modal, openModal, closeModal, showLoading, hideLoading } = useModal()
const { formRecord, formData, formRef, formRules, resetForm } = useForm()
const cancelText = ref('取消')

/**
 * 新建
 */
function handleCreate() {
  openModal({
    type: 'create',
    title: '新建字典',
  })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
  openModal({
    type: 'edit',
    title: '编辑字典',
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
            result = await apis.common.update(params).catch((err) => {
              throw new Error(err)
            })
            break
        }
        hideLoading()
        if (config('http.code.success') === result?.code) {
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
  hideLoading()
}

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<template>
  <a-modal
    :after-close="onAfterClose"
    :cancel-text="cancelText"
    :confirm-loading="modal.confirmLoading"
    :open="modal.open"
    :title="modal.title"
    :width="480"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :label-col="{ style: { width: '90px' } }"
      :model="formData"
      :rules="formRules"
    >
      <a-form-item
        label="字典名称"
        name="name"
      >
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item
        label="唯一值"
        name="key"
      >
        <a-input v-model:value="formData.key" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped></style>
