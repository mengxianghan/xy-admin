<template>
    <a-row
        :gutter="16"
        :wrap="false">
        <a-col flex="0 0 240px">
            <a-card :body-style="{ padding: '8px' }">
                <a-menu
                    :items="roleList"
                    :style="{ border: 'none' }"></a-menu>
            </a-card>
        </a-col>
        <a-col flex="auto">
            <a-card type="flex">
                <x-action-bar class="mb-8-2">
                    <a-button
                        type="primary"
                        @click="$refs.editDialogRef.handleCreate()">
                        <template #icon>
                            <plus-outlined></plus-outlined>
                        </template>
                        添加用户
                    </a-button>
                    <template #extra>
                        <x-search-bar
                            :body-style="{ padding: 0 }"
                            :bordered="false">
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
                                            ghost
                                            type="primary"
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
                    :loading="loadingState.users"
                    :pagination="paginationState"
                    :scroll="{ x: 1000 }"
                    @change="onTableChange">
                    <template #bodyCell="{ column, record, text }">
                        <template v-if="column.key === 'name'">
                            <a-space>
                                <a-avatar :src="record.avatar" />
                                {{ text }}
                            </a-space>
                        </template>
                        <template v-if="column.key === 'roles'">
                            <a-tag
                                v-for="tag in text"
                                :key="tag.id">
                                {{ tag.name }}
                            </a-tag>
                        </template>
                        <template v-if="'action' === column.key">
                            <x-action-button @click="$refs.editDialogRef.handlePreview(record)">详情</x-action-button>
                            <a-dropdown>
                                <x-action-button><ellipsis-outlined></ellipsis-outlined></x-action-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item @click="$refs.editDialogRef.handleEdit(record)">编辑</a-menu-item>
                                        <a-menu-item @click="handleDelete(record)">删除</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-col>
    </a-row>

    <edit-dialog ref="editDialogRef"></edit-dialog>
</template>

<script setup>
import { message, Modal } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import usePagination from '@/hooks/usePagination'
import { mapping } from '@/utils/util'

import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'systemUser',
})

const { paginationState, resetPagination } = usePagination()
const roleList = ref([])
const selectedKeys = ref(['0'])
const columns = ref([
    { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 160 },
    { title: '手机号', dataIndex: 'phone' },
    { title: '登录名', dataIndex: 'email', width: 240 },
    { title: '所属角色', dataIndex: 'roles', key: 'roles', width: 300 },
    { title: '操作', key: 'action', fixed: 'right', width: 100 },
])
const userList = ref([])
const editDialogRef = ref()

const loadingState = reactive({
    roles: false,
    users: false,
})

getRoleList()
getUserPageList()

/**
 * 获取角色列表
 * @returns {Promise<void>}
 */
async function getRoleList() {
    try {
        loadingState.roles = true
        const { code, data } = await apis.common.getPageList().catch((err) => {
            console.log(err)
            throw new Error()
        })
        loadingState.roles = false
        if (config('http.code.success') === code) {
            const { records } = data
            roleList.value = mapping({
                data: records,
                fieldNames: {
                    key: 'id',
                    label: 'role_name',
                },
            })
        }
    } catch (error) {
        loadingState.roles = false
    }
}

/**
 * 获取用户列表
 * @returns {Promise<void>}
 */
async function getUserPageList() {
    try {
        loadingState.users = true
        const { pageSize, current } = paginationState
        const { code, data } = await apis.common
            .getPageList({
                pageSize,
                page: current,
            })
            .catch(() => {
                throw new Error()
            })
        loadingState.users = false
        if (config('http.code.success') === code) {
            const { records, pagination } = data
            userList.value = records
            paginationState.total = pagination.total
        }
    } catch (error) {
        loadingState.users = false
    }
}

/**
 * 切换角色
 */
// eslint-disable-next-line no-unused-vars
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
        onOk: () => {
            return new Promise((resolve, reject) => {
                ;(async () => {
                    try {
                        const { code } = await apis.common.del(id).catch(() => {
                            throw new Error()
                        })
                        if (config('http.code.success') === code) {
                            resolve()
                            message.success('删除成功')
                            await getUserPageList()
                        }
                    } catch (error) {
                        reject()
                    }
                })()
            })
        },
    })
}

/**
 * 分页
 */
function onTableChange({ current, pageSize }) {
    paginationState.current = current
    paginationState.pageSize = pageSize
    getUserPageList()
}
</script>

<style lang="less" scoped></style>
