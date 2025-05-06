<script setup>
import apis from '@/apis'
import { TableColumnSetting as XTableColumnSetting } from '@/components'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import {
  ColumnHeightOutlined,
  DownOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  UpOutlined,
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { ref } from 'vue'
import EditDialog from './components/EditDialog.vue'

defineOptions({
  name: 'ListTable',
})

const {
  listData,
  paginationState,
  loading,
  showLoading,
  hideLoading,
  resetPagination,
  searchFormData,
  refreshPagination,
} = usePagination()

const columns = ref([
  { title: '序号', key: 'no', dataIndex: 'no', ignoreSetting: true, customRender: ({ index }) => index + 1 },
  { title: '规则名称', key: 'title', dataIndex: 'title' },
  { title: '描述', key: 'description', dataIndex: 'sentence' },
  { title: '状态', key: 'status', dataIndex: 'status' },
  { title: '操作', key: 'action', width: 160 },
])
const editDialogRef = ref()
const tableColumnSettingRef = ref()
const collapsed = ref(true)
const size = ref('default')

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
            const { code } = await apis.common.del(id)
              .catch((err) => {
                throw new Error(err)
              })
            if (config('http.code.success') === code) {
              resolve()
              message.success('删除成功')
              refreshPagination()
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
 * 密度
 * @param {string} key
 */
function handleSize({ key }) {
  size.value = key
}

/**
 * 表格发生改变
 * @param {object} params
 * @param {number} params.current
 * @param {number} params.pageSize
 */
function onTableChange({ current, pageSize }) {
  paginationState.current = current
  paginationState.pageSize = pageSize
  getPageList()
}

/**
 * 完成
 */
function onOk() {
  getPageList()
}
</script>

<template>
  <x-search
    :collapsed="collapsed"
    :columns="{ sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }"
    :label-col="{ style: { width: '100px' } }"
    :model="searchFormData"
  >
    <x-search-item name="title">
      <template #label>
        规则名称
        <a-tooltip title="规则名称是唯一的 key">
          <question-circle-outlined class="ml-4-1 color-placeholder" />
        </a-tooltip>
      </template>
      <a-input v-model:value="searchFormData.title" />
    </x-search-item>
    <x-search-item
      label="描述"
      name="description"
    >
      <a-input v-model:value="searchFormData.description" />
    </x-search-item>
    <x-search-item label="服务调用次数">
      <a-input />
    </x-search-item>
    <x-search-item label="状态">
      <a-select />
    </x-search-item>
    <x-search-item label="上次调度时间">
      <a-date-picker placeholder="" />
    </x-search-item>
    <x-search-item
      class="align-right"
      suffix
    >
      <a-space>
        <a-button>重置</a-button>
        <a-button
          ghost
          type="primary"
          @click="handleSearch"
        >
          搜索
        </a-button>
        <a @click="() => (collapsed = !collapsed)">
          展开
          <template v-if="collapsed">
            <down-outlined class="fs-12" />
          </template>
          <template v-else>
            <up-outlined class="fs-12" />
          </template>
        </a>
      </a-space>
    </x-search-item>
  </x-search>
  <a-card class="mt-8-2">
    <x-toolbar>
      <a-button
        type="primary"
        @click="$refs.editDialogRef.handleCreate()"
      >
        <template #icon>
          <plus-outlined />
        </template>
        新建
      </a-button>
      <template #extra>
        <a-space>
          <a-tooltip title="刷新">
            <a-button
              type="text"
              @click="handleSearch"
            >
              <template #icon>
                <reload-outlined />
              </template>
            </a-button>
          </a-tooltip>
          <a-dropdown>
            <a-tooltip title="密度">
              <a-button type="text">
                <template #icon>
                  <column-height-outlined />
                </template>
              </a-button>
            </a-tooltip>
            <template #overlay>
              <a-menu
                :selected-keys="[size]"
                @click="handleSize"
              >
                <a-menu-item key="default">
                  默认
                </a-menu-item>
                <a-menu-item key="middle">
                  中等
                </a-menu-item>
                <a-menu-item key="small">
                  紧凑
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <x-table-column-setting
            ref="tableColumnSettingRef"
            v-model:columns="columns"
          >
            <a-tooltip title="列设置">
              <a-button type="text">
                <template #icon>
                  <setting-outlined />
                </template>
              </a-button>
            </a-tooltip>
          </x-table-column-setting>
        </a-space>
      </template>
    </x-toolbar>
    <a-table
      :columns="columns"
      :data-source="listData"
      :loading="loading"
      :pagination="paginationState"
      :size="size"
      class="mt-8-2"
      row-key="id"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="'action' === column.key">
          <x-action-button @click="$refs.editDialogRef.handleEdit(record)">
            编辑
          </x-action-button>
          <x-action-button @click="handleDelete(record)">
            删除
          </x-action-button>
          <x-action-button>
            <a-dropdown :trigger="['click']">
              <more-outlined />
              <template #overlay>
                <a-menu>
                  <a-menu-item>菜单1</a-menu-item>
                  <a-menu-item>菜单2</a-menu-item>
                  <a-menu-item>菜单3</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </x-action-button>
        </template>
      </template>
    </a-table>
  </a-card>

  <edit-dialog
    ref="editDialogRef"
    @ok="onOk"
  />
</template>

<style lang="less" scoped></style>
