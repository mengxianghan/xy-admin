<template>
    <a-modal
        :open="modal.open"
        :title="modal.title"
        :confirm-loading="modal.confirmLoading"
        :after-close="onAfterClose"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
            ref="formRef"
            scroll-to-first-error
            layout="vertical"
            :model="formState"
            :rules="formRules">
            <a-form-item
                label="任务名称"
                name="key1">
                <a-input v-model:value="formState.key1"></a-input>
            </a-form-item>
            <a-form-item
                label="开始时间"
                name="key2">
                <a-date-picker v-model:value="formState.key2"></a-date-picker>
            </a-form-item>
            <a-form-item
                label="任务负责人"
                name="key3">
                <a-select v-model:value="formState.key3"></a-select>
            </a-form-item>
            <a-form-item
                label="产品描述"
                name="key4">
                <a-textarea v-model:value="formState.key4"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'

import api from '@/api'
import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'

const emit = defineEmits(['ok'])

const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
const { formRef, formRules, formRecord, formState, resetForm } = useForm()

formRules.value = {
    key1: { required: true, message: '请输入任务名称' },
    key2: { required: true, message: '请选择开始时间' },
    key3: { required: true, message: '请选择任务负责人' },
}

/**
 * 新建
 */
function handleCreate() {
    showModal({
        title: '新建',
    })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
    showModal({
        title: '编辑',
    })
    formRecord.value = record
    formState.value = cloneDeep(record)
}

/**
 * 确定
 */
function handleOk() {
    formRef.value
        .validateFields()
        .then(async (values) => {
            showLoading()
            const params = {
                id: formState.value?.id,
                ...values,
            }
            let result = null
            result = await api.common.saveData(params).catch(() => {
                hideLoading()
            })
            hideLoading()
            if (200 === result?.code) {
                hideModal()
                emit('ok')
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
