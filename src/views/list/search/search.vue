<template>
    <a-page-header
        class="ant-page-header-wrap"
        :title="cpPageTitle">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
        <template #footer>
            <a-tabs
                v-model:active-key="activeKey"
                @change="onTabChange">
                <a-tab-pane
                    v-for="item in tabList"
                    :key="item.key"
                    :tab="item.desc" />
            </a-tabs>
        </template>
    </a-page-header>

    <router-view></router-view>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Enum from 'xy-enum'

export default {
    name: 'listSearch',
    setup() {
        const route = useRoute()
        const router = useRouter()

        const TAB_ENUM = new Enum([
            { key: 'listSearchArticles', value: 'ArticleList', desc: '文章' },
            { key: 'listSearchProjects', value: 'ApplicationList', desc: '项目' },
            { key: 'listSearchApplications', value: 'ProjectList', desc: '应用' },
        ])
        const tabList = TAB_ENUM.getList()
        const activeKey = ref(route?.name)

        const cpPageTitle = computed(() => route?.meta?.title)
        const cpComponentName = computed(() => TAB_ENUM.getValue(activeKey.value))

        function onTabChange(_activeKey) {
            router.push({ name: _activeKey })
        }

        return {
            tabList,
            activeKey,
            cpPageTitle,
            cpComponentName,
            onTabChange,
        }
    },
}
</script>

<script setup></script>

<style lang="less" scoped></style>
