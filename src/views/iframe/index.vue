<template>
    <div class="iframe-container">
        <template
            v-for="(item, index) in iframeList"
            :key="index">
            <iframe
                v-show="url === item.meta.url"
                :src="item.meta.url"
                class="iframe"></iframe>
        </template>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMultiTabStore } from '@/store'

const multiTabStore = useMultiTabStore()
const iframeList = computed(() => multiTabStore.iframeList)
const route = useRoute()
const url = ref(route.meta?.url)
</script>

<style lang="less" scoped>
.iframe {
    width: 100%;
    height: 100%;
    border: 0;

    &-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: -16px;
    }
}
</style>
