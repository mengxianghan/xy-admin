<template>
    <x-search-bar class="mb-8-2">
        <template #default="{ gutter, colSpan }">
            <a-form
                :model="searchForm"
                layout="inline"
                :label-col="{ style: { width: '100px' } }">
                <a-row :gutter="gutter">
                    <a-col v-bind="colSpan">
                        <a-form-item name="title">
                            <template #label>
                                规则名称
                                <a-tooltip title="规则名称是唯一的 key">
                                    <question-circle-outlined class="ml-4-1 color-placeholder" />
                                </a-tooltip>
                            </template>
                            <a-input v-model:value="searchForm.title"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col v-bind="colSpan">
                        <a-form-item label="描述">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <template v-if="searchBarExpand">
                        <a-col v-bind="colSpan">
                            <a-form-item label="服务调用次数">
                                <a-input></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-bind="colSpan">
                            <a-form-item label="状态">
                                <a-select></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col v-bind="colSpan">
                            <a-form-item label="上次调度时间">
                                <a-date-picker placeholder=""></a-date-picker>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col
                        class="align-right"
                        v-bind="colSpan">
                        <a-space>
                            <a-button>重置</a-button>
                            <a-button
                                type="primary"
                                ghost
                                @click="handleSearch">
                                搜索
                            </a-button>
                            <a @click="() => (searchBarExpand = !searchBarExpand)">
                                展开
                                <template v-if="searchBarExpand">
                                    <up-outlined :style="{ fontSize: '12px' }"></up-outlined>
                                </template>
                                <template v-else>
                                    <down-outlined :style="{ fontSize: '12px' }"></down-outlined>
                                </template>
                            </a>
                        </a-space>
                    </a-col>
                </a-row>
            </a-form>
        </template>
    </x-search-bar>
    <a-card :bordered="false">
        <x-action-bar class="mb-8-2">
            <a-button
                type="primary"
                @click="$refs.editDialogRef.handleCreate()">
                <template #icon>
                    <icon-plus-outlined />
                </template>
                新建
            </a-button>
            <template #extra>
                <a-space>
                    <a-tooltip title="刷新">
                        <a-button
                            type="text"
                            @click="handleSearch">
                            <template #icon>
                                <reload-outlined></reload-outlined>
                            </template>
                        </a-button>
                    </a-tooltip>
                    <a-dropdown>
                        <a-tooltip title="密度">
                            <a-button type="text">
                                <template #icon>
                                    <column-height-outlined></column-height-outlined>
                                </template>
                            </a-button>
                        </a-tooltip>
                        <template #overlay>
                            <a-menu
                                :selectedKeys="[size]"
                                @click="handleSize">
                                <a-menu-item key="default">默认</a-menu-item>
                                <a-menu-item key="middle">中等</a-menu-item>
                                <a-menu-item key="small">紧凑</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-tooltip title="设置">
                        <a-button type="text">
                            <template #icon>
                                <setting-outlined></setting-outlined>
                            </template>
                        </a-button>
                    </a-tooltip>
                </a-space>
            </template>
        </x-action-bar>
        <a-table
            :columns="columns"
            :pagination="pagination"
            :data-source="list"
            :loading="loading"
            :size="size"
            row-key="id"
            @change="onTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="'action' === column.key">
                    <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                    <x-action-button @click="handleDelete(record)">删除</x-action-button>
                    <x-action-button tag="span">
                        <a-dropdown :trigger="['click']">
                            <a>
                                更多
                                <icon-down-outlined />
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>菜单 1</a-menu-item>
                                    <a-menu-item>菜单 2</a-menu-item>
                                    <a-menu-item>菜单 3</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </x-action-button>
                </template>
            </template>
        </a-table>
    </a-card>

    <edit-dialog
        ref="editDialogRef"
        @ok="onOk" />
</template>

<script setup>
import { Modal, message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

import {
    ColumnHeightOutlined,
    DownOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    SettingOutlined,
    UpOutlined,
} from '@ant-design/icons-vue'

import api from '@/api'
import { CODE_SUCCESS } from '@/config/http'
import usePagination from '@/hooks/usePagination'

import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'listTableList',
})

const columns = [
    { title: '规则名称', dataIndex: 'title' },
    { title: '描述', dataIndex: 'desc' },
    { title: '状态', dataIndex: 'status' },
    { title: '操作', key: 'action', width: 180 },
]
const { list, pagination, loading, resetPagination, searchForm } = usePagination()
const editDialogRef = ref()
const searchBarExpand = ref(false)
const size = ref('default')

onMounted(() => {
    getPageList()
})

/**
 * 获取分页列表
 */
async function getPageList() {
    const { pageSize, current } = pagination
    loading.value = true
    const { code, data } = await api.common
        .getPageList({
            pageSize,
            page: current,
        })
        .catch(() => {
            loading.value = false
        })
    loading.value = false
    if (CODE_SUCCESS === code) {
        list.value = data.rows
        pagination.total = data.total
    }
}

/**
 * 搜索
 */
function handleSearch() {
    resetPagination()
    getPageList()
}

/**
 * 删除
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
            if (CODE_SUCCESS === code) {
                message.success('删除成功')
                await getPageList()
            } else {
                loading.value = false
            }
        },
    })
}

/**
 * 密度
 * @param {string} key
 */
function handleSize({ key }) {
    size.value = key
}

/**
 * 表格发生改变
 * @param current
 * @param pageSize
 */
function onTableChange({ current, pageSize }) {
    pagination.current = current
    pagination.pageSize = pageSize
    getPageList()
}

/**
 * 完成
 */
function onOk() {
    getPageList()
}
</script>

<style lang="less" scoped></style>
