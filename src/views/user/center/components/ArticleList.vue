<script setup>
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'

defineOptions({
  name: 'ArticleList',
})

const { listData, loading, showLoading, hideLoading, paginationState } = usePagination()

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
      .catch((err) => {
        throw new Error(err)
      })
    hideLoading()
    if (config('http.code.success') === code) {
      const { records, pagination } = data
      listData.value = records
      paginationState.total = pagination.total
    }
  }
  catch {
    hideLoading()
  }
}
</script>

<template>
  <a-list
    :data-source="listData"
    :loading="loading"
    :pagination="paginationState"
    item-layout="vertical"
    row-key="id"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span> <star-outlined /> {{ item.count1 }} </span>
          <span> <like-outlined /> {{ item.count2 }} </span>
          <span> <message-outlined /> {{ item.count3 }} </span>
        </template>
        <a-list-item-meta>
          <template #title>
            <a>{{ item.title }}</a>
          </template>
          <template #description>
            <a-tag
              v-for="tag in item.tags"
              :key="tag.id"
            >
              {{ tag.name }}
            </a-tag>
          </template>
        </a-list-item-meta>
        <div>{{ item.sentence }}</div>
        <div class="mt-8-2 display-flex align-items-center">
          <a-avatar
            :size="20"
            :src="item.avatar"
            class="mr-8-1"
          />
          <a class="mr-8-1">{{ item.name }}</a>
          <span class="color-secondary mr-4-1">发布在</span>
          <a>{{ item.link }}</a>
          <span class="color-secondary ml-8-3">{{ item.datetime }}</span>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<style lang="less" scoped></style>
