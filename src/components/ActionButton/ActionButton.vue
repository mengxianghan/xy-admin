<template>
    <span class="x-action-btn-wrap">
        <component
            class="x-action-btn"
            :is="tag">
            <slot></slot>
        </component>
        <a-divider
            v-if="divider"
            type="vertical" />
    </span>
</template>

<script setup>
defineOptions({
    name: 'XActionButton',
})

/**
 * 操作按钮
 * @property {string} tag html标签，默认：a
 * @property {boolean} divider 是否显示分割线
 */
defineProps({
    tag: {
        type: String,
        default: 'span',
    },
    divider: {
        type: Boolean,
        default: true,
    },
})
</script>

<style lang="less" scoped>
.x-action-btn {
    border-radius: @border-radius;
    transition: all 0.2s;
    padding: 4px;
    color: @color-primary;
    cursor: pointer;

    &:hover {
        background: color(~`colorPalette('@{color-primary}', 1) `);
    }

    &-wrap {
        &:last-child {
            :deep(.ant-divider) {
                display: none;
            }
        }
    }
}
</style>
