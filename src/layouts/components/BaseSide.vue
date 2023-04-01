<template>
    <a-layout-sider
        class="base-side"
        breakpoint="lg"
        :collapsed="collapsed"
        :collapsed-width="config.sideCollapsedWidth"
        :width="config.sideWidth"
        :theme="theme">
        <div
            v-if="showHeader"
            class="base-side__header">
            <logo-card
                :theme="theme"
                :collapsed="collapsed"></logo-card>
        </div>
        <div
            v-if="cpShowDefaultSlot"
            class="base-side__body">
            <slot></slot>
        </div>
        <div
            v-if="cpShowFooterSlot"
            class="base-side__footer">
            <slot name="footer"></slot>
        </div>
    </a-layout-sider>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import LogoCard from './LogoCard.vue'

/**
 * @property {boolean} collapsed 当前收起状态
 * @property {boolean} showHeader 显示头部
 */
export default {
    name: 'BaseSide',
    components: {
        LogoCard,
    },
    props: {
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
    },
    setup(props, { slots }) {
        const appStore = useAppStore()

        const { config } = storeToRefs(appStore)

        const cpShowDefaultSlot = computed(() => !!slots.default)
        const cpShowFooterSlot = computed(() => !!slots.footer)

        return {
            config,
            cpShowDefaultSlot,
            cpShowFooterSlot,
        }
    },
}
</script>

<style lang="less" scoped>
.base-side {
    position: sticky;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 120;
    box-shadow: 1px 0 4px rgba(0, 21, 41, 0.08);
    transition: all @animation-duration-base, background 0s;

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
        overflow: hidden;
        overflow: auto;
        .scrollbar-black();
    }

    &__footer {
        flex-shrink: 0;
    }
}
</style>
