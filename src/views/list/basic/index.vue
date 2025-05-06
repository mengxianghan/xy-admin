<script setup>
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import { MoreOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import EditDialog from './components/EditDialog.vue'

defineOptions({
  name: 'ListBasic',
})

const { listData, paginationState, loading, showLoading, hideLoading, resetPagination, searchFormData }
    = usePagination()
const editDialogRef = ref()

paginationState.onChange = (page, pageSize) => {
  paginationState.current = page
  paginationState.pageSize = pageSize
  getPageList()
}

searchFormData.value = {
  status: 0,
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

/**
 * 删除
 */
function handleDelete({ id }) {
  Modal.confirm({
    title: '删除提示',
    content: '确认删除？',
    onOk: () => {
      return new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const { code } = await apis.common.del(id).catch((err) => {
              throw new Error(err)
            })
            if (config('http.code.success') === code) {
              resolve()
              message.success('删除成功')
              await getPageList()
            }
          }
          catch (err) {
            reject(err)
          }
        })()
      })
    },
  })
}

/**
 * 完成
 */
function onOk() {
  getPageList()
}
</script>

<template>
  <a-card class="mb-8-2">
    <a-row class="align-center">
      <a-col
        :sm="8"
        :xs="24"
      >
        <a-statistic
          title="我的待办"
          value="8个任务"
        />
      </a-col>
      <a-col
        :sm="8"
        :xs="24"
      >
        <a-statistic
          title="本周任务平均处理时间"
          value="32分钟"
        />
      </a-col>
      <a-col
        :sm="8"
        :xs="24"
      >
        <a-statistic
          title="本周完成任务数"
          value="24个任务"
        />
      </a-col>
    </a-row>
  </a-card>
  <a-card title="基本列表">
    <template #extra>
      <a-space>
        <a-radio-group
          v-model:value="searchFormData.status"
          @change="handleSearch"
        >
          <a-radio-button :value="0">
            全部
          </a-radio-button>
          <a-radio-button :value="1">
            进行中
          </a-radio-button>
          <a-radio-button :value="2">
            等待中
          </a-radio-button>
        </a-radio-group>
        <a-input-search
          v-model:value="searchFormData.keyword"
          placeholder="请输入"
          @search="handleSearch"
        />
      </a-space>
    </template>
    <a-list
      :data-source="listData"
      :loading="loading"
      :pagination="paginationState"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <x-action-button
              :divider="false"
              @click="$refs.editDialogRef.handleEdit()"
            >
              编辑
            </x-action-button>
            <x-action-button :divider="false">
              <a-dropdown>
                <more-outlined />
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="handleDelete">
                      删除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </x-action-button>
          </template>
          <a-list-item-meta :description="item.sentence">
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar>
              <a-avatar
                :size="48"
                :src="item.avatar"
                shape="square"
              />
            </template>
          </a-list-item-meta>
          <a-row
            :gutter="40"
            align="middle"
            class="color-secondary align-right"
          >
            <a-col>
              <div>Owner</div>
              <div>{{ item.name }}</div>
            </a-col>
            <a-col>
              <div>开始时间</div>
              <div>{{ dayjs(item.datetime).format('MM-DD HH:mm') }}</div>
            </a-col>
            <a-col>
              <a-progress
                :percent="item.percent"
                :style="{ width: '180px' }"
              />
            </a-col>
          </a-row>
        </a-list-item>
      </template>
    </a-list>
  </a-card>

  <edit-dialog
    ref="editDialogRef"
    @ok="onOk"
  />
</template>

<style lang="less" scoped></style>
