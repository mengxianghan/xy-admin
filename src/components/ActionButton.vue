<template>
    <span class="x-action-button">
        <component
            class="x-action-button__component"
            :is="tag">
            <slot></slot>
        </component>
        <a-divider
            v-if="divider"
            type="vertical" />
    </span>
</template>

<script>
/**
 * 操作按钮
 * @property {string} tag html标签，默认：a
 * @property {boolean} divider 是否显示 divider
 */
export default {
    name: 'XActionButton',
    props: {
        tag: {
            type: String,
            default: 'a',
        },
        divider: {
            type: Boolean,
            default: true,
        },
    },
    setup() {},
}
</script>

<style lang="less" scoped>
.x-action-button {
    &:last-child {
        :deep(.ant-divider) {
            display: none;
        }
    }
}
</style>
