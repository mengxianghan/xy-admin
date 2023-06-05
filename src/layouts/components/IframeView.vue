<template>
    <div
        v-show="cpIsIframe"
        class="iframe-view">
        <iframe
            v-for="item in iframeList"
            v-show="$route.meta.url === item.meta.url"
            class="iframe"
            :src="item.meta.url"
            :key="item.meta.url"></iframe>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMultiTabStore } from '@/store'
import { useRoute } from 'vue-router'

defineOptions({
    name: 'IframeView',
})

const route = useRoute()
const multiTabStore = useMultiTabStore()
const iframeList = computed(() => multiTabStore.iframeList)
const cpIsIframe = computed(() => route?.meta?._isIframe)
</script>

<style lang="less" scoped>
.iframe {
    width: 100%;
    height: 100%;
    border: none;

    &-view {
        position: absolute;
        left: -@margin-md;
        right: -@margin-md;
        top: -@margin-md;
        bottom: -@margin-md;
    }
}
</style>
