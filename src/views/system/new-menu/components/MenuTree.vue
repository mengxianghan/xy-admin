<template>
    <a-card
        v-loading="loading"
        type="flex">
        <template #title>
            <a-input-search
                v-model:value="keyword"
                allow-clear
                placeholder="请输入关键词搜索"></a-input-search>
        </template>
        <template #actions>
            <div>
                <plus-outlined></plus-outlined>
                新建菜单
            </div>
        </template>
        <a-tree
            v-if="!loading"
            :field-names="{ title: 'name', children: 'children', key: 'key' }"
            :selected-keys="selectedKeys"
            :tree-data="listData"
            block-node
            default-expand-all
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
                    <a-space
                        class="tree-row__actions"
                        @click.stop="() => {}">
                        <plus-outlined></plus-outlined>
                        <delete-outlined @click="handleDelete(record)"></delete-outlined>
                    </a-space>
                </div>
            </template>
        </a-tree>
    </a-card>
</template>

<script setup>
import { message, Modal } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import usePagination from '@/hooks/usePagination'

defineOptions({
    name: 'MenuTree',
})

const emit = defineEmits(['select', 'ready'])

const { listData, loading } = usePagination()
const selectedKeys = ref([])
const keyword = ref('')

onMounted(() => {
    getMenuList()
})

/**
 * 获取菜单列表
 */
async function getMenuList() {
    loading.value = true
    const { code, data } = await apis.system.getNewMenuList().catch(() => {
        loading.value = false
    })
    loading.value = false
    if (config('http.code.success') === code) {
        const { rows } = data
        listData.value = rows
        emit('ready', rows)
    }
}

/**
 * 选择菜单
 * @param keys
 * @param node
 */
function handleSelect(keys, { node }) {
    if (!keys.length) {
        return
    }
    selectedKeys.value = keys
    emit('select', node)
}

/**
 * 删除
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
</script>

<style lang="less" scoped>
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
        margin: 0 0 0 12px;
        display: none;
    }
}
</style>
