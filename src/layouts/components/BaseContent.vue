<template>
    <a-layout-content class="base-content">
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

<script>
import { computed } from 'vue'
import { useMultiTabStore } from '@/store'
import IframeView from './IframeView.vue'

export default {
    name: 'BaseContent',
    components: {
        IframeView,
    },
    setup() {
        const multiTabStore = useMultiTabStore()

        const cpCacheList = computed(() => multiTabStore.cacheList)
        const cpKeepAlive = computed(() => multiTabStore.keepAlive)

        return {
            cpCacheList,
            cpKeepAlive,
        }
    },
}
</script>

<style lang="less" scoped>
.base-content {
    margin: @margin-md;
    position: relative;
}
</style>
