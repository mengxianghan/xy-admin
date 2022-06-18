<template>
    <a-card class="mb-4-3">
        <h2>{{ userName }} ，祝你开心每一天！</h2>
        <p class="mb-0">某某某公司－某某某部门－某某某岗位</p>
    </a-card>

    <a-row :gutter="12">
        <a-col :lg="18">
            <a-card class="mb-4-3">
                <a-row type="flex"
                       class="align-center">
                    <a-col flex="1">
                        <a-statistic title="我的待办"
                                     value="8个任务" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic title="本周任务平均处理时间"
                                     value="32分钟" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic title="本周完成任务数"
                                     value="24个任务" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic title="异常（个）"
                                     value="1" />
                    </a-col>
                </a-row>
            </a-card>

            <a-card title="动态"
                    :bordered="false">
                <a-list item-layout="horizontal"
                        :data-source="dynamicList">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta :description="item.time">
                                <template #avatar>
                                    <a-avatar :src="item.avatar" />
                                </template>
                                <template #title>
                                    {{ item.title }}
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </a-col>
        <a-col :lg="6">
            <a-card title="关于"
                    class="mb-4-3">
                <div>高性能 / 精致 / 优雅。基于 vue3 + ant-design-vue 的中后台前端解决方案。</div>
            </a-card>
            <a-card title="版本信息">
                <a-result :title="`${title} ${version}`"
                          :sub-title="`最新版本 ${version}`">
                    <template #icon>
                        <img :src="require('@/assets/upgrade.svg')" />
                    </template>
                </a-result>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { timeFix } from '@/utils'

import api from '@/api'

export default {
    name: 'welcome',
    setup() {
        const store = useStore()
        const title = process.env.VUE_APP_TITLE
        const version = '2.1.6'
        const userInfo = computed(() => store.getters['user/userInfo'])
        const userName = computed(() => `${timeFix()}，${userInfo.value?.username}`)
        const dynamicList = ref([])

        async function getData() {
            const { code, data } = await api.common.getWelcomeData()
            if (200 === code) {
                const { dynamicRows } = data
                dynamicList.value = dynamicRows
            }
        }

        onMounted(() => {
            getData()
        })

        return {
            title,
            version,
            userName,
            dynamicList,
        }
    },
}
</script>

<style lang="less"
       scoped>
       </style>
