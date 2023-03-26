<template>
    <a-list
        :data-source="list"
        :grid="{ gutter: 16, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }"
        :loading="loading">
        <template #renderItem="{ item }">
            <template v-if="!item.id">
                <a-list-item>
                    <a-card
                        :bordered="false"
                        :body-style="{ padding: 0 }">
                        <a-button
                            type="dashed"
                            class="create-btn">
                            <icon-plus-outlined />
                            新增
                        </a-button>
                    </a-card>
                </a-list-item>
            </template>
            <template v-else>
                <a-list-item>
                    <a-card :bordered="false">
                        <a-card-meta :title="item.title">
                            <template #avatar>
                                <a-avatar :src="item.avatar" />
                            </template>
                            <template #description>
                                <a-typography-paragraph
                                    :ellipsis="{ rows: 3 }"
                                    :content="item.desc" />
                            </template>
                        </a-card-meta>
                        <template #actions>
                            <icon-setting-outlined key="setting" />
                            <icon-edit-outlined key="edit" />
                            <a-dropdown :trigger="['click']">
                                <icon-ellipsis-outlined key="ellipsis" />
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

<script>
import { onMounted } from 'vue'
import api from '@/api'
import usePagination from '@/hooks/usePagination'

export default {
    name: 'listCard',
    setup() {
        const { loading, list } = usePagination()

        onMounted(() => {
            getPageList()
        })

        /**
         * 获取分页列表
         */
        async function getPageList() {
            loading.value = true
            const { code, data } = await api.common.getPageList().catch(() => {
                loading.value = false
            })
            loading.value = false
            if (200 === code) {
                list.value = [{}, ...data.rows]
            }
        }

        return {
            list,
            loading,
        }
    },
}
</script>

<style lang="less" scoped>
.create-btn {
    width: 100%;
    height: 187px;
}
</style>
