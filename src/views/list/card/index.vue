<script setup>
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import { EditOutlined, EllipsisOutlined, LinkOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons-vue'

defineOptions({
  name: 'ListCard',
})

const { loading, listData, showLoading, hideLoading, paginationState } = usePagination()

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
  <a-page-header
    :ghost="false"
    main
    title="卡片列表"
  >
    <a-row
      align="middle"
      type="flex"
    >
      <a-col
        :gutter="88"
        flex="1"
      >
        <div>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </div>
        <a-space
          :size="24"
          class="mt-8-1"
        >
          <a>
            <link-outlined />
            Quick Start
          </a>
          <a>
            <link-outlined />
            Product Info
          </a>
          <a>
            <link-outlined />
            Product Doc
          </a>
        </a-space>
      </a-col>
      <a-col flex="0 0 242px">
        <img
          :style="{ margin: '-20px 0 0' }"
          alt=""
          src="http://cdn.xuanyunet.com/images/img_1.png"
          width="155"
        >
      </a-col>
    </a-row>
  </a-page-header>
  <a-list
    :data-source="listData"
    :grid="{ gutter: 16, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }"
    :loading="loading"
  >
    <template #renderItem="{ item }">
      <template v-if="!item.id">
        <a-list-item>
          <a-card :body-style="{ padding: 0 }">
            <a-button
              class="create-btn"
              type="dashed"
            >
              <plus-outlined />
              新增
            </a-button>
          </a-card>
        </a-list-item>
      </template>
      <template v-else>
        <a-list-item>
          <a-card>
            <a-card-meta :title="item.title">
              <template #avatar>
                <a-avatar :src="item.avatar" />
              </template>
              <template #description>
                <a-typography-paragraph
                  :content="item.paragraph"
                  :ellipsis="{ rows: 3 }"
                />
              </template>
            </a-card-meta>
            <template #actions>
              <setting-outlined key="setting" />
              <edit-outlined key="edit" />
              <a-dropdown :trigger="['click']">
                <ellipsis-outlined key="ellipsis" />
                <template #overlay>
                  <a-menu>
                    <a-menu-item>菜单 1</a-menu-item>
                    <a-menu-item>菜单 2</a-menu-item>
                    <a-menu-item>菜单 3</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </template>
  </a-list>
</template>

<style lang="less" scoped>
.create-btn {
  width: 100%;
  height: 203px;
}
</style>
