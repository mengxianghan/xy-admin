<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useMultiTabStore } from '@/store'

defineOptions({
  name: 'IframeView',
})

const route = useRoute()
const multiTabStore = useMultiTabStore()
const iframeList = computed(() => multiTabStore.iframeList)
const cpIsIframe = computed(() => route?.meta?.isIframe)
</script>

<template>
  <div
    v-show="cpIsIframe"
    class="iframe-view"
  >
    <iframe
      v-for="item in iframeList"
      v-show="$route.meta.url === item.meta.url"
      :key="item.meta.url"
      :src="item.meta.url"
      class="iframe"
    />
  </div>
</template>

<style lang="less" scoped>
.iframe {
  width: 100%;
  height: 100%;
  border: none;

  &-view {
    position: absolute;
    left: -16px;
    right: -16px;
    top: -16px;
    bottom: -16px;
  }
}
</style>
