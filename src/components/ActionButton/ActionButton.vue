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
import { theme } from 'ant-design-vue'

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

const { useToken } = theme
const { token } = useToken()
</script>

<style lang="less" scoped>
.x-action-btn {
    border-radius: @border-radius;
    transition: all 0.2s;
    padding: 4px;
    color: v-bind('token.colorPrimary');
    cursor: pointer;

    &:hover {
        background: v-bind('token.colorPrimaryBg');
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
