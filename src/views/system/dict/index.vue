<template>
    <a-row
        :gutter="16"
        type="flex"
        class="hp-100">
        <a-col flex="0 0 300px">
            <dict-type-tree @select="onDictTypeSelect" />
        </a-col>
        <a-col flex="1">
            <a-card
                :bordered="false"
                type="flex">
                <template v-if="!dictTypeInfo">
                    <a-empty description="请选择字典分类"></a-empty>
                </template>
                <template v-else>
                    <x-action-bar class="mb-8-2">
                        <a-button
                            type="primary"
                            @click="$refs.editRef.handleCreate()">
                            <template #icon>
                                <icon-plus-outlined />
                            </template>
                            新建项
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
                                                @click="handleSearch"
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
                        :pagination="pagination"
                        :data-source="list"
                        :loading="loading"
                        row-key="id"
                        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                        @change="onTableChange">
                        <template #bodyCell="{ column, record }">
                            <template v-if="'valid' === column.key">
                                <a-switch
                                    :checked="record.valid"
                                    size="small"></a-switch>
                            </template>
                            <template v-if="'action' === column.key">
                                <x-action-button @click="$refs.editRef.handleEdit(record)">编辑</x-action-button>
                                <x-action-button @click="handleDelete(record)"> 删除 </x-action-button>
                            </template>
                        </template>
                    </a-table>
                </template>
            </a-card>
        </a-col>
    </a-row>

    <edit
        ref="editRef"
        @ok="onOk" />
</template>

<script>
export default { name: 'systemDict' }
</script>

<script setup>
import { ref } from 'vue'
import { message, Modal } from 'ant-design-vue'

import api from '@/api'

import usePagination from '@/hooks/usePagination'

import Edit from './components/Edit.vue'
import DictTypeTree from './components/DictTypeTree.vue'

const { list, pagination, loading, resetPagination, searchForm } = usePagination()
const selectedRowKeys = ref([])
const editRef = ref()
const dictTypeInfo = ref(null)

const columns = [
    { title: '名称', dataIndex: 'name' },
    { title: '键值', dataIndex: 'keyValue', width: 240 },
    { title: '是否有效', key: 'valid', dataIndex: 'valid', width: 120 },
    { title: '操作', key: 'action', width: 120 },
]

/**
 * 获取分页列表
 */
async function getPageList() {
    const { pageSize, current } = pagination
    loading.value = true
    const { code, data } = await api.common
        .getPageList({
            pageSize,
            page: current,
            ...searchForm.value,
        })
        .catch(() => {
            loading.value = false
        })
    loading.value = false
    if (200 === code) {
        list.value = data.rows
        pagination.total = data.total
    }
}

/**
 * 搜索
 */
function handleSearch() {
    resetPagination()
    getPageList()
}

/**
 * 删除
 */
async function handleDelete({ id }) {
    Modal.confirm({
        title: '删除提示',
        content: '确认删除？',
        onOk: async () => {
            loading.value = true
            const { code } = await api.common
                .deleteData({
                    id,
                })
                .catch(() => {
                    loading.value = false
                })
            if (200 === code) {
                message.success('删除成功')
                await getPageList()
            } else {
                loading.value = false
            }
        },
    })
}

/**
 * 表格发生改变
 * @param current
 * @param pageSize
 */
function onTableChange({ current, pageSize }) {
    pagination.current = current
    pagination.pageSize = pageSize
    getPageList()
}

/**
 * 选择
 */
function onSelectChange(keys) {
    selectedRowKeys.value = keys
}

/**
 * 选择分类
 * @param info
 */
function onDictTypeSelect(info) {
    dictTypeInfo.value = info
    searchForm.value.type = info.key
    getPageList()
}

/**
 * 完成
 */
function onOk() {
    getPageList()
}
</script>

<style lang="less" scoped></style>
