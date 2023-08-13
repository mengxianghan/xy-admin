<template>
    <a-layout-sider
        breakpoint="lg"
        class="basic-side"
        :collapsed="collapsed"
        :collapsed-width="config.sideCollapsedWidth"
        :theme="theme"
        :width="config.sideWidth">
        <div class="basic-side__header">
            <slot name="header"></slot>
        </div>
        <div
            v-if="cpShowDefaultSlot"
            class="basic-side__body">
            <slot></slot>
        </div>
        <div
            v-if="cpShowFooterSlot"
            class="basic-side__footer">
            <slot name="footer"></slot>
        </div>
    </a-layout-sider>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, useSlots } from 'vue'

import { useAppStore } from '@/store'

defineOptions({
    name: 'BasicSide',
})

/**
 * @property {boolean} collapsed 当前收起状态
 * @property {boolean} showHeader 显示头部
 */
defineProps({
    theme: {
        type: String,
    },
    collapsed: {
        type: Boolean,
        default: false,
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
})
const slots = useSlots()

const appStore = useAppStore()

const { config } = storeToRefs(appStore)

const cpShowDefaultSlot = computed(() => !!slots.default)
const cpShowFooterSlot = computed(() => !!slots.footer)
</script>

<style lang="less" scoped>
.basic-side {
    position: sticky;

    :deep(.ant-layout-sider-children) {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    &.ant-layout-sider-light {
        border-right: @color-split solid 1px;
    }

    &.ant-layout-sider-dark {
        z-index: 120;
    }

    &__header {
        flex-shrink: 0;
    }

    &__body {
        flex: 1;
        min-height: 0;
        overflow: auto;

        :deep(.ant-menu) {
            border-right: 0;
        }
    }

    &__footer {
        flex-shrink: 0;
    }

    &.ant-layout-sider-collapsed {
        :deep(.brand) {
            h1 {
                display: none;
            }
        }
    }
}
</style>
