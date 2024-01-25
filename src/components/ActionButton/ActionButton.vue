<template>
    <span class="x-action-btn">
        <component
            :is="tag"
            class="x-action-btn__btn">
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
    &__btn {
        color: @color-primary;
        cursor: pointer;
        transition: @motion-duration-mid;

        &:hover {
            color: @color-primary-hover;
        }
    }

    .ant-divider {
        margin-inline: 12px;
    }

    &:last-child {
        :deep(.ant-divider) {
            display: none;
        }
    }
}
</style>
