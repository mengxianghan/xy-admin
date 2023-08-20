<template>
    <div
        class="x-filter-tag-item"
        :class="cpClassNames"
        @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

import { useInjectFilterTagCtx, useInjectFilterTagSelectedValueCtx } from './context'

defineOptions({
    name: 'XFilterTagItem',
})

/**
 * @property {string | number} 唯一值，选中时抛出
 */
const props = defineProps({
    value: {
        type: [String, Number],
        required: true,
    },
})

useSlots(['default'])

const { multiple, onTagClick } = useInjectFilterTagCtx()
const selectedKeys = useInjectFilterTagSelectedValueCtx()

const cpIsSelect = computed(() => {
    if (multiple?.value) {
        // 多选
        return Array.isArray(selectedKeys.value) ? selectedKeys.value?.includes(props.value) : false
    } else {
        // 单选
        return selectedKeys.value === props.value
    }
})
const cpClassNames = computed(() => {
    return {
        'x-filter-tag-item--active': cpIsSelect.value,
    }
})

/**
 * 点击
 */
function handleClick() {
    onTagClick({ value: props.value })
}
</script>

<style lang="less" scoped>
.x-filter-tag-item {
    padding: 0 8px;
    display: flex;
    align-items: center;
    border-radius: @border-radius;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        color: @color-primary;
    }

    &--active {
        box-shadow: 0 0 0 1px inset @color-primary;
        color: @color-primary;
    }
}
</style>
