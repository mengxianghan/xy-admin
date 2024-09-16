<template>
    <component
        :is="tag"
        :class="{
            'x-action-button--disabled': disabled,
            'x-action-button--divider': divider,
            'x-action-button--hovered': hovered,
        }"
        class="x-action-button"
        @click="handleClick"
        @mousedown="handleMousedown">
        <slot></slot>
        <a-divider
            v-if="divider"
            type="vertical" />
    </component>
</template>

<script setup>
defineOptions({
    name: 'XActionButton',
})

const props = defineProps({
    tag: { type: String, default: 'span' },
    divider: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    hovered: { type: Boolean, default: false },
})

const emits = defineEmits(['click', 'mousedown'])

function handleClick() {
    if (props.disabled) {
        return
    }
    emits('click')
}

function handleMousedown() {
    if (props.disabled) {
        return
    }
    emits('mousedown')
}
</script>

<style lang="less" scoped>
.x-action-button {
    color: @color-primary;
    cursor: pointer;
    transition: all @motion-duration-mid;
    display: inline-block;
    position: relative;
    text-align: center;
    min-width: 22px;
    border-radius: @border-radius;

    &:not(:last-child) {
        margin-right: 12px;

        &.x-action-button--divider {
            margin-right: 24px;
        }
    }

    &--disabled {
        color: @color-text-disabled;
        cursor: not-allowed;
    }

    &--hovered {
        &:hover {
            background: @control-item-bg-hover;
        }
    }

    &:not(.x-action-button--disabled):hover {
        color: @color-primary-hover;
    }

    .ant-divider {
        margin: auto 0;
        top: 0;
        bottom: 0;
        right: -12px;
        pointer-events: none;
        position: absolute;
    }

    &:last-child {
        :deep(.ant-divider) {
            display: none;
        }
    }
}
</style>
