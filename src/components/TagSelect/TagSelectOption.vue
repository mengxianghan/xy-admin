<template>
    <div
        class="x-tag-select-option"
        :class="cpClass"
        @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup>
import { theme } from 'ant-design-vue'
import { useTagSelectInject } from './context'
import { computed } from 'vue'

defineOptions({
    name: 'XTagSelectOption',
})

/**
 * @property {object} record
 * @property {string|number} value
 */
const props = defineProps({
    record: {
        type: Object,
        default: () => ({}),
    },
    value: {
        type: [String, Number],
    },
})

const { token } = theme.useToken()
const { onSelect, modelValue, multiple } = useTagSelectInject()

const cpClass = computed(() => {
    return {
        'x-tag-select-option--active': multiple.value
            ? modelValue.value?.includes(props.value) ||
              (typeof props.value === 'undefined' && !modelValue.value?.length && props.record?.unlimited)
            : modelValue.value === props.value,
    }
})

function handleClick() {
    onSelect(props.value)
}
</script>

<style lang="less" scoped>
.x-tag-select-option {
    padding-inline: 4px;
    display: inline-flex;
    align-items: center;
    height: 24px;
    border-radius: @border-radius-sm;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 8px;

    &:hover:not(.x-tag-select-option--active) {
        background: v-bind('token.controlItemBgHover');
    }

    &--active {
        background: v-bind('token.controlItemBgActive');
        color: @color-primary;
    }
}
</style>
