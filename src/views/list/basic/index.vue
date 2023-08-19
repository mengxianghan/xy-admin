<template>
    <a-card class="mb-8-2">
        <a-row class="align-center">
            <a-col
                :xs="24"
                :sm="8">
                <a-statistic
                    title="我的待办"
                    value="8个任务" />
            </a-col>
            <a-col
                :xs="24"
                :sm="8">
                <a-statistic
                    title="本周任务平均处理时间"
                    value="32分钟" />
            </a-col>
            <a-col
                :xs="24"
                :sm="8">
                <a-statistic
                    title="本周完成任务数"
                    value="24个任务" />
            </a-col>
        </a-row>
    </a-card>
    <a-card title="基本列表">
        <template #extra>
            <a-space>
                <a-radio-group
                    v-model:value="searchFormData.status"
                    @change="handleSearch">
                    <a-radio-button :value="0">全部</a-radio-button>
                    <a-radio-button :value="1">进行中</a-radio-button>
                    <a-radio-button :value="2">等待中</a-radio-button>
                </a-radio-group>
                <a-input-search
                    v-model:value="searchFormData.keyword"
                    placeholder="请输入"
                    @search="handleSearch"></a-input-search>
            </a-space>
        </template>
        <a-list
            item-layout="horizontal"
            :data-source="listData"
            :pagination="paginationState"
            :loading="loading">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <x-action-button
                            :divider="false"
                            @click="$refs.editDialogRef.handleEdit()">
                            编辑
                        </x-action-button>
                        <x-action-button :divider="false">
                            <a-dropdown>
                                <more-outlined></more-outlined>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item @click="handleDelete">删除</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </x-action-button>
                    </template>
                    <a-list-item-meta :description="item.sentence">
                        <template #title>
                            {{ item.title }}
                        </template>
                        <template #avatar>
                            <a-avatar
                                shape="square"
                                :src="item.avatar"
                                :size="48" />
                        </template>
                    </a-list-item-meta>
                    <a-row
                        class="color-secondary align-right"
                        align="middle"
                        :gutter="40">
                        <a-col>
                            <div>Owner</div>
                            <div>{{ item.name }}</div>
                        </a-col>
                        <a-col>
                            <div>开始时间</div>
                            <div>{{ dayjs(item.datetime).format('MM-DD HH:mm') }}</div>
                        </a-col>
                        <a-col>
                            <a-progress
                                :style="{ width: '180px' }"
                                :percent="item.percent" />
                        </a-col>
                    </a-row>
                </a-list-item>
            </template>
        </a-list>
    </a-card>

    <edit-dialog
        ref="editDialogRef"
        @ok="onOk" />
</template>

<script setup>
import { Modal, message } from 'ant-design-vue'
import { ref } from 'vue'
import { MoreOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { config } from '@/config'
import apis from '@/apis'
import { usePagination } from '@/hooks'
import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'listBasic',
})

const { listData, paginationState, loading, showLoading, hideLoading, resetPagination, searchFormData } =
    usePagination()
const editDialogRef = ref()

paginationState.onChange = (page, pageSize) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    getPageList()
}

searchFormData.value = {
    status: 0,
}

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
 * 完成
 */
function onOk() {
    getPageList()
}
</script>

<style lang="less" scoped></style>
