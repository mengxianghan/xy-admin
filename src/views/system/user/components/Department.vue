<template>
    <a-card
        :body-style="{ height: 'calc(100% - 56px - 47px)', padding: 0 }"
        :style="{
            position: 'sticky',
            top: appStore.mainOffsetTop,
            height: appStore.mainHeight,
        }">
        <template #title>
            <a-input-search placeholder="搜索部门"></a-input-search>
        </template>
        <x-scrollbar class="pa-8-2">
            <a-spin :spinning="loading">
                <a-tree
                    :field-names="{ key: 'id', children: 'children' }"
                    :selected-keys="selectedKeys"
                    :tree-data="listData"
                    block-node
                    @select="onSelect">
                    <template #title="{ title }">
                        <a-row align="middle">
                            <a-col flex="1">
                                {{ title }}
                            </a-col>
                            <a-col class="lh-1">
                                <a-dropdown
                                    :trigger="['click']"
                                    @click.stop>
                                    <a-button
                                        size="small"
                                        type="text">
                                        <template #icon>
                                            <more-outlined></more-outlined>
                                        </template>
                                    </a-button>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item @click="$refs.editDepartmentDialogRef.handleEdit()">
                                                添加子部门
                                            </a-menu-item>
                                            <a-menu-item @click="$refs.editDepartmentDialogRef.handleEdit()">
                                                编辑
                                            </a-menu-item>
                                            <a-menu-item @click="handleDelete">删除</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </a-col>
                        </a-row>
                    </template>
                </a-tree>
                <empty
                    v-if="!listData.length"
                    :image="Empty.PRESENTED_IMAGE_SIMPLE"></empty>
            </a-spin>
        </x-scrollbar>
        <template #actions>
            <span @click="$refs.editDepartmentDialogRef.handleCreate()">
                <plus-outlined></plus-outlined>
                新建部门
            </span>
        </template>
    </a-card>

    <edit-department-dialog
        ref="editDepartmentDialogRef"
        @ok="onOk"></edit-department-dialog>
</template>

<script setup>
import { useAppStore } from '@/store'
import { ref, watch } from 'vue'
import { usePagination } from '@/hooks'
import apis from '@/apis'
import { Empty, message, Modal } from 'ant-design-vue'
import { config } from '@/config'
import { find, get, head } from 'lodash-es'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons-vue'
import EditDepartmentDialog from './EditDepartmentDialog.vue'

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['change', 'update:value'])

const appStore = useAppStore()
const { listData, loading, showLoading, hideLoading } = usePagination()

const editDepartmentDialogRef = ref()
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
