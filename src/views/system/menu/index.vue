<template>
    <a-card :bordered="false">
        <x-action-bar class="mb-8-2">
            <a-button
                type="primary"
                @click="$refs.editDialogRef.handleCreate()">
                <template #icon>
                    <icon-plus-outlined />
                </template>
                新建菜单
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
                <template v-if="'type' === column.key">
                    <!--菜单-->
                    <a-tag
                        v-if="menuTypeEnum.is('menu', record.type)"
                        color="processing"
                        >{{ menuTypeEnum.getDesc(record.type) }}
                    </a-tag>
                    <!--按钮-->
                    <a-tag
                        v-if="menuTypeEnum.is('button', record.type)"
                        color="success"
                        >{{ menuTypeEnum.getDesc(record.type) }}
                    </a-tag>
                </template>
                <template v-if="'action' === column.key">
                    <x-action-button @click="$refs.editDialogRef.handleEdit(record)">新建下级</x-action-button>
                    <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                    <x-action-button tag="span">
                        <a-dropdown :trigger="['click']">
                            <a>
                                更多
                                <icon-down-outlined />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="handleDelete(record)">删除</a-menu-item>
                                    <a-menu-item>克隆</a-menu-item>
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

<script>
import { onMounted, ref } from 'vue'
import { menuTypeEnum } from '@/enums/system'
import { message, Modal } from 'ant-design-vue'
import api from '@/api'
import usePagination from '@/hooks/usePagination'
import EditDialog from './components/EditDialog.vue'

export default {
    name: 'systemMenu',
    components: {
        EditDialog,
    },
    setup() {
        const columns = ref([
            { title: '#', key: 'no', width: 60, align: 'center' },
            { title: '名称', dataIndex: 'name' },
            { title: '类型', dataIndex: 'type', key: 'type', width: 120 },
            { title: '排序', dataIndex: 'sort', width: 80 },
            { title: '操作', key: 'action', width: 240 },
        ])
        const { list, loading } = usePagination()
        const editDialogRef = ref()

        onMounted(() => {
            getMenuList()
        })

        /**
         * 获取菜单列表
         * @return {Promise<void>}
         */
        async function getMenuList() {
            loading.value = true
            const { code, data } = await api.system.getMenuList().catch(() => {
                loading.value = false
            })
            loading.value = false
            if (200 === code) {
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
                    const { code } = await api.common.deleteData({ id }).catch(() => {
                        loading.value = false
                    })
                    if (200 === code) {
                        message.success('删除成功')
                        await getMenuList()
                    } else {
                        loading.value = false
                    }
                },
            })
        }

        return {
            menuTypeEnum,
            list,
            loading,
            columns,
            editDialogRef,
            handleDelete,
        }
    },
}
</script>

<style lang="less" scoped></style>
