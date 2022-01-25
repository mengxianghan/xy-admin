<template>
    <a-card>
        <x-action-bar class="mb-8-2">
            <a-button type="primary">
                <template #icon>
                    <icon-plus-outlined/>
                </template>
                新建角色
            </a-button>
        </x-action-bar>

        <a-table :columns="columns"
                 :data-source="list"
                 :loading="loading"
                 :pagination="false"
                 :expand-icon-column-index="1">
            <template #bodyCell="{column, record, index}">
                <template v-if="'action' === column.key">
                    <x-action-button>查看</x-action-button>
                    <x-action-button>编辑</x-action-button>
                    <x-action-button>
                        <a-popconfirm title="确认删除？">
                            删除
                        </a-popconfirm>
                    </x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>
</template>

<script>
import {onMounted, ref} from 'vue'

import usePagination from '@/hooks/usePagination'
import {systemApi} from '@/api'

export default {
    name: 'systemRole',
    setup() {
        const columns = ref([
            {title: '#', key: 'no', width: 60},
            {title: '角色名称', dataIndex: 'title'},
            {title: '别名', dataIndex: 'alias'},
            {title: '排序', dataIndex: 'sort', width: 120, align: 'right'},
            {title: '操作', key: 'action', width: 160},
        ])
        const {list, loading} = usePagination()

        onMounted(() => {
            getUserRoleList()
        })

        /**
         * 获取用户角色列表
         * @return {Promise<void>}
         */
        async function getUserRoleList() {
            try {
                loading.value = true
                const {code, data} = await systemApi.getUserRoleList().catch(() => {
                    throw new Error()
                })
                loading.value = false
                if ('200' === code) {
                    const {rows} = data
                    list.value = rows
                }
            } catch (err) {
                loading.value = false
            }
        }

        return {
            columns,
            list,
            loading,
        }
    },
}
</script>

<style scoped>

</style>
