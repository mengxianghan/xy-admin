<script setup>
import { useMultiTabStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import useAppStore from '../../store/modules/app'
import IframeView from './IframeView.vue'
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

<template>
  <a-layout-content class="basic-content">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cpCacheList">
        <layout-transition>
          <component
            :is="Component"
            v-if="cpKeepAlive"
            :key="route.name"
          />
        </layout-transition>
      </keep-alive>
    </router-view>
    <iframe-view />
  </a-layout-content>
</template>

<style lang="less" scoped>
.basic-content {
  margin: v-bind('`${config.mainMargin}px`');
  position: relative;
}
</style>
