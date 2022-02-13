<template>
    <a-row :gutter="16"
           type="flex"
           class="hp-100">
        <a-col flex="0 0 300px">
            <a-card type="flex">
                <template #title>
                    <a-input-search v-model:value="searchValue"
                                    allow-clear
                                    placeholder="请输入关键词搜索"></a-input-search>
                </template>
                <template #actions>
                    <span>
                        <icon-plus-outlined/>
                        新增
                    </span>
                    <span class="color-error"
                          @click="handleDelete">
                        <icon-delete-outlined/>
                        删除
                    </span>
                </template>
                <a-spin :spinning="loading">
                    <a-tree v-model:checked-keys="checkedKeys"
                            :selected-keys="selectedKeys"
                            :tree-data="list"
                            :field-names="{title: 'name', children: 'children', key: 'key'}"
                            block-node
                            checkable
                            @select="handleMenu">
                        <template #title="record">
                            <div class="tree-row">
                                <div class="tree-row__name">
                                    <span v-if="record.name.indexOf(searchValue) > -1">
                                      {{ record.name.substr(0, record.name.indexOf(searchValue)) }}
                                      <span class="color-error">{{ searchValue }}</span>
                                      {{ record.name.substr(record.name.indexOf(searchValue) + searchValue.length) }}
                                    </span>
                                    <span v-else>{{ record.name }}</span>
                                </div>
                                <a-space class="tree-row__actions">
                                    <icon-plus-outlined></icon-plus-outlined>
                                </a-space>
                            </div>
                        </template>
                    </a-tree>
                </a-spin>
            </a-card>
        </a-col>
        <template v-if="!selectedKeys.length">
            <a-col flex="1">
                <a-card type="flex">
                    <a-empty description="请选择左侧菜单后操作"></a-empty>
                </a-card>
            </a-col>
        </template>
        <template v-else>
            <a-col flex="1">
                <a-card :title="selectedNode.name"
                        type="flex">
                    <a-form :model="formState"
                            :label-col="{style:{width: '100px'}}">
                        <a-form-item label="名称"
                                     name="name">
                            <a-input v-model:value="formState.name"></a-input>
                        </a-form-item>
                        <a-form-item label="所属上级">
                            <a-tree-select v-model:value="formState.parent_id"
                                           :tree-data="list"
                                           :field-names="{children: 'children', label: 'name', key: 'key', value: 'key'}"
                                           tree-default-expand-all></a-tree-select>
                        </a-form-item>
                        <a-form-item label="类型"
                                     name="type">
                            <a-radio-group v-model:value="formState.type"
                                           :options="[
                                           {label: '菜单', value: 1},
                                           {label: 'iframe', value: 2},
                                           {label: '外链', value: 3},
                                       ]"></a-radio-group>
                        </a-form-item>
                        <a-form-item label="别名"
                                     name="alias"
                                     extra="系统唯一且与内置组件名一致，否则导致缓存失效">
                            <a-input v-model:value="formState.alias"></a-input>
                        </a-form-item>
                        <a-form-item label="图标"
                                     name="icon">
                            <a-input v-model:value="formState.icon"></a-input>
                        </a-form-item>
                        <a-form-item label="路由地址"
                                     name="path">
                            <a-input v-model:value="formState.path"></a-input>
                        </a-form-item>
                        <a-form-item label="重定向"
                                     name="redirect">
                            <a-input v-model:value="formState.redirect"></a-input>
                        </a-form-item>
                        <a-form-item label="菜单高亮"
                                     name="active"
                                     extra="子节点或详情页需要高亮的上级菜单别名">
                            <a-input v-model:value="formState.active"></a-input>
                        </a-form-item>
                        <a-form-item label="隐藏"
                                     name="is_menu"
                                     extra="不显示在导航中，但依然可以访问，例如详情页">
                            <a-switch v-model:checked="formState.is_menu"></a-switch>
                        </a-form-item>
                        <a-form-item label="&nbsp;"
                                     :colon="false">
                            <a-button type="primary">保存</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
            <a-col flex="1">
                <a-card title="权限按钮"
                        type="flex">
                    <x-form-table v-model="authList"
                                  :row-tpl="{name: '', alias: ''}"
                                  bordered>
                        <a-table-column title="名称"
                                        data-index="name">
                            <template #default="{record}">
                                <a-input v-model:value="record.name"/>
                            </template>
                        </a-table-column>
                        <a-table-column title="标识"
                                        data-index="alias">
                            <template #default="{record}">
                                <a-input v-model:value="record.alias"/>
                            </template>
                        </a-table-column>
                    </x-form-table>
                </a-card>
            </a-col>
        </template>
    </a-row>
</template>

<script>
import {onMounted, ref} from 'vue'
import {systemApi} from '@/api'
import {message} from 'ant-design-vue'

import usePagination from '@/hooks/usePagination'
import useForm from '@/hooks/useForm'

export default {
    name: 'systemMenu',
    setup() {
        const {list, loading} = usePagination()
        const {formState} = useForm()
        const selectedKeys = ref([])
        const selectedNode = ref({})
        const checkedKeys = ref([])
        const searchValue = ref('')
        const authList = ref([
            {name: '新增', alias: 'insert'},
        ])

        onMounted(() => {
            getMenuList()
        })

        /**
         * 获取菜单列表
         * @return {Promise<void>}
         */
        async function getMenuList() {
            try {
                loading.value = true
                const {code, data} = await systemApi.getMenuList().catch(() => {
                    throw new Error()
                })
                loading.value = false
                if ('200' === code) {
                    const {rows} = data
                    list.value = rows
                }
            } catch (err) {
                loading.value = false
            }
        }

        /**
         * 切换菜单
         * @param keys
         */
        function handleMenu(keys, {node}) {
            if (!keys.length) {
                return
            }
            selectedKeys.value = keys
            selectedNode.value = node
        }

        /**
         * 删除菜单
         */
        function handleDelete() {
            try {
                if (!checkedKeys.value.length) {
                    throw new Error('请选择需要删除的数据')
                }
            } catch (err) {
                message.warning(err.message)
            }
        }

        return {
            list,
            loading,
            selectedKeys,
            selectedNode,
            checkedKeys,
            searchValue,
            formState,
            authList,
            handleMenu,
            handleDelete,
        }
    },
}
</script>

<style lang="less"
       scoped>
.tree-row {
    display: flex;
    align-items: center;

    &:hover {
        .tree-row__actions {
            display: flex;
        }
    }

    &__name {
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &,
        > * {
            display: flex;
        }
    }

    &__actions {
        margin: 0 0 0 @margin-sm;
        display: none;
    }
}
</style>
