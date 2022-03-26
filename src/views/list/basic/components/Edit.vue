<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form ref="formRef"
                :model="formState"
                :rules="rules"
                scroll-to-first-error
                layout="vertical">
            <a-form-item label="标题"
                         name="title">
                <a-input v-model:value="formState.title"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {cloneDeep} from 'lodash'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

import api from '@/api'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRef, rules, formRecord, formState, resetForm} = useForm()

        rules.value = {
            title: {required: true, message: '请输入标题'},
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
        function handleEdit(record) {
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
            formRef.value.validateFields().then(async (values) => {
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
