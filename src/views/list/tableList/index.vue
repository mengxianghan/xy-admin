<template>
    <x-search-bar class="mb-8-2">
        <a-form layout="inline">
            <a-row :gutter="12">
                <a-col :span="6">
                    <a-form-item label="标题">
                        <a-input></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="标题">
                        <a-select></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="标题">
                        <a-range-picker></a-range-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-button type="primary"
                              ghost>搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </x-search-bar>
    <a-card :bordered="false">
        <x-action-bar class="mb-8-2">
            <a-button type="primary"
                      @click="$refs.editRef.handleCreate()">
                <template #icon>
                    <plus-outlined/>
                </template>
                新建
            </a-button>
            <template #extra>
                <x-search-bar :body-style="{padding: 0}">
                    <a-form layout="inline">
                        <a-row :gutter="12"
                               type="flex">
                            <a-col>
                                <a-form-item>
                                    <a-input></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col>
                                <a-button type="primary"
                                          ghost>搜索
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </x-search-bar>
            </template>
        </x-action-bar>
        <a-table :columns="columns"
                 :pagination="pagination"
                 :data-source="list">
            <template #bodyCell="{column, record}">
                <template v-if="column.key==='action'">
                    <x-action-button @click="$refs.editRef.handleEdit()">编辑</x-action-button>
                    <x-action-button>删除</x-action-button>
                    <x-action-button tag="span">
                        <a-dropdown :trigger="['click']">
                            <a>
                                更多
                                <down-outlined/>
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>123</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>

    <edit ref="editRef"></edit>
</template>

<script>
import XActionButton from '@/components/XActionButton'
import XActionBar from '@/components/XActionBar'
import Edit from './components/Edit'
import XSearchBar from '@/components/XSearchBar'
import {PlusOutlined, DownOutlined} from '@ant-design/icons-vue'
import {ref} from 'vue'

export default {
    name: 'tableList',
    components: {XSearchBar, XActionBar, XActionButton, Edit, PlusOutlined, DownOutlined},
    setup() {
        const columns = [
            {title: '序号', dataIndex: 'key'},
            {title: '规则名称', dataIndex: 'name'},
            {title: '操作', key: 'action', width: 240},
        ]
        const list = []
        const pagination = {
            pageSize: 20,
        }
        const editRef = ref()

        return {
            columns,
            pagination,
            list,
            editRef,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
