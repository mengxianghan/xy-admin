<template>
    <a-card
        :body-style="{ height: 'calc(100% - 56px - 47px)', padding: 0 }"
        :style="{
            height: appStore.mainHeight,
        }">
        <template #title>
            <a-input-search
                allow-clear
                placeholder="搜索菜单"></a-input-search>
        </template>
        <x-scrollbar class="pa-8-2">
            <a-spin :spinning="loading">
                <a-tree
                    block-node
                    default-expand-all
                    :field-names="{ children: 'children', key: 'id' }"
                    :selected-keys="selectedKeys"
                    :tree-data="listData"
                    @select="onSelect">
                    <template #title="record">
                        <span class="ant-tree-title__name">
                            {{ record.title }}
                        </span>
                        <span class="ant-tree-title__actions">
                            <a-dropdown
                                :trigger="['click']"
                                @click.stop>
                                <x-action-button>
                                    <more-outlined></more-outlined>
                                </x-action-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>添加下级</a-menu-item>
                                        <a-menu-item>克隆</a-menu-item>
                                        <a-menu-item>编辑</a-menu-item>
                                        <a-menu-item @click="handleDelete(record)">删除</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </span>
                    </template>
                </a-tree>
                <a-empty
                    v-if="!listData.length"
                    :image="Empty.PRESENTED_IMAGE_SIMPLE"></a-empty>
            </a-spin>
        </x-scrollbar>
        <template #actions>
            <span>
                <plus-outlined></plus-outlined>
                新建菜单
            </span>
        </template>
    </a-card>
</template>

<script setup>
import { message, Modal, Empty } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import { useAppStore } from '@/store'
import { find, get, head } from 'lodash-es'

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
})
const emit = defineEmits(['change', 'update:value'])

const appStore = useAppStore()
const { listData, loading, showLoading, hideLoading } = usePagination()
const selectedKeys = ref([props.value])

watch(
    () => props.value,
    (val) => {
        if (val === selectedKeys.value?.[0]) return
        selectedKeys.value = [val]
    }
)

getList()

/**
 * 获取菜单列表
 */
async function getList() {
    try {
        showLoading()
        const { code, data } = await apis.common.getPageList().catch(() => {
            throw new Error()
        })
        hideLoading()
        if (config('http.code.success') === code) {
            const { records } = data
            listData.value = records
            if (listData.value.length) {
                selectedKeys.value = [get(head(listData.value), 'id')]
                trigger()
            }
        }
    } catch (error) {
        hideLoading()
    }
}

/**
 * 删除
 */
function handleDelete({ id }) {
    Modal.confirm({
        title: '删除提示',
        content: '确认删除？',
        okText: '确认',
        onOk: () => {
            return new Promise((resolve, reject) => {
                ;(async () => {
                    try {
                        const { code } = await apis.common.del(id).catch(() => {
                            throw new Error()
                        })
                        if (config('http.code.success') === code) {
                            resolve()
                            message.success('删除成功')
                            await getList()
                        }
                    } catch (error) {
                        reject()
                    }
                })()
            })
        },
    })
}

function onSelect(keys) {
    if (!keys.length) {
        return
    }
    selectedKeys.value = keys
    trigger()
}

function trigger() {
    const value = head(selectedKeys.value)
    const record = find(listData.value, { id: value })
    emit('update:value', value)
    emit('change', record)
}
</script>

<style lang="less" scoped></style>
