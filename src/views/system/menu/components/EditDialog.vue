<template>
    <a-modal
        :visible="modal.visible"
        :title="modal.title"
        :width="640"
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
            :rules="formRules"
            :label-col="{
                style: { width: '80px' },
            }">
            <a-form-item label="所属上级">
                <a-tree-select
                    v-model:value="formState.parent_id"
                    tree-default-expand-all></a-tree-select>
            </a-form-item>
            <a-form-item
                label="类型"
                name="type">
                <a-radio-group
                    v-model:value="formState.type"
                    :options="[
                        { label: '菜单', value: 'menu' },
                        { label: '按钮', value: 'button' },
                    ]"></a-radio-group>
            </a-form-item>
            <a-form-item
                label="名称"
                name="name">
                <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
            <a-form-item
                label="别名"
                name="alias"
                extra="系统唯一且与内置组件名一致，否则导致缓存失效">
                <a-input v-model:value="formState.alias"></a-input>
            </a-form-item>
            <template v-if="'menu' === formState.type">
                <a-form-item
                    label="跳转方式"
                    name="type">
                    <a-radio-group
                        v-model:value="formState.target"
                        :options="[
                            { label: '默认', value: 1 },
                            { label: 'iframe', value: 2 },
                            { label: '外部链接', value: 3 },
                        ]"></a-radio-group>
                </a-form-item>
                <a-form-item
                    label="图标"
                    name="icon">
                    <a-input v-model:value="formState.icon"></a-input>
                </a-form-item>
                <a-form-item
                    label="路由地址"
                    name="path">
                    <a-input v-model:value="formState.path"></a-input>
                </a-form-item>
                <a-form-item
                    label="模板"
                    name="tpl">
                    <a-input v-model:value="formState.tpl"></a-input>
                </a-form-item>
                <a-form-item
                    label="视图地址"
                    name="view">
                    <a-input v-model:value="formState.view"></a-input>
                </a-form-item>
                <a-form-item
                    label="菜单高亮"
                    name="active"
                    extra="子节点或详情页需要高亮的上级菜单别名">
                    <a-input v-model:value="formState.active"></a-input>
                </a-form-item>
                <a-form-item
                    label="隐藏"
                    name="is_menu"
                    extra="不显示在导航中，但依然可以访问，例如详情页">
                    <a-switch v-model:checked="formState.is_menu"></a-switch>
                </a-form-item>
            </template>
        </a-form>
    </a-modal>
</template>

<script>
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'
import api from '@/api'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, { emit }) {
        const { modal, showModal, hideModal, showLoading, hideLoading } = useModal()
        const { formRecord, formState, formRef, formRules, resetForm } = useForm()
        const disabled = ref(false)
        const cancelText = ref('取消')

        formRules.value = {
            role: { required: true, message: '请选择所属上级' },
            name: { required: true, message: '请输入名称' },
            alias: { required: true, message: '请输入别名' },
            sort: { required: true, message: '请输入排序' },
        }

        /**
         * 新建
         */
        function handleCreate() {
            showModal({
                type: 'create',
                title: '新建菜单',
            })
        }

        /**
         * 编辑
         */
        function handleEdit(record) {
            showModal({
                type: 'edit',
                title: '编辑菜单',
            })
            formState.value = cloneDeep(record)
            formRecord.value = record
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

        return {
            modal,
            cancelText,
            formRef,
            formState,
            formRules,
            disabled,
            handleCreate,
            handleEdit,
            handleOk,
            handleCancel,
            onAfterClose,
        }
    },
}
</script>

<style lang="less" scoped></style>
