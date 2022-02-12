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
             :cancel-text="cancelText"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form :model="formState"
                :rules="rules"
                ref="formRef"
                :label-col="{ style: { width: '90px' } }">
            <a-form-item label="所属上级"
                         name="role">
                <a-cascader v-model:value="formState.role"
                            :disabled="disabled"></a-cascader>
            </a-form-item>
            <a-form-item label="名称"
                         name="name">
                <a-input v-model:value="formState.name"
                         :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item label="别名"
                         name="userName">
                <a-input v-model:value="formState.alias"
                         :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item label="排序"
                         name="sort">
                <a-input v-model:value="formState.sort"
                         :disabled="disabled"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {ref} from 'vue'
import {message} from 'ant-design-vue'
import {cloneDeep} from 'lodash'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRecord, formState, formRef, rules, formLayout, resetForm} = useForm()
        const disabled = ref(false)
        const cancelText = ref('取消')

        rules.value = {
            role: {required: true, message: '请选择所属上级'},
            name: {required: true, message: '请输入名称'},
            alias: {required: true, message: '请输入别名'},
            sort: {required: true, message: '请输入排序'}
        }

        /**
         * 新建
         */
        function handleCreate() {
            showModal({
                type: 'create',
                title: '新建角色'
            })
        }

        /**
         * 编辑
         */
        function handleEdit(record) {
            showModal({
                type: 'edit',
                title: '编辑角色'
            })
            formState.value = cloneDeep(record)
            formRecord.value = record
        }

        /**
         * 查看
         */
        function handlePreview(record) {
            showModal({
                type: 'preview',
                title: '查看角色'
            })
            formState.value = cloneDeep(record)
            disabled.value = true
            cancelText.value = '关闭'
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

        /**
         * 关闭后
         */
        function onAfterClose() {
            resetForm()
            disabled.value = false
            cancelText.value = '取消'
            hideLoading()
        }

        return {
            modal,
            formRef,
            rules,
            formState,
            formLayout,
            disabled,
            cancelText,
            handleCreate,
            handleEdit,
            handlePreview,
            handleOk,
            handleCancel,
            onAfterClose
        }
    }
}
</script>

<style scoped>

</style>
