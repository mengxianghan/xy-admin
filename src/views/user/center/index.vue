<script setup>
import { ref } from 'vue'

import AppList from './components/AppList.vue'
import ArticleList from './components/ArticleList.vue'
import ProjectList from './components/ProjectList.vue'
import UserInfoCard from './components/UserInfoCard.vue'

defineOptions({
  name: 'UserCenter',
})

const tabList = [
  { key: 'article', tab: '文章' },
  { key: 'app', tab: '应用' },
  { key: 'project', tab: '项目' },
]
const activeTabKey = ref('article')
</script>

<template>
  <a-row :gutter="16">
    <a-col
      :lg="10"
      :md="24"
      :xl="8"
      :xxl="6"
      class="mb-8-2"
    >
      <user-info-card />
    </a-col>
    <a-col
      :lg="14"
      :md="24"
      :xl="16"
      :xxl="18"
    >
      <a-card
        :active-tab-key="activeTabKey"
        :tab-list="tabList"
        @tab-change="(key) => (activeTabKey = key)"
      >
        <article-list v-if="activeTabKey === 'article'" />
        <app-list v-if="activeTabKey === 'app'" />
        <project-list v-if="activeTabKey === 'project'" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped></style>
