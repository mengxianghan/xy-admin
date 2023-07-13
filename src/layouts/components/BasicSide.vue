<template>
    <a-layout-sider
        :collapsed="collapsed"
        :collapsed-width="config.sideCollapsedWidth"
        :theme="theme"
        :width="config.sideWidth"
        breakpoint="lg"
        class="basic-side">
        <div
            v-if="showHeader"
            class="basic-side__header">
            <logo-card
                :collapsed="collapsed"
                :theme="theme"></logo-card>
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

import LogoCard from './LogoCard.vue'

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
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 120;
    box-shadow: 1px 0 4px rgba(0, 21, 41, 0.08);
    transition: all @animation-duration-base, background 0s;
    overflow: hidden;

    :deep(.ant-layout-sider-children) {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    &__header {
        flex-shrink: 0;
    }

    &__body {
        flex: 1;
        min-height: 0;
        overflow: auto;

        .scrollbar-black();

        :deep(.basic-menu__title) {
            width: 100%;
            display: flex;
            align-items: center;

            .ant-badge {
                margin: 0 0 0 auto;
                .ant-badge-count {
                    box-shadow: none;
                }
            }
        }
    }

    &__footer {
        flex-shrink: 0;
    }
}
</style>
