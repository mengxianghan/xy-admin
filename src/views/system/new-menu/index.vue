<template>
    <a-row
        type="flex"
        :gutter="16"
        :style="{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }">
        <a-col flex="0 0 300px">
            <menu-tree
                @select="onMenuSelect"
                @ready="onMenuReady"></menu-tree>
        </a-col>
        <template v-if="!menuInfo">
            <a-col flex="1">
                <a-card
                    :bordered="false"
                    type="flex">
                    <a-empty description="请选择菜单"></a-empty>
                </a-card>
            </a-col>
        </template>
        <template v-else>
            <a-col flex="1">
                <a-card
                    :bordered="false"
                    :title="menuInfo.name"
                    type="flex">
                    <a-form
                        :model="formState"
                        :label-col="{ style: { width: '100px' } }">
                        <a-form-item
                            label="名称"
                            name="name">
                            <a-input v-model:value="formState.name"></a-input>
                        </a-form-item>
                        <a-form-item label="所属上级">
                            <a-tree-select
                                v-model:value="formState.parent_id"
                                :tree-data="menuList"
                                :field-names="{ children: 'children', label: 'name', key: 'key', value: 'key' }"
                                tree-default-expand-all></a-tree-select>
                        </a-form-item>
                        <a-form-item
                            label="类型"
                            name="type">
                            <a-radio-group
                                v-model:value="formState.type"
                                :options="[
                                    { label: '菜单', value: 1 },
                                    { label: 'iframe', value: 2 },
                                    { label: '外链', value: 3 },
                                ]"></a-radio-group>
                        </a-form-item>
                        <a-form-item
                            label="别名"
                            name="alias"
                            extra="系统唯一且与内置组件名一致，否则导致缓存失效">
                            <a-input v-model:value="formState.alias"></a-input>
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
                            label="重定向"
                            name="redirect">
                            <a-input v-model:value="formState.redirect"></a-input>
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
                        <a-form-item
                            label="&nbsp;"
                            :colon="false">
                            <a-button type="primary">保存</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
            <a-col flex="1">
                <a-card
                    :bordered="false"
                    title="权限按钮"
                    type="flex">
                    <x-form-table
                        v-model="authList"
                        :row-tpl="{ name: '', alias: '' }"
                        bordered>
                        <a-table-column
                            title="名称"
                            data-index="name">
                            <template #default="{ record }">
                                <a-input v-model:value="record.name" />
                            </template>
                        </a-table-column>
                        <a-table-column
                            title="标识"
                            data-index="alias">
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

const { formState } = useForm()
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
