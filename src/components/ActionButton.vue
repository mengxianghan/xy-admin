<template>
    <span class="x-action-button">
        <component :is="tag"
                   class="x-action-button__component">
            <slot></slot>
        </component>
        <a-divider type="vertical"/>
    </span>
</template>

<script>
export default {
    name: 'ActionButton',
    props: {
        tag: {
            type: String,
            default: 'a',
        },
    },
    setup() {
    },
}
</script>

<style lang="less"
       scoped>
.x-action-button {
    &:last-child {
        :deep(.ant-divider) {
            display: none;
        }
    }
}
</style>
