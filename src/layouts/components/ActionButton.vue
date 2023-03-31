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

<script>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAppStore } from '@/store'

export default {
    name: 'ActionButton',
    emits: ['click'],
    setup(props, { slots, emit }) {
        const appStore = useAppStore()

        const { config } = storeToRefs(appStore)

        const cpShowIconSlot = computed(() => !!slots.icon)

        function handleClick() {
            emit('click')
        }

        return {
            config,
            cpShowIconSlot,
            handleClick,
        }
    },
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
