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
import { computed } from 'vue'

export default {
    name: 'ActionButton',
    emits: ['click'],
    setup(props, { slots, emit }) {
        const cpShowIconSlot = computed(() => !!slots.icon)

        function handleClick() {
            emit('click')
        }

        return {
            cpShowIconSlot,
            handleClick,
        }
    },
}
</script>

<style lang="less" scoped>
.action-btn {
    min-width: 48px;
    height: 48px;
    border: none;
    position: relative;
    font-size: 14px;
    color: currentColor;

    :deep(.ant-badge) {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, 0);
        margin: 0;
    }
}
</style>
