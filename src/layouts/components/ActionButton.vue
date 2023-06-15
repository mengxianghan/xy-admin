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
import { storeToRefs } from 'pinia'
import { computed, useSlots } from 'vue'

import { useAppStore } from '@/store'

defineOptions({
    name: 'ActionButton',
})

const emit = defineEmits(['click'])
const slots = useSlots()

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const cpShowIconSlot = computed(() => !!slots.icon)

function handleClick() {
    emit('click')
}
</script>

<style lang="less" scoped>
.action-btn {
    min-width: v-bind('config.headerHeight + "px"');
    height: v-bind('config.headerHeight + "px"');
    border: none;
    position: relative;
    font-size: 14px;
    color: currentColor;

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
