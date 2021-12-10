<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             @ok="handleOk"
             @cancel="handleCancel">

    </a-modal>
</template>

<script>
import {useModal} from '@/hooks/modal'

export default {
    name: 'Edit',
    setup() {
        const {modal, showModal, hideModal, showLoading} = useModal()

        /**
         * 新建
         */
        function handleCreate() {
            showModal({
                title: '新建'
            })
        }

        /**
         * 编辑
         */
        function handleEdit(record) {
            showModal({
                title: '编辑'
            })
        }

        /**
         * 确定
         */
        function handleOk() {
            showLoading()
        }

        /**
         * 取消
         */
        function handleCancel() {
            hideModal()
        }

        /**
         * 完全关闭后回调
         */
        function onAfterClose() {
        }

        return {
            modal,
            handleCreate,
            handleEdit,
            handleOk,
            handleCancel,
            onAfterClose
        }
    }
}
</script>

<style lang="less"
       scoped>

</style>
