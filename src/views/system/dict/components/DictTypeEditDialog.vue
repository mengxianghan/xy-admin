<template>
    <a-modal
        :open="modal.open"
        :title="modal.title"
        :confirm-loading="modal.confirmLoading"
        :after-close="onAfterClose"
        :width="480"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            scroll-to-first-error
            :label-col="{ style: { width: '100px' } }">
            <a-form-item
                label="所属上级"
                name="parent">
                <a-tree-select v-model:value="formData.parent"></a-tree-select>
            </a-form-item>
            <a-form-item
                label="名称"
                name="name">
                <a-input v-model:value="formData.name"></a-input>
            </a-form-item>
            <a-form-item
                label="编码"
                name="code">
                <a-input v-model:value="formData.code"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'

import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'

defineOptions({
    name: 'DictTypeEdit',
})

const emit = defineEmits(['ok'])

const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
const { formRef, formRules, formRecord, formData, resetForm } = useForm()

formRules.value = {
    name: { required: true, message: '请输入名称' },
    code: { required: true, message: '请输入编码' },
}

formData.value = {
    valid: true,
}

/**
 * 新建
 */
function handleCreate() {
    showModal({
        title: '新建分类',
    })
}

/**
 * 编辑
 */
function handleEdit(record) {
    showModal({
        title: '编辑分类',
    })
    formData.value = cloneDeep(record)
    formRecord.value = record
}

/**
 * 确定
 */
function handleOk() {
    formRef.value
        .validateFields()
        .then(() => {
            showLoading()
            setTimeout(() => {
                hideLoading()
                hideModal()
                emit('ok')
            }, 3000)
        })
        .catch(() => {
            hideLoading()
        })
}

/**
 * 取消
 */
function handleCancel() {
    hideModal()
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

<style lang="less" scoped></style>
