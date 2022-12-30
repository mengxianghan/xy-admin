<template>
    <a-modal
        :visible="modal.visible"
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
            :model="formState"
            :rules="rules"
            :label-col="{ style: { width: '90px' } }">
            <a-form-item
                label="头像"
                name="avatar">
                <x-upload-image
                    v-model="formState.avatar"
                    :disabled="disabled"></x-upload-image>
            </a-form-item>
            <a-form-item
                label="登录帐号"
                name="userName">
                <a-input
                    v-model:value="formState.userName"
                    :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item
                label="姓名"
                name="name">
                <a-input
                    v-model:value="formState.name"
                    :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item
                label="所属角色"
                name="role">
                <a-cascader
                    v-model:value="formState.role"
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
import { ref } from 'vue'

import cloneDeep from 'lodash/cloneDeep'
import api from '@/api'
import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

const emit = defineEmits(['ok'])

const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
const { formRecord, formState, formRef, rules, resetForm } = useForm()
const disabled = ref(false)
const cancelText = ref('取消')
const roleList = ref([])

rules.value = {
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
    const { code, data } = await api.system.getUserRoleList().catch(() => {})
    if (200 === code) {
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
    formState.value = {
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
    formState.value = cloneDeep(record)
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
