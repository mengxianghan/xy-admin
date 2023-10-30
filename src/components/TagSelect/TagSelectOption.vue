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
import { computed, getCurrentInstance } from 'vue'

defineOptions({
    name: 'XTagSelectOption',
})

/**
 * @property {string|number} value
 */
const props = defineProps({
    value: {
        type: [String, Number],
    },
})

const { token } = theme.useToken()
const { onSelect, modelValue, multiple } = useTagSelectInject()

const instance = getCurrentInstance()

console.log(instance)

const cpClass = computed(() => {
    return {
        'x-tag-select-option--active': multiple.value
            ? modelValue.value?.includes(props.value)
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
