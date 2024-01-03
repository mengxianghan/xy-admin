<template>
    <a-modal
        :open="modal.open"
        :title="modal.title"
        :confirm-loading="modal.confirmLoading"
        :after-close="onAfterClose"
        :cancel-text="cancelText"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            :label-col="{
                style: { width: '100px' },
            }">
            <a-form-item
                label="名称"
                name="title">
                <a-input v-model:value="formData.title"></a-input>
            </a-form-item>
            <a-form-item name="key">
                <template #label>
                    <span class="mr-4-1">key</span>
                    <a-tooltip title="系统唯一且与内置组件名一致，否则导致缓存失效">
                        <question-circle-outlined class="color-secondary"></question-circle-outlined>
                    </a-tooltip>
                </template>
                <a-input v-model:value="formData.key"></a-input>
            </a-form-item>
            <a-form-item label="所属上级">
                <a-tree-select
                    v-model:value="formData.parent_id"
                    tree-default-expand-all></a-tree-select>
            </a-form-item>
            <a-form-item
                label="类型"
                name="menu_type">
                <a-radio-group
                    v-model:value="formData.menu_type"
                    :options="menuTypeEnum.getOptions()"></a-radio-group>
            </a-form-item>
            <template v-if="menuTypeEnum.is('menu', formData.menu_type)">
                <a-form-item
                    label="跳转方式"
                    name="type">
                    <a-radio-group
                        v-model:value="formData.target"
                        :options="[
                            { label: '默认', value: 1 },
                            { label: 'iframe', value: 2 },
                            { label: '外部链接', value: 3 },
                        ]"></a-radio-group>
                </a-form-item>
                <a-form-item
                    label="图标"
                    name="icon">
                    <a-input v-model:value="formData.icon"></a-input>
                </a-form-item>
                <a-form-item
                    label="路由地址"
                    name="path">
                    <a-input v-model:value="formData.path"></a-input>
                </a-form-item>
                <a-form-item
                    label="模板"
                    name="tpl">
                    <a-input v-model:value="formData.tpl"></a-input>
                </a-form-item>
                <a-form-item
                    label="视图地址"
                    name="view">
                    <a-input v-model:value="formData.view"></a-input>
                </a-form-item>
                <a-form-item name="active">
                    <template #label>
                        <span class="mr-4-1">菜单高亮</span>
                        <a-tooltip title="子节点或详情页需要高亮的上级菜单别名">
                            <question-circle-outlined class="color-secondary"></question-circle-outlined>
                        </a-tooltip>
                    </template>
                    <a-input v-model:value="formData.active"></a-input>
                </a-form-item>
                <a-form-item name="is_menu">
                    <template #label>
                        <span class="mr-4-1">隐藏</span>
                        <a-tooltip title="不显示在导航中，但依然可以访问，例如详情页">
                            <question-circle-outlined class="color-secondary"></question-circle-outlined>
                        </a-tooltip>
                    </template>
                    <a-switch v-model:checked="formData.is_menu"></a-switch>
                </a-form-item>
            </template>
        </a-form>
    </a-modal>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { useModal, useForm } from '@/hooks'
import { menuTypeEnum } from '@/enums/system'
import { config } from '@/config'

const emit = defineEmits(['ok'])

const { modal, openModal, closeModal, showLoading, hideLoading } = useModal()
const { formRecord, formData, formRef, formRules, resetForm } = useForm()

/**
 * 新建
 */
function handleCreate() {
    openModal({
        type: 'create',
        title: '新建菜单',
    })
}

/**
 * 编辑
 */
function handleEdit(record = {}) {
    openModal({
        type: 'edit',
        title: '编辑菜单',
    })
    formData.value = cloneDeep(record)
    formRecord.value = record
}

/**
 * 确定
 */
function handleOk() {
    formRef.value
        .validateFields()
        .then(async (values) => {
            try {
                showLoading()
                const params = {
                    ...values,
                }
                let result = null
                switch (modal.value.type) {
                    case 'create':
                        result = await apis.common.create(params).catch(() => {
                            throw new Error()
                        })
                        break
                    case 'edit':
                        result = await apis.common.update(params).catch(() => {
                            throw new Error()
                        })
                        break
                }
                hideLoading()
                if (config('http.code.success') === result?.code) {
                    closeModal()
                    emit('ok')
                }
            } catch (error) {
                hideLoading()
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
    closeModal()
}

/**
 * 关闭后
 */
function onAfterClose() {
    resetForm()
    hideLoading()
}

defineExpose({
    handleCreate,
    handleEdit,
})
</script>

<style lang="less" scoped></style>
