<template>
    <a-modal
        :open="modal.open"
        :title="modal.title"
        :width="480"
        :confirm-loading="modal.confirmLoading"
        :after-close="onAfterClose"
        :ok-button-props="{
            style: {
                display: disabled ? 'none' : '',
            },
        }"
        :cancel-text="cancelText"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            :label-col="{ style: { width: '90px' } }">
            <a-form-item
                label="头像"
                name="avatar">
                <x-upload-image
                    v-model="formData.avatar"
                    :disabled="disabled"></x-upload-image>
            </a-form-item>
            <a-form-item
                label="登录帐号"
                name="userName">
                <a-input
                    v-model:value="formData.userName"
                    :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item
                label="姓名"
                name="name">
                <a-input
                    v-model:value="formData.name"
                    :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item
                label="所属角色"
                name="role">
                <a-cascader
                    v-model:value="formData.role"
                    placeholder=""
                    multiple
                    max-tag-count="responsive"
                    :options="roleList"
                    :disabled="disabled"
                    :field-names="{ label: 'name', value: 'key', children: 'children' }"></a-cascader>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

import apis from '@/apis'
import { config } from '@/config'
import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'

const emit = defineEmits(['ok'])

const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
const { formRecord, formData, formRef, formRules, resetForm } = useForm()
const disabled = ref(false)
const cancelText = ref('取消')
const roleList = ref([])

formRules.value = {
    avatar: { required: true, message: '请上传头像' },
    userName: { required: true, message: '请输入登录帐号' },
    name: { required: true, message: '请输入姓名' },
    role: { required: true, message: '请选择所属角色' },
}

/**
 * 获取角色列表
 * @returns {Promise<void>}
 */
async function getUserRoleList() {
    const { code, data } = await apis.system.getUserRoleList().catch(() => {})
    if (config('http.code.success') === code) {
        roleList.value = data.rows
    }
}

/**
 * 新建
 */
function handleCreate() {
    showModal({
        type: 'create',
        title: '新建用户',
    })
    getUserRoleList()
}

/**
 * 编辑
 */
function handleEdit(record) {
    showModal({
        type: 'edit',
        title: '编辑用户',
    })
    formData.value = {
        ...cloneDeep(record),
        role: [],
    }
    formRecord.value = record
    getUserRoleList()
}

/**
 * 查看
 */
function handlePreview(record) {
    showModal({
        type: 'preview',
        title: '查看用户',
    })
    formData.value = cloneDeep(record)
    disabled.value = true
    cancelText.value = '关闭'
    getUserRoleList()
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
                id: formData.value?.id,
                ...values,
            }
            let result = null
            result = await apis.common.saveData(params).catch(() => {
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
    disabled.value = false
    cancelText.value = '取消'
    hideLoading()
}

defineExpose({
    handleCreate,
    handleEdit,
    handlePreview,
})
</script>

<style lang="less" scoped></style>
