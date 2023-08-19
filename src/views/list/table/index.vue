<template>
    <x-search-bar class="mb-8-2">
        <template #default="{ gutter, colSpan }">
            <a-form
                :label-col="{ style: { width: '100px' } }"
                :model="searchFormData"
                layout="inline">
                <a-row :gutter="gutter">
                    <a-col v-bind="colSpan">
                        <a-form-item name="title">
                            <template #label>
                                规则名称
                                <a-tooltip title="规则名称是唯一的 key">
                                    <question-circle-outlined class="ml-4-1 color-placeholder" />
                                </a-tooltip>
                            </template>
                            <a-input v-model:value="searchFormData.title"></a-input>
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
                                ghost
                                type="primary"
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
    <a-card>
        <x-action-bar class="mb-8-2">
            <a-button
                type="primary"
                @click="$refs.editDialogRef.handleCreate()">
                <template #icon>
                    <plus-outlined></plus-outlined>
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
            :data-source="listData"
            :loading="loading"
            :pagination="paginationState"
            :size="size"
            row-key="id"
            @change="onTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="'action' === column.key">
                    <x-action-button @click="$refs.editDialogRef.handleEdit(record)">编辑</x-action-button>
                    <x-action-button @click="handleDelete(record)">删除</x-action-button>
                    <x-action-button>
                        <a-dropdown :trigger="['click']">
                            <more-outlined></more-outlined>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>菜单1</a-menu-item>
                                    <a-menu-item>菜单2</a-menu-item>
                                    <a-menu-item>菜单3</a-menu-item>
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
import { message, Modal } from 'ant-design-vue'
import { ref } from 'vue'
import {
    ColumnHeightOutlined,
    DownOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    SettingOutlined,
    UpOutlined,
    PlusOutlined,
    MoreOutlined,
} from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'
import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'listTable',
})

const columns = [
    { title: '规则名称', dataIndex: 'title' },
    { title: '描述', dataIndex: 'sentence' },
    { title: '状态', dataIndex: 'status' },
    { title: '操作', key: 'action', width: 160 },
]
const { listData, paginationState, loading, showLoading, hideLoading, resetPagination, searchFormData } =
    usePagination()
const editDialogRef = ref()
const searchBarExpand = ref(false)
const size = ref('default')

getPageList()

/**
 * 获取分页列表
 */
async function getPageList() {
    try {
        showLoading()
        const { pageSize, current } = paginationState
        const { code, data } = await apis.common
            .getPageList({
                pageSize,
                page: current,
            })
            .catch(() => {
                throw new Error()
            })
        hideLoading()
        if (config('http.code.success') === code) {
            const { records, pagination } = data
            listData.value = records
            paginationState.total = pagination.total
        }
    } catch (error) {
        hideLoading()
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
                            await getPageList()
                        }
                    } catch (error) {
                        reject()
                    }
                })()
            })
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
    paginationState.current = current
    paginationState.pageSize = pageSize
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
