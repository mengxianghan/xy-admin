<template>
    <a-button
        class="action-btn"
        type="text"
        @click="handleClick">
        <template
            v-if="cpShowIconSlot"
            #icon>
            <slot name="icon"></slot>
        </template>
        <slot></slot>
    </a-button>
</template>

<script setup>
import { computed, useSlots } from 'vue'

defineOptions({
    name: 'ActionButton',
})

const emit = defineEmits(['click'])
const slots = useSlots()

const cpShowIconSlot = computed(() => !!slots.icon)

function handleClick() {
    emit('click')
}
</script>

<style lang="less" scoped>
.action-btn {
    min-width: 36px;
    height: 36px;
    border: none;
    position: relative;
    font-size: 14px;
    color: currentColor;
    padding-left: 11px;
    padding-right: 11px;

    &:hover {
        color: currentColor;
    }

    :deep(.ant-badge) {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, 0);
        margin: 0;
    }
}
</style>
