<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             @ok="handleOk"
             @cancel="handleCancel">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>

<script>
import {useModal} from '@/hooks/modal'

export default {
    name: 'Edit',
    setup() {
        const {modal, showModal, hideModal} = useModal()

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
            handleOk,
            handleCancel,
            onAfterClose
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
