<template>
    <a-list
        row-key="id"
        item-layout="vertical"
        :data-source="list"
        :loading="loading"
        :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item key="item.title">
                <template #actions>
                    <span> <star-outlined></star-outlined> {{ item.star }} </span>
                    <span> <like-outlined></like-outlined> {{ item.like }} </span>
                    <span> <message-outlined></message-outlined> {{ item.comment }} </span>
                </template>
                <a-list-item-meta>
                    <template #title>
                        <a>{{ item.title }}</a>
                    </template>
                    <template #description>
                        <a-tag
                            v-for="tag in item.tags"
                            :key="tag">
                            {{ tag }}
                        </a-tag>
                    </template>
                </a-list-item-meta>
                <div>{{ item.content }}</div>
                <div class="mt-8-2 display-flex align-items-center">
                    <a-avatar
                        class="mr-8-1"
                        :src="item.avatar"
                        :size="20"></a-avatar>
                    <a class="mr-8-1">{{ item.userName }}</a>
                    <span class="color-secondary mr-4-1">发布在</span>
                    <a>{{ item.url }}</a>
                    <span class="color-secondary ml-8-3">{{ item.time }}</span>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup>
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'

import apis from '@/apis'
import { CODE_SUCCESS } from '@/config/http'
import usePagination from '@/hooks/usePagination.js'

defineOptions({
    name: 'ArticleList',
})

const { list, loading, pagination } = usePagination()

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
    const { code, data } = await apis.common
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
</script>

<style lang="less" scoped></style>
