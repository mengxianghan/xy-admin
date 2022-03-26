<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             :width="480"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form ref="formRef"
                :model="formState"
                :rules="rules"
                scroll-to-first-error
                :label-col="{style: {width: '100px'}}">
            <a-form-item label="所属上级"
                         name="parent">
                <a-tree-select v-model:value="formState.parent"></a-tree-select>
            </a-form-item>
            <a-form-item label="名称"
                         name="name">
                <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
            <a-form-item label="编码"
                         name="code">
                <a-input v-model:value="formState.code"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {cloneDeep} from 'lodash'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

export default {
    name: 'DictTypeEdit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRef, rules, formRecord, formState, resetForm} = useForm()

        rules.value = {
            name: {required: true, message: '请输入名称'},
            code: {required: true, message: '请输入编码'},
        }

        formState.value = {
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
            formState.value = cloneDeep(record)
            formRecord.value = record
        }

        /**
         * 确定
         */
        function handleOk() {
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
        function handleCancel() {
            hideModal()
        }

        /**
         * 关闭后
         */
        function onAfterClose() {
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
