<template>
    <a-row :gutter="16">
        <a-col
            class="mb-8-2"
            :md="24"
            :lg="7">
            <user-info-card></user-info-card>
        </a-col>
        <a-col
            :md="24"
            :lg="17">
            <a-card
                :active-tab-key="activeTabKey"
                :bordered="false"
                :tab-list="tabList"
                @tabChange="(key) => (activeTabKey = key)">
                <article-list v-if="activeTabKey === 'article'"></article-list>
                <app-list v-if="activeTabKey === 'app'"></app-list>
                <project-list v-if="activeTabKey === 'project'"></project-list>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup>
import { ref } from 'vue'
import UserInfoCard from './components/UserInfoCard.vue'
import ArticleList from './components/ArticleList.vue'
import AppList from './components/AppList.vue'
import ProjectList from './components/ProjectList.vue'

defineOptions({
    name: 'userCenter',
})

const tabList = [
    { key: 'article', tab: '文章' },
    { key: 'app', tab: '应用' },
    { key: 'project', tab: '项目' },
]
const activeTabKey = ref('article')
</script>

<style lang="less" scoped></style>
