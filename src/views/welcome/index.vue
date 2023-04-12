<template>
    <a-card
        :bordered="false"
        class="mb-8-2">
        <h2>{{ cpUserName }} ，祝你开心每一天！</h2>
        <p class="mb-0">某某某公司－某某某部门－某某某岗位</p>
    </a-card>

    <a-row :gutter="16">
        <a-col :lg="18">
            <a-card :bordered="false">
                <a-row
                    type="flex"
                    class="align-center">
                    <a-col flex="1">
                        <a-statistic
                            title="我的待办"
                            value="8个任务" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic
                            title="本周任务平均处理时间"
                            value="32分钟" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic
                            title="本周完成任务数"
                            value="24个任务" />
                    </a-col>
                    <a-col flex="1">
                        <a-statistic
                            title="异常（个）"
                            value="1" />
                    </a-col>
                </a-row>
            </a-card>

            <a-card
                :bordered="false"
                title="动态"
                class="mt-8-2">
                <a-list
                    item-layout="horizontal"
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
            <a-card
                :bordered="false"
                title="关于">
                <div>高性能 / 精致 / 优雅。基于 vue3 + ant-design-vue 的中后台前端解决方案。</div>
            </a-card>
            <a-card
                :bordered="false"
                title="版本信息"
                class="mt-8-2">
                <a-result
                    :title="`${title} ${version}`"
                    :sub-title="`最新版本 ${version}`">
                    <template #icon>
                        <img :src="upgradeImg" />
                    </template>
                </a-result>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/store'
import { timeFix } from '@/utils'
import { CODE_SUCCESS } from '@/config/http'
import api from '@/api'
import upgradeImg from '@/assets/upgrade.svg?url'

export default {
    name: 'welcome',
    setup() {
        const userStore = useUserStore()
        const title = import.meta.env.VITE_TITLE
        const cpUserInfo = computed(() => userStore.userInfo)
        const cpUserName = computed(() => `${timeFix()}，${cpUserInfo.value?.username}`)
        const dynamicList = ref([])
        const { version } = __APP_INFO__

        onMounted(() => {
            getData()
        })

        async function getData() {
            const { code, data } = await api.common.getWelcomeData()
            if (CODE_SUCCESS === code) {
                const { dynamicRows } = data
                dynamicList.value = dynamicRows
            }
        }

        return {
            upgradeImg,
            title,
            version,
            dynamicList,
            cpUserName,
        }
    },
}
</script>

<style lang="less" scoped></style>
