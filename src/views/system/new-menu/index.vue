<template>
    <a-row
        :gutter="16"
        type="flex">
        <a-col flex="0 0 300px">
            <menu-tree
                @ready="onMenuReady"
                @select="onMenuSelect"></menu-tree>
        </a-col>
        <template v-if="!menuInfo">
            <a-col flex="1">
                <a-card type="flex">
                    <a-empty description="请选择菜单"></a-empty>
                </a-card>
            </a-col>
        </template>
        <template v-else>
            <a-col flex="1">
                <a-card
                    :title="menuInfo.name"
                    type="flex">
                    <a-form
                        :label-col="{ style: { width: '100px' } }"
                        :model="formData">
                        <a-form-item
                            label="名称"
                            name="name">
                            <a-input v-model:value="formData.name"></a-input>
                        </a-form-item>
                        <a-form-item label="所属上级">
                            <a-tree-select
                                v-model:value="formData.parent_id"
                                :field-names="{ children: 'children', label: 'name', key: 'key', value: 'key' }"
                                :tree-data="menuList"
                                tree-default-expand-all></a-tree-select>
                        </a-form-item>
                        <a-form-item
                            label="类型"
                            name="type">
                            <a-radio-group
                                v-model:value="formData.type"
                                :options="[
                                    { label: '菜单', value: 1 },
                                    { label: 'iframe', value: 2 },
                                    { label: '外链', value: 3 },
                                ]"></a-radio-group>
                        </a-form-item>
                        <a-form-item
                            extra="系统唯一且与内置组件名一致，否则导致缓存失效"
                            label="别名"
                            name="alias">
                            <a-input v-model:value="formData.alias"></a-input>
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
                            label="重定向"
                            name="redirect">
                            <a-input v-model:value="formData.redirect"></a-input>
                        </a-form-item>
                        <a-form-item
                            label="视图地址"
                            name="view">
                            <a-input v-model:value="formData.view"></a-input>
                        </a-form-item>
                        <a-form-item
                            extra="子节点或详情页需要高亮的上级菜单别名"
                            label="菜单高亮"
                            name="active">
                            <a-input v-model:value="formData.active"></a-input>
                        </a-form-item>
                        <a-form-item
                            extra="不显示在导航中，但依然可以访问，例如详情页"
                            label="隐藏"
                            name="is_menu">
                            <a-switch v-model:checked="formData.is_menu"></a-switch>
                        </a-form-item>
                        <a-form-item
                            :colon="false"
                            label="&nbsp;">
                            <a-button type="primary">保存</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
            <a-col flex="1">
                <a-card
                    title="权限按钮"
                    type="flex">
                    <x-form-table
                        v-model="authList"
                        :row-tpl="{ name: '', alias: '' }"
                        bordered>
                        <a-table-column
                            data-index="name"
                            title="名称">
                            <template #default="{ record }">
                                <a-input v-model:value="record.name" />
                            </template>
                        </a-table-column>
                        <a-table-column
                            data-index="alias"
                            title="标识">
                            <template #default="{ record }">
                                <a-input v-model:value="record.alias" />
                            </template>
                        </a-table-column>
                    </x-form-table>
                </a-card>
            </a-col>
        </template>
    </a-row>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

import useForm from '@/hooks/useForm'

import MenuTree from './components/MenuTree.vue'

defineOptions({
    name: 'systemNewMenu',
})

const { formData } = useForm()
const authList = ref([{ name: '新增', alias: 'insert' }])
const menuList = ref([])
const menuInfo = ref(null)

/**
 * 选中菜单
 * @param info
 */
function onMenuSelect(info) {
    menuInfo.value = cloneDeep(info)
}

/**
 * 菜单准备完成
 * @param info
 */
function onMenuReady(info) {
    menuList.value = [{ name: '顶级菜单', key: 0 }, ...info]
}
</script>

<style lang="less" scoped></style>
