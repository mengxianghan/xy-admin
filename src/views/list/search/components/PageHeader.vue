<template>
    <a-page-header
        main
        :title="cpPageTitle"
        :ghost="false">
        <div
            :style="{
                width: '520px',
                margin: '0 auto',
            }">
            <a-input-search
                placeholder="请输入"
                enter-button="搜索"
                size="large" />
        </div>
        <template #footer>
            <a-tabs
                :active-key="cpActiveKey"
                :animated="false"
                @change="onTabChange">
                <a-tab-pane
                    key="listSearchArticles"
                    tab="文章" />
                <a-tab-pane
                    key="listSearchProjects"
                    tab="项目" />
                <a-tab-pane
                    key="listSearchApplications"
                    tab="应用" />
            </a-tabs>
        </template>
    </a-page-header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
    name: 'PageHeader',
})

const route = useRoute()
const router = useRouter()

const cpPageTitle = computed(() => route?.meta?.title)
const cpActiveKey = computed(() => route?.name)

function onTabChange(_activeKey) {
    router.push({ name: _activeKey })
}
</script>

<style lang="less" scoped></style>
