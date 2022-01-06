<template>
    <div>
        <div class="test">欢迎使用{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            title: process.env.VUE_APP_TITLE
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="less"
       scoped>
</style>
