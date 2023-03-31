<template>
    <a-layout class="layout">
        <template #default>
            <!-- 侧边菜单 -->
            <template v-if="config.menuMode === 'side'">
                <base-side
                    v-model:collapsed="collapsed"
                    :theme="config.sideTheme">
                    <base-menu
                        :data-list="sideMenuList"
                        :theme="config.sideTheme"></base-menu>
                </base-side>
                <a-layout>
                    <base-header
                        class="pr-8-2"
                        :theme="config.headerTheme"
                        @setting="handleSetting">
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
                    <multi-tab v-if="config.multiTab"></multi-tab>
                    <base-content></base-content>
                </a-layout>
            </template>

            <!-- 顶部菜单 -->
            <template v-if="config.menuMode === 'top'">
                <base-header
                    class="px-8-2"
                    :theme="config.headerTheme"
                    @setting="handleSetting">
                    <template #left>
                        <logo-card :theme="config.headerTheme"></logo-card>
                    </template>
                    <base-menu
                        mode="horizontal"
                        :data-list="topMenuList"
                        :theme="config.headerTheme"></base-menu>
                </base-header>
                <multi-tab v-if="config.multiTab"></multi-tab>
                <base-content></base-content>
            </template>

            <!-- 混合菜单 -->
            <template v-if="config.menuMode === 'mix'">
                <base-header
                    class="pr-8-2"
                    :theme="config.headerTheme"
                    @setting="handleSetting">
                    <template #left>
                        <logo-card
                            :theme="config.sideTheme"
                            :style="{ width: `${config.sideWidth}px` }"></logo-card>
                    </template>
                    <base-menu
                        mode="horizontal"
                        :data-list="topMenuList"
                        :theme="config.headerTheme"></base-menu>
                </base-header>
                <a-layout>
                    <base-side
                        v-if="sideMenuList.length"
                        :theme="config.sideTheme"
                        :show-header="false"
                        :style="{
                            top: `${config.headerHeight}px`,
                            height: `calc(100vh - ${config.headerHeight}px)`,
                        }">
                        <base-menu
                            :theme="config.sideTheme"
                            :data-list="sideMenuList"></base-menu>
                    </base-side>
                    <a-layout>
                        <multi-tab v-if="config.multiTab"></multi-tab>
                        <base-content></base-content>
                    </a-layout>
                </a-layout>
            </template>
        </template>
    </a-layout>

    <global-setting-dialog ref="globalSettingDialogRef"></global-setting-dialog>
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
import GlobalSettingDialog from './components/GlobalSettingDialog.vue'

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
        GlobalSettingDialog,
    },
    setup() {
        const appStore = useAppStore()
        const router = useRouter()
        const { sideMenuList, topMenuList } = useMenu()

        const { config } = storeToRefs(appStore)

        const refreshing = ref(false)
        const collapsed = ref(false)
        const globalSettingDialogRef = ref()

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

        /**
         * 设置
         */
        function handleSetting() {
            globalSettingDialogRef.value.handleOpen()
        }

        return {
            sideMenuList,
            topMenuList,
            collapsed,
            refreshing,
            config,
            globalSettingDialogRef,
            handleCollapsed,
            handleBack,
            handleSetting,
        }
    },
}
</script>

<style lang="less" scoped>
.layout {
    min-height: 100vh;
}
</style>
