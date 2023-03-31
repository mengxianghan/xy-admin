<template>
    <a-layout class="layout">
        <template #default>
            <!-- 左侧菜单 -->
            <template v-if="config.menuMode === 'left'">
                <base-side v-model:collapsed="collapsed">
                    <base-menu :data-list="leftMenuList"></base-menu>
                </base-side>
                <a-layout>
                    <base-header>
                        <template #left>
                            <a-space :size="0">
                                <action-button @click="handleCollapsed">
                                    <template #icon>
                                        <component
                                            :is="collapsed ? 'icon-menu-unfold-outlined' : 'icon-menu-fold-outlined'"
                                            :style="{ fontSize: '14px' }"></component>
                                    </template>
                                </action-button>
                                <action-button @click="handleBack">
                                    <template #icon>
                                        <icon-rollback-outlined :style="{ fontSize: '14px' }"></icon-rollback-outlined>
                                    </template>
                                </action-button>
                            </a-space>
                        </template>
                    </base-header>
                    <multi-tab></multi-tab>
                    <base-content></base-content>
                </a-layout>
            </template>

            <!-- 顶部菜单 -->
            <template v-if="config.menuMode === 'top'">
                <base-header
                    class="px-8-2"
                    theme="dark">
                    <template #left>
                        <logo-card theme="dark"></logo-card>
                    </template>
                    <base-menu
                        mode="horizontal"
                        :data-list="topMenuList"></base-menu>
                </base-header>
                <multi-tab></multi-tab>
                <base-content></base-content>
            </template>

            <!-- 组合菜单 -->
            <template v-if="config.menuMode === 'combination'">
                <base-header
                    theme="dark"
                    class="px-8-2">
                    <template #left>
                        <logo-card theme="dark"></logo-card>
                    </template>
                    <base-menu
                        mode="horizontal"
                        :data-list="topMenuList"></base-menu>
                </base-header>
                <a-layout>
                    <base-side
                        v-if="leftMenuList.length"
                        theme="light"
                        :show-header="false"
                        :style="{
                            top: `${config.header.height}px`,
                            height: `calc(100vh - ${config.header.height}px)`,
                        }">
                        <base-menu
                            theme="light"
                            :data-list="leftMenuList"></base-menu>
                    </base-side>
                    <a-layout>
                        <multi-tab></multi-tab>
                        <base-content></base-content>
                    </a-layout>
                </a-layout>
            </template>
        </template>
    </a-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import useMenu from './hooks/useMenu'
import MultiTab from './components/MultiTab.vue'
import ActionButton from './components/ActionButton.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseSide from './components/BaseSide.vue'
import BaseContent from './components/BaseContent.vue'
import LogoCard from './components/LogoCard.vue'
import BaseMenu from './components/BaseMenu/BaseMenu.vue'

export default {
    name: 'DefaultLayout',
    components: {
        MultiTab,
        ActionButton,
        BaseHeader,
        BaseSide,
        BaseContent,
        LogoCard,
        BaseMenu,
    },
    setup() {
        const appStore = useAppStore()
        const router = useRouter()
        const { leftMenuList, topMenuList } = useMenu()

        const { config } = storeToRefs(appStore)

        const refreshing = ref(false)
        const collapsed = ref(false)

        /**
         * 左侧菜单展开/收起
         */
        function handleCollapsed() {
            collapsed.value = !collapsed.value
        }

        /**
         * 返回
         */
        function handleBack() {
            router.back()
        }

        return {
            leftMenuList,
            topMenuList,
            collapsed,
            refreshing,
            config,
            handleCollapsed,
            handleBack,
        }
    },
}
</script>

<style lang="less" scoped>
.layout {
    min-height: 100vh;
}
</style>
