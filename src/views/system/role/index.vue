<template>
    <a-row
        :gutter="8"
        :wrap="false">
        <a-col flex="0 0 280px">
            <role
                v-model:value="searchFormData.role"
                @change="onRoleChange"></role>
        </a-col>
        <a-col flex="auto">
            <a-card type="flex">
                <template #title>
                    <span>{{ selectedRole?.role_name }}</span>
                    <span class="fs-14 fw-400 ml-8-2">{{ selectedRole?.key }}</span>
                </template>
                <x-action-bar class="mb-8-2">
                    <a-button
                        type="primary"
                        @click="$refs.editDialogRef.handleCreate()">
                        <template #icon>
                            <plus-outlined></plus-outlined>
                        </template>
                        添加成员
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
                    :data-source="listData"
                    :loading="loading"
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
                        <template v-if="'action' === column.key">
                            <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                            <x-action-button @click="handleRemove(record)">移除</x-action-button>
                        </template>
                    </template>
                </a-table>
            </a-card>
        </a-col>
    </a-row>

    <edit-dialog
        ref="editDialogRef"
        @ok="onOk"></edit-dialog>
</template>

<script setup>
import { message, Modal } from 'ant-design-vue'
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import EditDialog from './components/EditDialog.vue'
import Role from './components/Role.vue'

defineOptions({
    name: 'systemRole',
})

const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 160 },
    { title: '邮箱', dataIndex: 'email', width: 240 },
    { title: '部门', dataIndex: 'title' },
    { title: '操作', key: 'action', fixed: 'right', width: 120 },
]

const { listData, loading, showLoading, hideLoading, paginationState, resetPagination, searchFormData } =
    usePagination()

const editDialogRef = ref()
const selectedRole = ref()

/**
 * 获取用户列表
 * @returns {Promise<void>}
 */
async function getPageList() {
    try {
        showLoading()
        const { pageSize, current } = paginationState
        const { code, data } = await apis.common
            .getPageList({
                pageSize,
                page: current,
            })
            .catch(() => {
                throw new Error()
            })
        hideLoading()
        if (config('http.code.success') === code) {
            const { records, pagination } = data
            listData.value = records
            paginationState.total = pagination.total
        }
    } catch (error) {
        hideLoading()
    }
}

/**
 * 移除
 */
function handleRemove({ id }) {
    Modal.confirm({
        title: '移除提示',
        content: '确认移除？',
        okText: '确认',
        onOk: () => {
            return new Promise((resolve, reject) => {
                ;(async () => {
                    try {
                        const { code } = await apis.common.del(id).catch(() => {
                            throw new Error()
                        })
                        if (config('http.code.success') === code) {
                            resolve()
                            message.success('移除成功')
                            await getPageList()
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
    getPageList()
}

/**
 * 角色发生改变
 */
function onRoleChange(payload) {
    selectedRole.value = payload
    resetPagination()
    getPageList()
}

/**
 * 编辑完成
 */
async function onOk() {
    await getPageList()
}
</script>

<style lang="less" scoped></style>
