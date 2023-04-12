<template>
    <a-card
        :bordered="false"
        type="flex">
        <template #title>
            <a-input-search
                v-model:value="searchValue"
                allow-clear
                placeholder="请输入关键词搜索"></a-input-search>
        </template>
        <template #actions>
            <span @click="$refs.dictTypeEditDialogRef.handleCreate()">
                <icon-plus-outlined />
                新建分类
            </span>
        </template>
        <a-tree
            v-if="!loading"
            :selected-keys="selectedKeys"
            :tree-data="list"
            :field-names="{ title: 'name', children: 'children', key: 'key' }"
            default-expand-all
            block-node
            @select="handleSelect">
            <template #title="record">
                <div class="tree-row">
                    <div class="tree-row__name">
                        <span v-if="record.name.indexOf(searchValue) > -1">
                            {{ record.name.substr(0, record.name.indexOf(searchValue)) }}
                            <span class="color-error">{{ searchValue }}</span>
                            {{ record.name.substr(record.name.indexOf(searchValue) + searchValue.length) }}
                        </span>
                        <span v-else>{{ record.name }}</span>
                    </div>
                    <div class="tree-row__code">{{ record.code }}</div>
                    <a-space
                        class="tree-row__actions"
                        @click.stop="() => {}">
                        <icon-edit-outlined
                            @click.stop="$refs.dictTypeEditDialogRef.handleEdit(record)"></icon-edit-outlined>
                        <icon-delete-outlined @click="handleDelete(record)"></icon-delete-outlined>
                    </a-space>
                </div>
            </template>
        </a-tree>
    </a-card>

    <dict-type-edit-dialog ref="dictTypeEditDialogRef" />
</template>

<script>
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { CODE_SUCCESS } from '@/config/http'
import api from '@/api'
import usePagination from '@/hooks/usePagination'
import DictTypeEditDialog from './DictTypeEditDialog.vue'

export default {
    name: 'DictTypeTree',
    components: { DictTypeEditDialog },
    emits: ['select'],
    setup(props, { emit }) {
        const { loading, list } = usePagination()
        const selectedKeys = ref([])
        const searchValue = ref('')
        const dictTypeEditDialogRef = ref()

        onMounted(() => {
            getDictTypeList()
        })

        /**
         * 获取字典分类列表
         * @return {Promise<void>}
         */
        async function getDictTypeList() {
            loading.value = true
            const { code, data } = await api.system.getDictTypeList().catch(() => {
                loading.value = false
            })
            loading.value = false
            if (CODE_SUCCESS === code) {
                const { rows } = data
                list.value = rows
            }
        }

        /**
         * 切换分类
         * @param keys
         */
        function handleSelect(keys, { node }) {
            if (!keys.length) {
                return
            }
            selectedKeys.value = keys
            trigger(node)
        }

        /**
         * 删除分类
         */
        function handleDelete() {
            Modal.confirm({
                title: '删除提示',
                content: '确认删除？',
                onOk: async () => {
                    message.info('点击了删除')
                },
            })
        }

        /**
         * 触发
         * @param value
         */
        function trigger(value) {
            emit('select', value)
        }

        return {
            searchValue,
            dictTypeEditDialogRef,
            selectedKeys,
            list,
            loading,
            handleSelect,
            handleDelete,
        }
    },
}
</script>

<style lang="less" scoped>
.tree-row {
    display: flex;
    align-items: center;

    &:hover {
        .tree-row {
            &__actions {
                display: flex;
            }

            &__code {
                display: none;
            }
        }
    }

    &__name {
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &,
        > * {
            display: flex;
        }
    }

    &__code {
        font-size: 12px;
        color: @text-color-secondary;
    }

    &__actions {
        margin: 0 0 0 @margin-sm;
        display: none;
    }
}
</style>
