<template>
    <a-row
        :gutter="8"
        :wrap="false">
        <a-col flex="0 0 280px">
            <dict
                v-model:value="searchFormData.role"
                @change="onDictChange"></dict>
        </a-col>
        <a-col flex="auto">
            <a-card type="flex">
                <template #title>
                    <span>{{ selectedDict?.title }}</span>
                    <span class="fs-14 fw-400 ml-8-2">{{ selectedDict?.key }}</span>
                </template>
                <x-action-bar class="mb-8-2">
                    <a-button
                        type="primary"
                        @click="$refs.editDialogRef.handleCreate()">
                        <template #icon>
                            <plus-outlined></plus-outlined>
                        </template>
                        新建项
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
                    @change="onTableChange">
                    <template #bodyCell="{ column, record }">
                        <template v-if="'action' === column.key">
                            <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                            <x-action-button @click="handleDelete(record)">删除</x-action-button>
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
import Dict from './components/Dict.vue'

defineOptions({
    name: 'systemDict',
})

const columns = [
    { title: '名称', dataIndex: 'title', fixed: 'left' },
    { title: '唯一值', dataIndex: 'key', width: 160 },
    { title: '状态', dataIndex: 'status', width: 160 },
    { title: '操作', key: 'action', fixed: 'right', width: 120 },
]

const { listData, loading, showLoading, hideLoading, paginationState, resetPagination, searchFormData } =
    usePagination()

const editDialogRef = ref()
const selectedDict = ref(null)

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
 * 删除
 */
function handleDelete({ id }) {
    Modal.confirm({
        title: '删除提示',
        content: '确认删除？',
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
                            message.success('删除成功')
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
 * 字典发生改变
 */
function onDictChange(payload) {
    selectedDict.value = payload
    console.log(payload)
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
