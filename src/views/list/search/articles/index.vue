<template>
    <page-header></page-header>
    <a-card class="mb-8-2">
        <x-filter
            v-model="searchFormData"
            :data-source="filterData"
            :label-width="100"
            @change="handleSearch">
            <template #default="{ record }">
                <template v-if="record.key === 'owner'">
                    <x-filter-item :label="record.label">
                        <a-space :size="16">
                            <a-select
                                v-model:value="searchFormData.owner"
                                mode="multiple"
                                :style="{ minWidth: '100px' }"
                                :options="[
                                    { label: '我自己', value: 0 },
                                    { label: '张三', value: 1 },
                                    { label: '李四', value: 2 },
                                    { label: '王五', value: 3 },
                                ]"></a-select>
                            <a @click="() => (searchFormData.owner = [0])">只看自己的</a>
                        </a-space>
                    </x-filter-item>
                </template>
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

    <a-card>
        <a-list
            row-key="id"
            item-layout="vertical"
            :data-source="listData"
            :pagination="paginationState"
            :loading="loading">
            <template #renderItem="{ item }">
                <a-list-item key="item.title">
                    <template #actions>
                        <span> <star-outlined></star-outlined> {{ item.count1 }} </span>
                        <span> <like-outlined></like-outlined> {{ item.count2 }} </span>
                        <span> <message-outlined></message-outlined> {{ item.count3 }} </span>
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            <a>{{ item.title }}</a>
                        </template>
                        <template #description>
                            <a-tag
                                v-for="tag in item.tags"
                                :key="tag.id">
                                {{ tag.name }}
                            </a-tag>
                        </template>
                    </a-list-item-meta>
                    <div>{{ item.paragraph }}</div>
                    <div class="mt-8-2 display-flex align-items-center">
                        <a-avatar
                            class="mr-8-1"
                            :src="item.avatar"
                            :size="20"></a-avatar>
                        <a class="mr-8-1">{{ item.name }}</a>
                        <span class="color-secondary mr-4-1">发布在</span>
                        <a>{{ item.link }}</a>
                        <span class="color-secondary ml-8-3">{{ item.datetime }}</span>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import PageHeader from '../components/PageHeader.vue'

defineOptions({
    name: 'listSearchArticles',
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
        key: 'owner',
        label: 'owner',
    },
    {
        key: 'other',
        label: '活跃用户',
    },
])

paginationState.onChange = (page, pageSize) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    getPageList()
}

searchFormData.value = {
    owner: [1, 2],
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
