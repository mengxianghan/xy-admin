<template>
    <a-layout-sider
        breakpoint="lg"
        class="basic-side"
        v-model:collapsed="collapsed"
        :style="cpStyles"
        :collapsible="true"
        :collapsed-width="config.sideCollapsedWidth"
        :theme="theme"
        :width="config.sideWidth">
        <template #trigger>
            <div class="basic-side__trigger">
                <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"></component>
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
import { computed, useSlots, ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
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

const collapsed = ref(false)

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
    // box-shadow: 2px 0 8px rgba(29, 35, 41, 0.05);

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
