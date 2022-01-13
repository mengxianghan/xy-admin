<template>
    <div v-show="'iframe' === $route.meta.type"
         class="iframe-view">
        <iframe v-for="(item) in iframeList"
                v-show="$route.meta.url === item.meta.url"
                :src="item.meta.url"
                :key="item.meta.url"
                class="iframe"></iframe>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
    name: 'IframeView',
    setup() {
        const store = useStore()
        const iframeList = computed(() => store.getters['multiTab/iframeList'])
        return {
            iframeList,
        }
    },
}
</script>

<style lang="less"
       scoped>
.iframe {
    width: 100%;
    height: 100%;
    border: none;

    @space: 12px;

    &-view {
        position: absolute;
        left: -@space;
        right: -@space;
        top: -@space;
        bottom: -@space;
    }
}
</style>
