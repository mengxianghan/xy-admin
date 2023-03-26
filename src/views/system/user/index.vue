<template>
    <a-row
        :gutter="16"
        type="flex"
        class="hp-100">
        <a-col flex="0 0 240px">
            <a-card
                v-loading="roleLoading"
                :bordered="false"
                type="flex">
                <a-tree
                    :selected-keys="selectedKeys"
                    :tree-data="roleList"
                    :field-names="{ title: 'name', children: 'children', key: 'key' }"
                    block-node
                    @select="handleRole"></a-tree>
            </a-card>
        </a-col>
        <a-col flex="1">
            <a-card
                :bordered="false"
                type="flex">
                <x-action-bar class="mb-8-2">
                    <a-button
                        type="primary"
                        @click="$refs.editDialogRef.handleCreate()">
                        <template #icon>
                            <icon-plus-outlined />
                        </template>
                        新建用户
                    </a-button>
                    <template #extra>
                        <x-search-bar :body-style="{ padding: 0 }">
                            <a-form layout="inline">
                                <a-row
                                    :gutter="12"
                                    type="flex">
                                    <a-col>
                                        <a-form-item>
                                            <a-input></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col>
                                        <a-button
                                            type="primary"
                                            ghost
                                            >搜索
                                        </a-button>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </x-search-bar>
                    </template>
                </x-action-bar>
                <a-table
                    :columns="columns"
                    :data-source="userList"
                    :loading="loading"
                    :pagination="pagination"
                    @change="onTableChange">
                    <template #bodyCell="{ column, record }">
                        <template v-if="'avatar' === column.key">
                            <a-avatar :src="record.avatar" />
                        </template>
                        <template v-if="'action' === column.key">
                            <x-action-button @click="$refs.editDialogRef.handlePreview(record)">查看</x-action-button>
                            <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                            <x-action-button @click="handleDelete(record)">删除</x-action-button>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-col>
    </a-row>

    <edit-dialog ref="editDialogRef"></edit-dialog>
</template>

<script>
import { onMounted, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'

import api from '@/api'
import usePagination from '@/hooks/usePagination'

import EditDialog from './components/EditDialog.vue'
export default {
    name: 'systemUser',
    components: {
        EditDialog,
    },
    setup() {
        const { loading, pagination, resetPagination } = usePagination()
        const roleLoading = ref(false)
        const roleList = ref([])
        const selectedKeys = ref(['0'])
        const columns = ref([
            { title: 'ID', dataIndex: 'id' },
            { title: '头像', key: 'avatar' },
            { title: '登录帐号', dataIndex: 'userName' },
            { title: '姓名', dataIndex: 'name' },
            { title: '所属角色', dataIndex: 'roleName' },
            { title: '加入时间', dataIndex: 'date' },
            { title: '操作', key: 'action', fixed: 'right', width: 160 },
        ])
        const userList = ref([])
        const editDialogRef = ref()

        onMounted(() => {
            getUserRoleList()
            getUserPageList()
        })

        /**
         * 获取角色列表
         * @returns {Promise<void>}
         */
        async function getUserRoleList() {
            roleLoading.value = true
            const { code, data } = await api.system.getUserRoleList().catch(() => {
                roleLoading.value = false
            })
            roleLoading.value = false
            if (200 === code) {
                roleList.value = [
                    {
                        name: '全部',
                        key: '0',
                    },
                    ...data.rows,
                ]
            }
        }

        /**
         * 获取用户列表
         * @returns {Promise<void>}
         */
        async function getUserPageList() {
            loading.value = true
            const { pageSize, current } = pagination
            const { code, data } = await api.system
                .getUserPageList({
                    pageSize,
                    page: current,
                })
                .catch(() => {
                    loading.value = false
                })
            loading.value = false
            if (200 === code) {
                const { rows, total } = data
                userList.value = rows
                pagination.total = total
            }
        }

        /**
         * 切换角色
         */
        function handleRole(keys) {
            if (!keys.length) {
                return
            }
            selectedKeys.value = keys
            resetPagination()
            getUserPageList()
        }

        /**
         * 删除
         */
        function handleDelete({ id }) {
            Modal.confirm({
                title: '删除提示',
                content: '确认删除？',
                onOk: async () => {
                    loading.value = true
                    const { code } = await api.common.deleteData({ id }).catch(() => {
                        loading.value = false
                    })
                    if (200 === code) {
                        message.success('删除成功')
                        await getUserPageList()
                    } else {
                        loading.value = false
                    }
                },
            })
        }

        /**
         * 分页
         */
        function onTableChange({ current, pageSize }) {
            pagination.current = current
            pagination.pageSize = pageSize
            getUserPageList()
        }

        return {
            roleLoading,
            selectedKeys,
            roleList,
            userList,
            loading,
            pagination,
            columns,
            editDialogRef,
            handleRole,
            handleDelete,
            onTableChange,
        }
    },
}
</script>

<style lang="less" scoped></style>
