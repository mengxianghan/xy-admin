<template>
    <a-card type="flex">
        <template #title>
            <a-input-search v-model:value="keyword"
                            allow-clear
                            placeholder="请输入关键词搜索"></a-input-search>
        </template>
        <template #actions>
            <div>
                <icon-plus-outlined/>
                新建菜单
            </div>
        </template>
        <a-spin :spinning="loading">
            <a-tree v-if="!loading"
                    :selected-keys="selectedKeys"
                    :tree-data="list"
                    :field-names="{title: 'name', children: 'children', key: 'key'}"
                    default-expand-all
                    block-node
                    @select="handleSelect">
                <template #title="record">
                    <div class="tree-row">
                        <div class="tree-row__name">
                            <span v-if="record.name.indexOf(keyword) > -1">
                              {{ record.name.substr(0, record.name.indexOf(keyword)) }}
                              <span class="color-error">{{ keyword }}</span>
                              {{ record.name.substr(record.name.indexOf(keyword) + keyword.length) }}
                            </span>
                            <span v-else>{{ record.name }}</span>
                        </div>
                        <a-space class="tree-row__actions"
                                 @click.stop="()=>{}">
                            <icon-plus-outlined></icon-plus-outlined>
                            <a-popconfirm title="确认删除？"
                                          @confirm="handleDelete(record)">
                                <icon-delete-outlined></icon-delete-outlined>
                            </a-popconfirm>
                        </a-space>
                    </div>
                </template>
            </a-tree>
        </a-spin>
    </a-card>
</template>

<script>
import {onMounted, ref} from 'vue'
import {message} from 'ant-design-vue'

import api from '@/api'
import usePagination from '@/hooks/usePagination'

export default {
    name: 'MenuTree',
    emits: ['select', 'ready'],
    setup(props, {emit}) {
        const {list, loading} = usePagination()
        const selectedKeys = ref([])
        const keyword = ref('')

        onMounted(() => {
            getMenuList()
        })

        /**
         * 获取菜单列表
         */
        async function getMenuList() {
            try {
                loading.value = true
                const {code, data} = await api.system.getMenuList().catch(() => {
                    throw new Error()
                })
                loading.value = false
                if (200 === code) {
                    const {rows} = data
                    list.value = rows
                    emit('ready', rows)
                }
            } catch (err) {
                loading.value = false
            }
        }

        /**
         * 选择菜单
         * @param keys
         */
        function handleSelect(keys, {node}) {
            if (!keys.length) {
                return
            }
            selectedKeys.value = keys
            emit('select', node)
        }

        /**
         * 删除菜单
         */
        function handleDelete() {
            try {
                message.info('点击了删除')
            } catch (err) {
                message.warning(err.message)
            }
        }


        return {
            list,
            loading,
            selectedKeys,
            keyword,
            handleSelect,
            handleDelete,
        }
    },
}
</script>

<style lang="less"
       scoped>
.tree-row {
    display: flex;
    align-items: center;

    &:hover {
        .tree-row__actions {
            display: flex;
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

    &__actions {
        margin: 0 0 0 @margin-sm;
        display: none;
    }
}
</style>
