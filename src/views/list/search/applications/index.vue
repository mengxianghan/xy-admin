<template>
    <page-header></page-header>
    <a-card class="mb-8-2">
        <x-filter
            v-model="searchFormData"
            :data-source="filterData"
            :label-width="100"
            @change="handleSearch">
            <template #default="{ record }">
                <template v-if="record.key === 'other'">
                    <x-filter-item :label="record.label">
                        <a-row :gutter="40">
                            <a-col>
                                <a-select
                                    :style="{ minWidth: '100px' }"
                                    placeholder="不限"></a-select>
                            </a-col>
                            <a-col>
                                <a-form-item
                                    class="mb-0"
                                    label="好评度">
                                    <a-select
                                        :style="{ minWidth: '100px' }"
                                        placeholder="不限"></a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </x-filter-item>
                </template>
            </template>
        </x-filter>
    </a-card>

    <a-list
        :data-source="listData"
        :grid="{ gutter: 16, md: 2, lg: 2, xl: 3, xxl: 4 }"
        :loading="loading"
        item-layout="vertical"
        row-key="id">
        <template #renderItem="{ item }">
            <a-list-item
                key="item.title"
                class="pa-0">
                <a-card
                    :body-style="{ padding: '24px' }"
                    hoverable>
                    <a-card-meta :title="item.title">
                        <template #avatar>
                            <a-avatar
                                :size="24"
                                :src="item.avatar" />
                        </template>
                        <template #description>
                            <a-row type="flex">
                                <a-col flex="1">
                                    <a-statistic
                                        :value="item.count1"
                                        title="活跃用户">
                                        <template #suffix>
                                            <span class="fs-14">万</span>
                                        </template>
                                    </a-statistic>
                                </a-col>
                                <a-col flex="1">
                                    <a-statistic
                                        :value="item.count2"
                                        title="新增用户">
                                    </a-statistic>
                                </a-col>
                            </a-row>
                        </template>
                    </a-card-meta>
                    <template #actions>
                        <download-outlined />
                        <edit-outlined />
                        <share-alt-outlined></share-alt-outlined>
                        <a-dropdown>
                            <ellipsis-outlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>1st menu item</a-menu-item>
                                    <a-menu-item>2nd menu item</a-menu-item>
                                    <a-menu-item>3d menu item</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { ref } from 'vue'

import { DownloadOutlined, EditOutlined, EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import PageHeader from '../components/PageHeader.vue'

defineOptions({
    name: 'listSearchApplications',
})

const { listData, paginationState, loading, showLoading, hideLoading, resetPagination, searchFormData } =
    usePagination()

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

paginationState.onChange = (page, pageSize) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    getPageList()
}

getPageList()

/**
 * 获取分页列表
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
 * 搜索
 */
function handleSearch() {
    resetPagination()
    getPageList()
}
</script>

<style lang="less" scoped></style>
