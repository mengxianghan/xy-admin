<template>
    <a-card>
        <x-action-bar class="mb-8-2">
            <a-button
                type="primary"
                @click="$refs.editDialogRef.handleCreate()">
                <template #icon>
                    <icon-plus-outlined />
                </template>
                新建角色
            </a-button>
        </x-action-bar>

        <a-table
            :columns="columns"
            :data-source="list"
            :loading="loading"
            :pagination="false"
            :expand-icon-column-index="1">
            <template #bodyCell="{ column, record, index }">
                <template v-if="'no' === column.key">
                    {{ index + 1 }}
                </template>
                <template v-if="'action' === column.key">
                    <x-action-button @click="$refs.editDialogRef.handlePreview(record)">查看</x-action-button>
                    <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                    <x-action-button @click="handleDelete(record)">删除</x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>

    <edit-dialog ref="editDialogRef" />
</template>

<script setup>
import { Modal, message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

import apis from '@/apis'
import { CODE_SUCCESS } from '@/config/http'
import usePagination from '@/hooks/usePagination'

import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'systemRole',
})

const columns = ref([
    { title: '#', key: 'no', width: 60, align: 'center' },
    { title: '名称', dataIndex: 'name' },
    { title: '别名', dataIndex: 'alias' },
    { title: '排序', dataIndex: 'sort', width: 80 },
    { title: '操作', key: 'action', width: 160 },
])
const { list, loading } = usePagination()
const editDialogRef = ref()

onMounted(() => {
    getPageList()
})

/**
 * 获取用户角色列表
 * @return {Promise<void>}
 */
async function getPageList() {
    loading.value = true
    const { code, data } = await apis.system.getUserRoleList().catch(() => {
        loading.value = false
    })
    loading.value = false
    if (CODE_SUCCESS === code) {
        const { rows } = data
        list.value = rows
    }
}

/**
 * 删除
 * @param id
 */
function handleDelete({ id }) {
    Modal.confirm({
        title: '删除提示',
        content: '确认删除？',
        onOk: async () => {
            loading.value = true
            const { code } = await apis.common.deleteData({ id }).catch(() => {
                loading.value = false
            })
            if (CODE_SUCCESS === code) {
                message.success('删除成功')
                await getPageList()
            } else {
                loading.value = false
            }
        },
    })
}
</script>

<style lang="less" scoped></style>
