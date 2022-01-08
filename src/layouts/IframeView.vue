<template>
    <div class="iframe-container">
        <iframe v-for="(item) in iframeList"
                v-show="$route.meta.url === item.meta.url"
                :src="item.meta.url"
                :key="item.meta.url"
                class="iframe"></iframe>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'IframeView',
    computed: {
        ...mapGetters({
            iframeList: 'multiTab/iframeList',
        }),
    },
}
</script>

<style lang="less"
       scoped>
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