<template>
    <div class="iframe-container">
        <iframe :src="src"
                class="iframe"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src: ''
        }
    },
    watch: {},
    mounted() {
        this.src = this.$route?.meta?.iframeUrl
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
        margin: -12px;
    }
}
</style>
