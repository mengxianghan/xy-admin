<template>
    <page-header></page-header>
    <a-card
        class="mb-8-2"
        :bordered="false">
        <x-filter
            v-model="searchForm"
            :data-source="filterData"
            :label-width="100"
            @change="handleSearch">
            <template #default="{ record }">
                <template v-if="record.key === 'other'">
                    <x-filter-item :label="record.label">
                        <a-row :gutter="40">
                            <a-col>
                                <a-select
                                    placeholder="不限"
                                    :style="{ minWidth: '100px' }"></a-select>
                            </a-col>
                            <a-col>
                                <a-form-item
                                    label="好评度"
                                    class="mb-0">
                                    <a-select
                                        placeholder="不限"
                                        :style="{ minWidth: '100px' }"></a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </x-filter-item>
                </template>
            </template>
        </x-filter>
    </a-card>

    <a-list
        row-key="id"
        item-layout="vertical"
        :grid="{ gutter: 16, md: 2, lg: 2, xl: 3, xxl: 4 }"
        :data-source="list"
        :loading="loading">
        <template #renderItem="{ item }">
            <a-list-item key="item.title">
                <a-card
                    hoverable
                    :bordered="false">
                    <template #cover>
                        <img
                            alt=""
                            :src="item.cover" />
                    </template>
                    <a-card-meta :title="item.title">
                        <template #description>
                            <div>{{ item.desc1 }}</div>
                            <a-row
                                class="mt-4-3"
                                type="flex"
                                align="middle"
                                justify="space-between"
                                :style="{ lineHeight: 1 }">
                                <a-col class="fs-12">
                                    {{ item.time1 }}
                                </a-col>
                                <a-col>
                                    <a-avatar-group>
                                        <a-avatar
                                            v-for="user in item.userList"
                                            :key="user.id"
                                            :src="user.avatar"
                                            :size="22"></a-avatar>
                                    </a-avatar-group>
                                </a-col>
                            </a-row>
                        </template>
                    </a-card-meta>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { ref } from 'vue'

import api from '@/api'
import { CODE_SUCCESS } from '@/config/http'
import usePagination from '@/hooks/usePagination'

import PageHeader from '../components/PageHeader.vue'

defineOptions({
    name: 'listSearchProjects',
})

const { list, pagination, loading, resetPagination, searchForm } = usePagination()

const filterData = ref([
    {
        key: 'category',
        label: '所属类目',
        options: [
            { label: '全部', value: 0 },
            { label: '类目1', value: 1 },
            { label: '类目2', value: 2 },
            { label: '类目3', value: 3 },
            { label: '类目4', value: 4 },
            { label: '类目5', value: 5 },
            { label: '类目6', value: 6 },
            { label: '类目7', value: 7 },
            { label: '类目8', value: 8 },
        ],
    },
    {
        key: 'other',
        label: '作者',
    },
])

pagination.onChange = (page, pageSize) => {
    pagination.current = page
    pagination.pageSize = pageSize
    getPageList()
}

getPageList()

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
    if (CODE_SUCCESS === code) {
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
</script>

<style lang="less" scoped></style>
