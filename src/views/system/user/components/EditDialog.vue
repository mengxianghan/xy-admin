<template>
    <a-modal
        :after-close="onAfterClose"
        :cancel-text="cancelText"
        :confirm-loading="modal.confirmLoading"
        :open="modal.open"
        :title="modal.title"
        :width="480"
        @cancel="handleCancel"
        @ok="handleOk">
        <a-form
            ref="formRef"
            :label-col="{ style: { width: '90px' } }"
            :model="formData"
            :rules="formRules">
            <a-form-item
                label="头像"
                name="avatar">
                <x-upload-image v-model="formData.avatar"></x-upload-image>
            </a-form-item>
            <a-form-item
                label="姓名"
                name="name">
                <a-input v-model:value="formData.name"></a-input>
            </a-form-item>
            <a-form-item
                label="手机号"
                name="phone">
                <a-input v-model:value="formData.phone"></a-input>
            </a-form-item>
            <a-form-item
                label="状态"
                name="status">
                <a-radio-group
                    v-model:value="formData.status"
                    :options="[
                        { label: '启用', value: 1 },
                        { label: '禁用', value: 0 },
                    ]"></a-radio-group>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { config } from '@/config'
import apis from '@/apis'
import { useForm, useModal } from '@/hooks'

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
        title: '新建用户',
    })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
    openModal({
        type: 'edit',
        title: '编辑用户',
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
                        result = await apis.common.create(params).catch(() => {
                            throw new Error()
                        })
                        break
                    case 'edit':
                        result = await apis.common.update(params).catch(() => {
                            throw new Error()
                        })
                        break
                }
                hideLoading()
                if (config('http.code.success') === result?.code) {
                    closeModal()
                    emit('ok')
                }
            } catch (error) {
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

<style lang="less" scoped></style>
