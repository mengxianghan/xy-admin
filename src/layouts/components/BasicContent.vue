<template>
    <a-layout-content class="basic-content">
        <router-view v-slot="{ Component, route }">
            <keep-alive :include="cpCacheList">
                <layout-transition>
                    <component
                        :is="Component"
                        v-if="cpKeepAlive"
                        :key="route.name"></component>
                </layout-transition>
            </keep-alive>
        </router-view>
        <iframe-view></iframe-view>
    </a-layout-content>
</template>

<script setup>
import { computed } from 'vue'
import { useMultiTabStore } from '@/store'
import IframeView from './IframeView.vue'
import useAppStore from '../../store/modules/app'
import { storeToRefs } from 'pinia'
import LayoutTransition from './LayoutTransition.vue'

defineOptions({
    name: 'BasicContent',
})

const appStore = useAppStore()
const multiTabStore = useMultiTabStore()

const { config } = storeToRefs(appStore)

const cpCacheList = computed(() => multiTabStore.cacheList)
const cpKeepAlive = computed(() => multiTabStore.keepAlive)
</script>

<style lang="less" scoped>
.basic-content {
    margin: v-bind('config.mainMargin + "px"');
    position: relative;
}
</style>
