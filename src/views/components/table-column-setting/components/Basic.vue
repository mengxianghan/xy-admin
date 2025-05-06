<demo>
## 基础用法
columns 结构中必须存在 `title` 和 `key`
</demo>

<!-- #region snippet -->
<script setup>
import { TableColumnSetting as XTableColumnSetting, Toolbar as XToolbar } from '@/components'
import { DownOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
])

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
])
</script>

<template>
  <x-toolbar>
    <x-table-column-setting v-model:columns="columns">
      <a-tooltip title="列设置">
        <a-button type="text">
          <template #icon>
            <setting-outlined />
          </template>
        </a-button>
      </a-tooltip>
    </x-table-column-setting>
  </x-toolbar>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
    class="mt-8-2"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'title'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <x-action-button>Edit</x-action-button>
        <x-action-button>Delete</x-action-button>
        <a-dropdown>
          <x-action-button>
            More
            <down-outlined class="fs-10" />
          </x-action-button>
          <template #overlay>
            <a-menu>
              <a-menu-item> 1st menu item</a-menu-item>
              <a-menu-item> 2nd menu item</a-menu-item>
              <a-menu-item> 3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
