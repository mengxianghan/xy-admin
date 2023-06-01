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
                    :body-style="{ padding: '24px' }"
                    :bordered="false">
                    <a-card-meta :title="item.title">
                        <template #avatar>
                            <a-avatar
                                :src="item.avatar"
                                :size="24" />
                        </template>
                        <template #description>
                            <a-row type="flex">
                                <a-col flex="1">
                                    <a-statistic
                                        title="活跃用户"
                                        :value="item.activeUsers">
                                        <template #suffix>
                                            <span class="fs-14">万</span>
                                        </template>
                                    </a-statistic>
                                </a-col>
                                <a-col flex="1">
                                    <a-statistic
                                        title="新增用户"
                                        :value="item.newUsers">
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
import { DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { CODE_SUCCESS } from '@/config/http'
import usePagination from '@/hooks/usePagination.js'
import PageHeader from '../components/PageHeader.vue'
import api from '@/api'

defineOptions({
    name: 'listSearchApplications',
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
