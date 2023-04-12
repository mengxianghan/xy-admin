<template>
    <a-card
        class="mb-8-2"
        :bordered="false">
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
    <a-card
        title="基本列表"
        :bordered="false">
        <template #extra>
            <a-space>
                <a-radio-group
                    v-model:value="searchForm.status"
                    @change="handleSearch">
                    <a-radio-button :value="0">全部</a-radio-button>
                    <a-radio-button :value="1">进行中</a-radio-button>
                    <a-radio-button :value="2">等待中</a-radio-button>
                </a-radio-group>
                <a-input-search
                    v-model:value="searchForm.keyword"
                    placeholder="请输入"
                    @search="handleSearch"></a-input-search>
            </a-space>
        </template>
        <a-list
            item-layout="horizontal"
            :data-source="list"
            :pagination="pagination"
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

<script>
import { onMounted, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { CODE_SUCCESS } from '@/config/http'
import api from '@/api'
import EditDialog from './components/EditDialog.vue'
import usePagination from '@/hooks/usePagination'

export default {
    name: 'listBasicList',
    components: {
        EditDialog,
        DownOutlined,
    },
    setup() {
        const { list, pagination, loading, resetPagination, searchForm } = usePagination()
        const editDialogRef = ref()

        pagination.onChange = (page, pageSize) => {
            pagination.current = page
            pagination.pageSize = pageSize
            getPageList()
        }

        searchForm.value = {
            status: 0,
        }

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
                title: '删除任务',
                content: '确定删除该任务吗？',
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
         * 完成
         */
        function onOk() {
            getPageList()
        }

        return {
            pagination,
            searchForm,
            list,
            loading,
            editDialogRef,
            handleSearch,
            handleDelete,
            onOk,
        }
    },
}
</script>

<style lang="less" scoped></style>
