<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :width="480"
             centered
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             :ok-button-props="{
                 style: {
                     display: disabled ? 'none' : ''
                 }
             }"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form :model="formState"
                :rules="rules"
                ref="formRef"
                :label-col="{ style: { width: '90px' } }">
            <a-form-item label="头像"
                         name="avatar">
                <x-upload-image v-model="formState.avatar"></x-upload-image>
            </a-form-item>
            <a-form-item label="登录帐号"
                         name="userName">
                <a-input v-model:value="formState.userName"></a-input>
            </a-form-item>
            <a-form-item label="姓名"
                         name="name">
                <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
            <a-form-item label="所属角色"
                         name="role">
                <a-cascader v-model:value="formState.role"
                            placeholder=""></a-cascader>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {message} from 'ant-design-vue'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'
import {ref} from 'vue'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {form, formState, formRef, rules, formLayout, resetForm} = useForm()
        const disabled = ref(false)

        rules.value = {
            avatar: {required: true, message: '请上传头像'},
            userName: {required: true, message: '请输入登录帐号'},
            name: {required: true, message: '请输入姓名'},
            role: {required: true, message: '请选择所属角色'},
        }

        /**
         * 新建
         */
        function handleCreate() {
            showModal({
                title: '新建用户',
            })
        }

        /**
         * 编辑
         */
        function handleEdit(record) {
            showModal({
                title: '编辑',
            })
            form.formState = record
            form.row = record
        }

        /**
         * 查看
         */
        function handlePreview(record) {
            showModal({
                title: '查看角色',
            })
            form.formState = record
            disabled.value = true
        }

        /**
         * 确定
         */
        function handleOk() {
            formRef.value.validate().then((values) => {
                showLoading()
                setTimeout(() => {
                    message.success('保存成功')
                    hideLoading()
                    hideModal()
                    emit('ok')
                }, 3000)
            }).catch(err => {
                hideLoading()
            })
        }

        /**
         * 取消
         */
        function handleCancel() {
            hideModal()
        }

        function onAfterClose() {
            resetForm()
            hideLoading()
            disabled.value = false
        }

        return {
            modal,
            formState,
            formRef,
            rules,
            formLayout,
            disabled,
            handleCreate,
            handleEdit,
            handlePreview,
            handleOk,
            handleCancel,
            onAfterClose,
        }
    },
}
</script>

<style scoped>

</style>