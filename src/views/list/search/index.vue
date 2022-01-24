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
        <a-table :columns="columns"
                 :pagination="pagination"
                 :data-source="list"
                 :loading="loading"
                 row-key="id"
                 @change="onTableChange">
        </a-table>
    </a-card>
</template>

<script>
import {onMounted, ref} from 'vue'
import {message} from 'ant-design-vue'

import usePagination from '@/hooks/usePagination'
import * as dataApi from '@/api/modules/data'

export default {
    name: 'listSearch',
    setup(ctx) {
        const columns = [
            {title: '序号', key: 'no', width: 64, align: 'center'},
            {title: '标题', dataIndex: 'title'},
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
                const {code, data} = await dataApi.getPageList({
                    pageSize,
                    page: current,
                }).catch(() => {
                    loading.value = false
                })
                loading.value = false
                if ('200' === code) {
                    list.value = data.list
                    pagination.value.total = data.total
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
         * 表格发生改变
         * @param current
         * @param pageSize
         */
        function onTableChange({current, pageSize}) {
            pagination.value.current = current
            pagination.value.pageSize = pageSize
            getPageList()
        }

        /**
         * 删除确认
         */
        function onDeleteConfirm() {
            message.success('删除成功')
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
            onTableChange,
            onDeleteConfirm,
        }
    },
}
</script>

<style lang="less"
       scoped>

</style>
