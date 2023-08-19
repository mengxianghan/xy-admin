<template>
    <a-card
        :body-style="{ height: 'calc(100% - 56px - 47px)', padding: 0 }"
        :style="{
            position: 'sticky',
            top: appStore.mainOffsetTop,
            height: appStore.mainHeight,
        }">
        <template #title>
            <a-input-search placeholder="搜索字典"></a-input-search>
        </template>
        <x-scrollbar class="pa-8-2">
            <a-spin :spinning="loading">
                <a-tree
                    block-node
                    :selected-keys="selectedKeys"
                    :tree-data="listData"
                    :field-names="{ key: 'id', children: 'children' }"
                    @select="onSelect">
                    <template #title="{ title }">
                        <span class="ant-tree-title__name">{{ title }}</span>
                        <span class="ant-tree-title__actions">
                            <a-dropdown
                                :trigger="['click']"
                                @click.stop>
                                <x-action-button>
                                    <more-outlined></more-outlined>
                                </x-action-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item @click="$refs.editDictDialogRef.handleEdit()"> 编辑 </a-menu-item>
                                        <a-menu-item @click="handleDelete">删除</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </span>
                    </template>
                </a-tree>
                <empty
                    v-if="!listData.length"
                    :image="Empty.PRESENTED_IMAGE_SIMPLE"></empty>
            </a-spin>
        </x-scrollbar>
        <template #actions>
            <span @click="$refs.editDictDialogRef.handleCreate()">
                <plus-outlined></plus-outlined>
                新建字典
            </span>
        </template>
    </a-card>

    <edit-dict-dialog
        ref="editDictDialogRef"
        @ok="onOk"></edit-dict-dialog>
</template>

<script setup>
import { useAppStore } from '@/store'
import { ref, watch } from 'vue'
import { usePagination } from '@/hooks'
import apis from '@/apis'
import { Empty, Modal, message } from 'ant-design-vue'
import { config } from '@/config'
import { head, get, find } from 'lodash-es'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons-vue'
import EditDictDialog from './EditDictDialog.vue'

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['change', 'update:value'])

const appStore = useAppStore()
const { listData, loading, showLoading, hideLoading } = usePagination()

const editDictDialogRef = ref()
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
 * 获取列表
 * @returns {Promise<void>}
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
    if (!keys.length) return
    selectedKeys.value = keys
    trigger()
}

async function onOk() {
    await getList()
}

function trigger() {
    const value = head(selectedKeys.value)
    const record = find(listData.value, { id: value })
    emit('update:value', value)
    emit('change', record)
}
</script>

<style lang="less" scoped></style>
