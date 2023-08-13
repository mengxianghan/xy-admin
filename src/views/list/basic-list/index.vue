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
            :data-source="list"
            :pagination="paginationState"
            :loading="loading">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a @click="$refs.editDialogRef.handleEdit()">编辑</a>
                        <a-dropdown>
                            <a>
                                <span class="mr-4-1">更多</span>
                                <down-outlined></down-outlined>
                            </a>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="$refs.editDialogRef.handleEdit()">编辑</a-menu-item>
                                    <a-menu-item @click="handleDelete">删除</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                    <a-list-item-meta
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                        <template #title>
                            <a href="https://www.antdv.com/">{{ item.title }}</a>
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
                            <div>付小小</div>
                        </a-col>
                        <a-col>
                            <div>开始时间</div>
                            <div>2023-04-07 10:42</div>
                        </a-col>
                        <a-col>
                            <a-progress
                                :style="{ width: '180px' }"
                                :percent="30" />
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
import { onMounted, ref } from 'vue'

import { DownOutlined } from '@ant-design/icons-vue'

import apis from '@/apis'
import { config } from '@/config'
import usePagination from '@/hooks/usePagination'

import EditDialog from './components/EditDialog.vue'

defineOptions({
    name: 'listBasicList',
})

const { list, paginationState, loading, resetPagination, searchFormData } = usePagination()
const editDialogRef = ref()

paginationState.onChange = (page, pageSize) => {
    paginationState.current = page
    paginationState.pageSize = pageSize
    getPageList()
}

searchFormData.value = {
    status: 0,
}

onMounted(() => {
    getPageList()
})

/**
 * 获取分页列表
 */
async function getPageList() {
    const { pageSize, current } = paginationState
    loading.value = true
    const { code, data } = await apis.common
        .getPageList({
            pageSize,
            page: current,
        })
        .catch(() => {
            loading.value = false
        })
    loading.value = false
    if (config('http.code.success') === code) {
        list.value = data.rows
        paginationState.total = data.total
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
        title: '删除任务',
        content: '确定删除该任务吗？',
        onOk: async () => {
            loading.value = true
            const { code } = await apis.common.deleteData({ id }).catch(() => {
                loading.value = false
            })
            if (config('http.code.success') === code) {
                message.success('删除成功')
                await getPageList()
            } else {
                loading.value = false
            }
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
