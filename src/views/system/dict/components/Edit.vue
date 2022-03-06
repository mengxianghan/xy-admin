<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             centered
             :width="480"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form ref="formRef"
                :model="formState"
                :rules="rules"
                scroll-to-first-error
                :label-col="{style: {width: '100px'}}">
            <a-form-item label="所属分类"
                         name="type">
                <a-tree-select v-model:value="formState.type"></a-tree-select>
            </a-form-item>
            <a-form-item label="名称"
                         name="name">
                <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
            <a-form-item label="键值"
                         name="keyValue">
                <a-input v-model:value="formState.keyValue"></a-input>
            </a-form-item>
            <a-form-item label="是否有效"
                         name="valid">
                <a-switch v-model:checked="formState.valid"></a-switch>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {cloneDeep} from 'lodash'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRef, rules, formRecord, formState, resetForm} = useForm()

        rules.value = {
            type: {required: true, message: '请选择所属分类'},
            name: {required: true, message: '请输入名称'},
            keyValue: {required: true, message: '请输入键值'},
        }

        formState.value = {
            valid: true,
        }

        /**
         * 新建
         */
        const handleCreate = () => {
            showModal({
                title: '新建项',
            })
        }

        /**
         * 编辑
         */
        const handleEdit = (record) => {
            showModal({
                title: '编辑项',
            })
            formState.value = cloneDeep(record)
            formRecord.value = record
        }

        /**
         * 确定
         */
        const handleOk = () => {
            formRef.value.validateFields().then((values) => {
                showLoading()
                setTimeout(() => {
                    hideLoading()
                    hideModal()
                    emit('ok')
                }, 3000)
            }).catch((err) => {
                hideLoading()
            })
        }

        /**
         * 取消
         */
        const handleCancel = () => {
            hideModal()
        }

        /**
         * 关闭后
         */
        const onAfterClose = () => {
            resetForm()
        }

        return {
            modal,
            formRef,
            rules,
            formState,
            handleCreate,
            handleEdit,
            handleOk,
            handleCancel,
            onAfterClose,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
