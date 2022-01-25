<template>
    <a-row :gutter="16"
           type="flex">
        <a-col flex="0 0 240px">
            <a-card>
                <a-spin :spinning="roleLoading">
                    <a-tree :selected-keys="selectedKeys"
                            :tree-data="roleList"
                            block-node
                            default-expand-all
                            @select="handleRole"></a-tree>
                </a-spin>
            </a-card>
        </a-col>
        <a-col flex="1">
            <a-card>
                <x-action-bar class="mb-8-2">
                    <a-button type="primary">
                        <template #icon>
                            <icon-plus-outlined/>
                        </template>
                        新建用户
                    </a-button>
                    <template #extra>
                        <x-search-bar :body-style="{padding: 0}">
                            <a-form layout="inline">
                                <a-row :gutter="12"
                                       type="flex">
                                    <a-col>
                                        <a-form-item>
                                            <a-input></a-input>
                                        </a-form-item>
                                    </a-col>
                                    <a-col>
                                        <a-button type="primary"
                                                  ghost>搜索
                                        </a-button>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </x-search-bar>
                    </template>
                </x-action-bar>
                <a-table :columns="columns"
                         :data-source="userList"
                         :loading="loading"
                         :pagination="pagination"
                         @change="onTableChange">
                    <template #bodyCell="{column, record, index}">
                        <template v-if="'avatar' === column.key">
                            <a-avatar :src="record.avatar"/>
                        </template>
                        <template v-if="'action' === column.key">
                            <x-action-button>查看</x-action-button>
                            <x-action-button>编辑</x-action-button>
                            <x-action-button>
                                <a-popconfirm title="确认删除？"
                                              @confirm="handleDelete">
                                    删除
                                </a-popconfirm>
                            </x-action-button>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import {onMounted, ref} from 'vue'
import {message} from 'ant-design-vue'
import {systemApi} from '@/api'

import usePagination from '@/hooks/usePagination'

export default {
    name: 'systemUser',
    setup() {
        const {loading, pagination, resetPagination} = usePagination()
        const roleLoading = ref(false)
        const roleList = ref([])
        const selectedKeys = ref([])
        const columns = ref([
            {title: 'ID', dataIndex: 'id'},
            {title: '头像', key: 'avatar'},
            {title: '登录帐号', dataIndex: 'email'},
            {title: '姓名', dataIndex: 'name'},
            {title: '所属角色', dataIndex: 'roleName'},
            {title: '加入时间', dataIndex: 'date'},
            {title: '操作', key: 'action', fixed: 'right', width: 160},
        ])
        const userList = ref([])

        onMounted(() => {
            getUserRoleList()
            getUserPageList()
        })

        /**
         * 获取角色列表
         * @returns {Promise<void>}
         */
        async function getUserRoleList() {
            try {
                roleLoading.value = true
                const {code, data} = await systemApi.getUserRoleList().catch(() => {
                    throw new Error()
                })
                roleLoading.value = false
                if ('200' === code) {
                    roleList.value = [{
                        'title': '全部',
                        'key': '0',
                    }, ...data.rows]
                }
            } catch (err) {
                roleLoading.value = false
            }
        }

        /**
         * 获取用户列表
         * @returns {Promise<void>}
         */
        async function getUserPageList() {
            try {
                loading.value = true
                const {pageSize, current} = pagination.value
                const {code, data} = await systemApi.getUserPageList({
                    pageSize,
                    page: current,
                }).catch(() => {
                    throw new Error()
                })
                loading.value = false
                if ('200' === code) {
                    const {rows, total} = data
                    userList.value = rows
                    pagination.value.total = total
                }
            } catch (err) {
                loading.value = false
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
        function handleDelete() {
            message.success('删除成功！')
            getUserPageList()
        }

        /**
         * 分页
         */
        function onTableChange({current, pageSize}) {
            pagination.value = {
                ...pagination.value,
                current,
                pageSize,
            }
            getUserPageList()
        }

        return {
            roleList,
            columns,
            userList,
            pagination,
            roleLoading,
            loading,
            selectedKeys,
            handleRole,
            handleDelete,
            onTableChange,
        }
    },
}
</script>

<style scoped>

</style>
