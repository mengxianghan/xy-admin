<template>
    <x-search-bar class="mb-8-2">
        <a-form layout="inline">
            <a-row :gutter="16">
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
                              ghost
                              @click="handleSearch">搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </x-search-bar>
    <a-card>
        <x-action-bar class="mb-8-2">
            <a-button type="primary"
                      @click="$refs.editRef.handleCreate()">
                <template #icon>
                    <icon-plus-outlined/>
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
                                          ghost
                                          @click="handleSearch">搜索
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </x-search-bar>
            </template>
        </x-action-bar>
        <a-table :columns="columns"
                 :pagination="pagination"
                 :data-source="list"
                 :loading="loading"
                 row-key="id"
                 @change="onTableChange">
            <template #bodyCell="{column, record, index}">
                <template v-if="'action' === column.key">
                    <x-action-button @click="$refs.editRef.handleEdit(record)">编辑</x-action-button>
                    <x-action-button>
                        <a-popconfirm title="确认删除？"
                                      @confirm="handleDelete(record)">
                            删除
                        </a-popconfirm>
                    </x-action-button>
                    <x-action-button tag="span">
                        <a-dropdown :trigger="['click']">
                            <a>
                                更多
                                <icon-down-outlined/>
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>菜单 1</a-menu-item>
                                    <a-menu-item>菜单 2</a-menu-item>
                                    <a-menu-item>菜单 3</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>

    <edit ref="editRef"
          @ok="onOk"/>
</template>

<script>
import {onMounted, ref} from 'vue'
import {message} from 'ant-design-vue'

import api from '@/api'

import Edit from './components/Edit'

import usePagination from '@/hooks/usePagination'

export default {
    name: 'listBasic',
    components: {Edit},
    setup() {
        const columns = [
            {title: 'ID', dataIndex: 'id', width: 64, align: 'center'},
            {title: '标题', dataIndex: 'title'},
            {title: '操作', key: 'action', width: 180},
        ]
        const {list, pagination, loading, resetPagination} = usePagination()
        const editRef = ref()

        /**
         * 获取分页列表
         */
        async function getPageList() {
            try {
                const {pageSize, current} = pagination
                loading.value = true
                const {code, data} = await api.common.getPageList({
                                                  pageSize,
                                                  page: current,
                                              })
                                              .catch(() => {
                                                  loading.value = false
                                              })
                loading.value = false
                if (200 === code) {
                    list.value = data.rows
                    pagination.total = data.total
                }
            } catch (err) {
                loading.value = false
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
        async function handleDelete({id}) {
            loading.value = true
            const {code} = await api.common.deleteData({
                                        id,
                                    })
                                    .catch(() => {
                                        loading.value = false
                                    })
            if (200 === code) {
                message.success('删除成功')
                await getPageList()
            } else {
                loading.value = false
            }
        }

        /**
         * 表格发生改变
         * @param current
         * @param pageSize
         */
        function onTableChange({current, pageSize}) {
            pagination.current = current
            pagination.pageSize = pageSize
            getPageList()
        }

        /**
         * 完成
         */
        function onOk() {
            getPageList()
        }

        onMounted(() => {
            getPageList()
        })

        return {
            editRef,
            columns,
            loading,
            list,
            pagination,
            handleSearch,
            handleDelete,
            onTableChange,
            onOk,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
