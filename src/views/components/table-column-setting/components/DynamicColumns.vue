<demo>
## 动态列
根据业务场景动态设置表格列。
</demo>

<!-- #region snippet -->
<template>
    <x-toolbar>
        <a-space>
            <x-table-column-setting
                ref="tableColumnSettingRef"
                v-model:columns="columns">
                <a-tooltip title="列设置">
                    <a-button type="text">
                        <template #icon>
                            <setting-outlined></setting-outlined>
                        </template>
                    </a-button>
                </a-tooltip>
            </x-table-column-setting>

            <a-button @click="handleDynamic">动态设置列</a-button>
        </a-space>
    </x-toolbar>
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        class="mt-8-2">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span>
                    <smile-outlined />
                    {{ column.title }}
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
                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
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
                        <down-outlined class="fs-10"></down-outlined>
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

<script setup>
import { DownOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { TableColumnSetting as XTableColumnSetting, Toolbar as XToolbar } from '@/components'
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
const tableColumnSettingRef = ref()

function handleDynamic() {
    columns.value = [
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Action',
            key: 'action',
        },
    ]

    tableColumnSettingRef.value.init(columns.value)
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
