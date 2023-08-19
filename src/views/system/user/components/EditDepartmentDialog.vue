<template>
    <a-modal
        :open="modal.open"
        :title="modal.title"
        :width="480"
        :confirm-loading="modal.confirmLoading"
        :after-close="onAfterClose"
        :cancel-text="cancelText"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            :label-col="{ style: { width: '90px' } }">
            <a-form-item
                label="部门名称"
                name="name">
                <a-input v-model:value="formData.name"></a-input>
            </a-form-item>
            <a-form-item
                label="上级部门"
                name="parent_id">
                <a-tree-select v-model:value="formData.parent_id"></a-tree-select>
            </a-form-item>
            <a-form-item
                label="部门负责人"
                name="name">
                <a-input v-model:value="formData.name"></a-input>
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

const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
const { formRecord, formData, formRef, formRules, resetForm } = useForm()
const cancelText = ref('取消')

/**
 * 新建
 */
function handleCreate() {
    showModal({
        type: 'create',
        title: '新建部门',
    })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
    showModal({
        type: 'edit',
        title: '编辑部门',
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
                    hideModal()
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
    hideModal()
}

/**
 * 关闭后
 */
function onAfterClose() {
    resetForm()
    cancelText.value = '取消'
    hideLoading()
}

defineExpose({
    handleCreate,
    handleEdit,
})
</script>

<style lang="less" scoped></style>
