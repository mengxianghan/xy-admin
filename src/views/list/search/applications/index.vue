<script setup>
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import { DownloadOutlined, EditOutlined, EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
import PageHeader from '../components/PageHeader.vue'

defineOptions({
  name: 'ListSearchApplications',
})

const { listData, paginationState, loading, showLoading, hideLoading, resetPagination, searchFormData }
    = usePagination()

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

/**
 * 搜索
 */
function handleSearch() {
  resetPagination()
  getPageList()
}
</script>

<template>
  <page-header />
  <a-card class="mb-8-2">
    <x-filter :label-col="{ style: { width: '100px' } }">
      <x-filter-item label="所属类目">
        <x-tag-select
          v-model="searchFormData.category"
          :options="[
            { label: '全部', unlimited: true },
            { label: '类目1', value: 1 },
            { label: '类目2', value: 2 },
            { label: '类目3', value: 3 },
            { label: '类目4', value: 4 },
            { label: '类目5', value: 5 },
            { label: '类目6', value: 6 },
            { label: '类目7', value: 7 },
            { label: '类目8', value: 8 },
          ]"
          @change="handleSearch"
        />
      </x-filter-item>
      <a-row>
        <a-col>
          <x-filter-item label="作者">
            <a-select
              :style="{ minWidth: '100px' }"
              placeholder="不限"
              @change="handleSearch"
            />
          </x-filter-item>
        </a-col>
        <a-col>
          <x-filter-item label="好评度">
            <a-select
              :style="{ minWidth: '100px' }"
              placeholder="不限"
              @change="handleSearch"
            />
          </x-filter-item>
        </a-col>
      </a-row>
    </x-filter>
  </a-card>

  <a-list
    :data-source="listData"
    :grid="{ gutter: 16, md: 2, lg: 2, xl: 3, xxl: 4 }"
    :loading="loading"
    item-layout="vertical"
    row-key="id"
  >
    <template #renderItem="{ item }">
      <a-list-item
        key="item.title"
        class="pa-0"
      >
        <a-card
          :body-style="{ padding: '24px' }"
          hoverable
        >
          <a-card-meta :title="item.title">
            <template #avatar>
              <a-avatar
                :size="24"
                :src="item.avatar"
              />
            </template>
            <template #description>
              <a-row type="flex">
                <a-col flex="1">
                  <a-statistic
                    :value="item.count1"
                    title="活跃用户"
                  >
                    <template #suffix>
                      <span class="fs-14">万</span>
                    </template>
                  </a-statistic>
                </a-col>
                <a-col flex="1">
                  <a-statistic
                    :value="item.count2"
                    title="新增用户"
                  />
                </a-col>
              </a-row>
            </template>
          </a-card-meta>
          <template #actions>
            <download-outlined />
            <edit-outlined />
            <share-alt-outlined />
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

<style lang="less" scoped></style>
