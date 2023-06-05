<template>
    <a-layout class="layout">
        <template #default>
            <!-- 侧边菜单 -->
            <template v-if="config.menuMode === 'side'">
                <basic-side
                    v-model:collapsed="collapsed"
                    :theme="config.sideTheme">
                    <basic-menu
                        :data-list="sideMenuList"
                        :theme="config.sideTheme"></basic-menu>
                </basic-side>
                <a-layout>
                    <basic-header
                        class="pr-8-2"
                        :theme="config.headerTheme"
                        @setting="handleSetting">
                        <template #left>
                            <a-space :size="0">
                                <action-button @click="handleCollapsed">
                                    <template #icon>
                                        <component
                                            :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
                                            :style="{ fontSize: '14px' }"></component>
                                    </template>
                                </action-button>
                                <action-button @click="handleBack">
                                    <template #icon>
                                        <rollback-outlined :style="{ fontSize: '14px' }"></rollback-outlined>
                                    </template>
                                </action-button>
                            </a-space>
                        </template>
                    </basic-header>
                    <multi-tab v-show="config.multiTab"></multi-tab>
                    <basic-content></basic-content>
                </a-layout>
            </template>

            <!-- 顶部菜单 -->
            <template v-if="config.menuMode === 'top'">
                <basic-header
                    class="px-8-2"
                    :theme="config.headerTheme"
                    @setting="handleSetting">
                    <template #left>
                        <logo-card
                            class="mr-8-2"
                            :theme="config.headerTheme"></logo-card>
                    </template>
                    <basic-menu
                        mode="horizontal"
                        :data-list="topMenuList"
                        :theme="config.headerTheme"></basic-menu>
                </basic-header>
                <multi-tab v-show="config.multiTab"></multi-tab>
                <basic-content></basic-content>
            </template>

            <!-- 混合菜单 -->
            <template v-if="config.menuMode === 'mix'">
                <basic-header
                    class="pr-8-2"
                    :theme="config.headerTheme"
                    @setting="handleSetting">
                    <template #left>
                        <logo-card
                            :theme="config.headerTheme"
                            :style="{ width: `${config.sideWidth}px` }"></logo-card>
                    </template>
                    <basic-menu
                        mode="horizontal"
                        :data-list="topMenuList"
                        :theme="config.headerTheme"></basic-menu>
                </basic-header>
                <a-layout>
                    <basic-side
                        v-if="sideMenuList.length"
                        :theme="config.sideTheme"
                        :show-header="false"
                        :style="{
                            top: `${config.headerHeight}px`,
                            height: `calc(100vh - ${config.headerHeight}px)`,
                        }">
                        <basic-menu
                            :theme="config.sideTheme"
                            :data-list="sideMenuList"></basic-menu>
                    </basic-side>
                    <a-layout>
                        <multi-tab v-show="config.multiTab"></multi-tab>
                        <basic-content></basic-content>
                    </a-layout>
                </a-layout>
            </template>
        </template>
    </a-layout>

    <global-setting-dialog ref="globalSettingDialogRef"></global-setting-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { RollbackOutlined } from '@ant-design/icons-vue'
import useMenu from './hooks/useMenu'
import MultiTab from './components/MultiTab.vue'
import ActionButton from './components/ActionButton.vue'
import BasicHeader from './components/BasicHeader.vue'
import BasicSide from './components/BasicSide.vue'
import BasicContent from './components/BasicContent.vue'
import BasicMenu from './components/BasicMenu/BasicMenu.vue'
import LogoCard from './components/LogoCard.vue'
import GlobalSettingDialog from './components/GlobalSettingDialog.vue'

defineOptions({
    name: 'BasicLayout',
})

const appStore = useAppStore()
const router = useRouter()
const { sideMenuList, topMenuList } = useMenu()

const { config } = storeToRefs(appStore)

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
</script>

<style lang="less" scoped>
.layout {
    min-height: 100vh;
}
</style>
