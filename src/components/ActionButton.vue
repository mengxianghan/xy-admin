<template>
    <span class="x-action-button">
        <slot></slot>
        <a-divider type="vertical"></a-divider>
    </span>
</template>

<script>
export default {
    name: 'XActionButton',
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
.x-action-button {
    &:last-child {
        .ant-divider {
            display: none;
        }
    }
}
</style>
