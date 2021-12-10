<template>
    <div class="iframe-container">
        <iframe :src="src"
                class="iframe"></iframe>
    </div>
</template>

<script>
import {ref} from 'vue'
import {useRoute} from 'vue-router'

export default {
    name: 'iframe',
    setup() {
        const route = useRoute()
        const src = ref(route.meta?.iframeUrl)
        return {
            src
        }
    }
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
