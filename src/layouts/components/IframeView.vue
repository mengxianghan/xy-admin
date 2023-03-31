<template>
    <div
        v-show="cpIsIframe"
        class="iframe-view">
        <iframe
            v-for="item in iframeList"
            v-show="$route.meta.url === item.meta.url"
            :src="item.meta.url"
            :key="item.meta.url"
            class="iframe"></iframe>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useMultiTabStore } from '@/store'
import { useRoute } from 'vue-router'

export default {
    name: 'IframeView',
    setup() {
        const route = useRoute()
        const multiTabStore = useMultiTabStore()
        const iframeList = computed(() => multiTabStore.iframeList)
        const cpIsIframe = computed(() => route?.meta?._isIframe)

        return {
            iframeList,
            cpIsIframe,
        }
    },
}
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
