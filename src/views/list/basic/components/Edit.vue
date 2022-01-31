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
            <a-form-item label="字段 1"
                         name="txt1">
                <a-input v-model:value="formState.txt1"></a-input>
            </a-form-item>
            <a-form-item label="字段 2"
                         name="txt2">
                <a-input v-model:value="formState.txt2"></a-input>
            </a-form-item>
            <a-form-item label="字段 3"
                         name="txt3">
                <a-input v-model:value="formState.txt3"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRef, rules, formState, form, resetForm} = useForm()

        form.rules = {
            txt1: {required: true, message: '请输入字段 1'},
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
         * 完全关闭后回调
         */
        const onAfterClose = () => {
            resetForm()
        }

        return {
            modal,
            handleCreate,
            handleEdit,
            handleOk,
            handleCancel,
            onAfterClose,
            formRef,
            rules,
            formState,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
