<template>
    <div class="x-mod-title">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'XModTitle',
    data() {
        return {}
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="less"
       scoped>
.x-mod-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
}
</style>
