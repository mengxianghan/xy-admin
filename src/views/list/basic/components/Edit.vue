<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             centered
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
        const handleCreate = () => {
            showModal({
                title: '新建',
            })
        }

        /**
         * 编辑
         */
        const handleEdit = (record) => {
            showModal({
                title: '编辑',
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
