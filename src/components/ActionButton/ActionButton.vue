<template>
    <component
        class="x-action-button"
        :is="tag">
        <slot></slot>
    </component>
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
})

const { useToken } = theme
const { token } = useToken()
</script>

<style lang="less" scoped>
.x-action-button {
    border-radius: @border-radius;
    transition: all 0.2s;
    padding: 4px;
    color: v-bind('token.colorPrimary');
    cursor: pointer;

    &:hover {
        background: v-bind('token.colorPrimaryBg');
    }

    &:not(:first-child) {
        margin-left: 8px;
    }
}
</style>
