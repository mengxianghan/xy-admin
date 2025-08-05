<script setup>
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { ref } from 'vue'
import apis from '@/apis'
import { config } from '@/config'
import { menuTypeEnum } from '@/enums/system'
import { usePagination } from '@/hooks'

import EditDialog from './components/EditDialog.vue'

defineOptions({
  name: 'SystemMenu',
})

const columns = ref([
  { title: '名称', dataIndex: 'title' },
  { title: '类型', dataIndex: 'menu_type', key: 'menuType', width: 120 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '操作', key: 'action', width: 120 },
])
const { listData, loading, showLoading, hideLoading } = usePagination()
const editDialogRef = ref()

getList()

/**
 * 获取菜单列表
 * @return {Promise<void>}
 */
async function getList() {
  try {
    showLoading()
    const { code, data } = await apis.common.getPageList().catch((err) => {
      throw new Error(err)
    })
    hideLoading()
    if (config('http.code.success') === code) {
      const { records } = data
      listData.value = records
    }
  }
  catch {
    hideLoading()
  }
}

/**
 * 删除
 * @param {object} params
 * @param {string} params.id
 */
function handleDelete({ id }) {
  Modal.confirm({
    title: '删除提示',
    content: '确认删除？',
    okText: '确认',
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
              await getList()
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
</script>

<template>
  <a-card>
    <x-toolbar class="mb-8-2">
      <a-button
        type="primary"
        @click="$refs.editDialogRef.handleCreate()"
      >
        <template #icon>
          <plus-outlined />
        </template>
        新建菜单
      </a-button>
    </x-toolbar>

    <a-table
      :columns="columns"
      :data-source="listData"
      :expand-icon-column-index="1"
      :loading="loading"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="'menuType' === column.key">
          <!-- 菜单 -->
          <a-tag
            v-if="menuTypeEnum.is('menu', record.menu_type)"
            color="processing"
          >
            {{ menuTypeEnum.getDesc(record.menu_type) }}
          </a-tag>
          <!-- 按钮 -->
          <a-tag
            v-if="menuTypeEnum.is('button', record.menu_type)"
            color="success"
          >
            {{ menuTypeEnum.getDesc(record.menu_type) }}
          </a-tag>
        </template>
        <template v-if="'action' === column.key">
          <x-action-button @click="$refs.editDialogRef.handleEdit(record)">
            编辑
          </x-action-button>
          <x-action-button tag="span">
            <a-dropdown :trigger="['click']">
              <x-action-button>
                <ellipsis-outlined />
              </x-action-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="$refs.editDialogRef.handleEdit(record)">
                    新建下级
                  </a-menu-item>
                  <a-menu-item>克隆</a-menu-item>
                  <a-menu-item @click="handleDelete(record)">
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </x-action-button>
        </template>
      </template>
    </a-table>
  </a-card>

  <edit-dialog ref="editDialogRef" />
</template>

<style lang="less" scoped></style>
