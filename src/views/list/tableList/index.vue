<template>
    <a-card :bordered="false">
        <x-list-toolbar class="mb-8-2">
            <a-button type="primary"
                      @click="$refs.editRef.handleCreate()">
                <template #icon>
                    <plus-outlined/>
                </template>
                新建
            </a-button>
        </x-list-toolbar>
        <a-table :columns="columns"
                 :pagination="pagination"
                 :data-source="data"></a-table>
    </a-card>

    <edit ref="editRef"></edit>
</template>

<script>
import XListToolbar from '@/components/XListToolbar'
import {PlusOutlined} from '@ant-design/icons-vue'
import Edit from '@/views/list/tableList/components/Edit'
import {ref} from 'vue'

export default {
    name: 'baseList',
    components: {Edit, XListToolbar, PlusOutlined},
    setup() {
        const columns = [
            {title: '序号', dataIndex: 'key'},
            {title: '规则名称', dataIndex: 'name'}
        ]
        const data = [
            {
                key: '1',
                name: 'John Brown'
            },
            {
                key: '2',
                name: 'Jim Green'
            },
            {
                key: '3',
                name: 'Joe Black'
            }
        ]
        const pagination = {}
        const editRef = ref()

        return {
            columns,
            pagination,
            data,
            editRef
        }
    }
}
</script>

<style lang="less"
       scoped>

</style>
