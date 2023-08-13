<template>
    <a-layout-content class="basic-content">
        <router-view v-slot="{ Component, route }">
            <keep-alive :include="cpCacheList">
                <component
                    v-if="cpKeepAlive"
                    :is="Component"
                    :key="route.name"></component>
            </keep-alive>
        </router-view>
        <iframe-view></iframe-view>
    </a-layout-content>
</template>

<script setup>
import { computed } from 'vue'
import { useMultiTabStore } from '@/store'
import IframeView from './IframeView.vue'

defineOptions({
    name: 'BasicContent',
})

const multiTabStore = useMultiTabStore()

const cpCacheList = computed(() => multiTabStore.cacheList)
const cpKeepAlive = computed(() => multiTabStore.keepAlive)
</script>

<style lang="less" scoped>
.basic-content {
    margin: 16px;
    position: relative;
}
</style>
