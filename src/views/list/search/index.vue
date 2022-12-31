<template>
    <a-card :bordered="false">
        <x-filter
            :data-source="filterData"
            :label-width="100"
            :model-value="searchForm"
            @change="handleSearch"></x-filter>
    </a-card>

    <a-card
        :bordered="false"
        class="mt-8-2">
        <a-table
            :columns="columns"
            :pagination="pagination"
            :data-source="list"
            :loading="loading"
            row-key="id"
            @change="onTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="'action' === column.key">
                    <x-action-button>编辑</x-action-button>
                    <x-action-button @click="handleDelete(record)"> 删除 </x-action-button>
                    <x-action-button tag="span">
                        <a-dropdown :trigger="['click']">
                            <a>
                                更多
                                <icon-down-outlined />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>菜单 1</a-menu-item>
                                    <a-menu-item>菜单 2</a-menu-item>
                                    <a-menu-item>菜单 3</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>
</template>

<script>
export default {
    name: 'listSearch',
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'

import api from '@/api'

import usePagination from '@/hooks/usePagination'

const columns = [
    { title: 'ID', dataIndex: 'id', width: 64, align: 'center' },
    { title: '标题', dataIndex: 'title' },
    { title: '操作', key: 'action', width: 180 },
]
const { list, pagination, loading, resetPagination, searchForm } = usePagination()
const filterData = ref([
    {
        label: '所属类目',
        key: 'type',
        type: 'tag',
        options: [
            { label: '全部', value: 0 },
            { label: '类目2', value: 2 },
            { label: '类目3', value: 3 },
            { label: '类目4', value: 4 },
            { label: '类目5', value: 5 },
        ],
    },
    { label: 'owner', key: 'owner', type: 'input' },
])

onMounted(() => {
    getPageList()
})

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
</script>

<style lang="less" scoped></style>
