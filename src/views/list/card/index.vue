<template>
    <a-page-header
        main
        title="卡片列表"
        :ghost="false">
        <a-row
            type="flex"
            align="middle">
            <a-col
                flex="1"
                :gutter="88">
                <div>
                    段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                    提供跨越设计与开发的体验解决方案。
                </div>
                <a-space
                    class="mt-8-1"
                    :size="24">
                    <a>
                        <link-outlined></link-outlined>
                        Quick Start
                    </a>
                    <a>
                        <link-outlined></link-outlined>
                        Product Info
                    </a>
                    <a>
                        <link-outlined></link-outlined>
                        Product Doc
                    </a>
                </a-space>
            </a-col>
            <a-col flex="0 0 242px">
                <img
                    alt=""
                    src="http://cdn.xuanyunet.com/images/img_1.png"
                    width="155"
                    :style="{ margin: '-20px 0 0' }" />
            </a-col>
        </a-row>
    </a-page-header>
    <a-list
        :data-source="listData"
        :grid="{ gutter: 16, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }"
        :loading="loading">
        <template #renderItem="{ item }">
            <template v-if="!item.id">
                <a-list-item>
                    <a-card :body-style="{ padding: 0 }">
                        <a-button
                            type="dashed"
                            class="create-btn">
                            <plus-outlined></plus-outlined>
                            新增
                        </a-button>
                    </a-card>
                </a-list-item>
            </template>
            <template v-else>
                <a-list-item>
                    <a-card>
                        <a-card-meta :title="item.title">
                            <template #avatar>
                                <a-avatar :src="item.avatar" />
                            </template>
                            <template #description>
                                <a-typography-paragraph
                                    :ellipsis="{ rows: 3 }"
                                    :content="item.paragraph" />
                            </template>
                        </a-card-meta>
                        <template #actions>
                            <setting-outlined key="setting" />
                            <edit-outlined key="edit" />
                            <a-dropdown :trigger="['click']">
                                <ellipsis-outlined key="ellipsis" />
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>菜单 1</a-menu-item>
                                        <a-menu-item>菜单 2</a-menu-item>
                                        <a-menu-item>菜单 3</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </template>
                    </a-card>
                </a-list-item>
            </template>
        </template>
    </a-list>
</template>

<script setup>
import { LinkOutlined } from '@ant-design/icons-vue'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import apis from '@/apis'
import { config } from '@/config'
import { usePagination } from '@/hooks'

defineOptions({
    name: 'listCard',
})

const { loading, listData, showLoading, hideLoading, paginationState } = usePagination()

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
</script>

<style lang="less" scoped>
.create-btn {
    width: 100%;
    height: 203px;
}
</style>
