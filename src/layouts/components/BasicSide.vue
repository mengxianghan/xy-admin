<template>
    <a-layout-sider
        v-model:collapsed="config.collapsed"
        :collapsed-width="config.sideCollapsedWidth"
        :collapsible="true"
        :style="cpStyles"
        :theme="theme"
        :width="config.sideWidth"
        breakpoint="lg"
        class="basic-side">
        <template #trigger>
            <div class="basic-side__trigger">
                <component :is="config.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"></component>
            </div>
        </template>
        <div class="basic-side__header">
            <slot name="header"></slot>
        </div>
        <x-scrollbar
            v-if="cpShowDefaultSlot"
            class="basic-side__body">
            <slot></slot>
        </x-scrollbar>
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
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store'
import { theme as antTheme } from 'ant-design-vue'

defineOptions({
    name: 'BasicSide',
})

/**
 * @property {boolean} showHeader 显示头部
 */
defineProps({
    theme: {
        type: String,
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
})
const slots = useSlots()
const appStore = useAppStore()
const { token } = antTheme.useToken()

const { config } = storeToRefs(appStore)

const cpStyles = computed(() => {
    const styles = {
        zIndex: config.value.layout === 'topBottom' ? 110 : 120,
    }

    if (config.value.sideTheme === 'light') {
        styles.boxShadow = `0 0 0 1px ${token.value.colorSplit}`
    }

    return styles
})
const cpShowDefaultSlot = computed(() => !!slots.default)
const cpShowFooterSlot = computed(() => !!slots.footer)
</script>

<style lang="less" scoped>
.basic-side {
    position: sticky;
    transition-property: background-color, width, flex, max-width, min-width;

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
        // overflow: auto;

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

    :deep(.ant-layout-sider-trigger) {
        background: transparent;
        height: auto;
        line-height: 1;
        padding: 4px;
    }

    &__trigger {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: @border-radius;
        transition: all 0.2s;

        &:hover {
            background: @color-bg-text-hover;
        }
    }
}
</style>
