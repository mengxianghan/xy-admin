<template>
    <a-layout class="layout">
        <template #default>
            <!-- 上下布局 -->
            <template v-if="config.layout === 'topBottom'">
                <!-- 侧边菜单 -->
                <template v-if="config.menuMode === 'side'">
                    <basic-header
                        :theme="config.headerTheme"
                        @config="$refs.configDialogRef.handleOpen()">
                        <template #left>
                            <brand :theme="config.headerTheme"></brand>
                        </template>
                    </basic-header>
                    <a-layout>
                        <basic-side
                            :theme="config.sideTheme"
                            :style="{
                                height: `calc(100vh - ${config.headerHeight}px)`,
                                top: `${config.headerHeight}px`,
                            }">
                            <basic-menu
                                :theme="config.sideTheme"
                                :data-list="sideMenuList"></basic-menu>
                        </basic-side>
                        <a-layout>
                            <multi-tab v-if="config.multiTab"></multi-tab>
                            <basic-content></basic-content>
                        </a-layout>
                    </a-layout>
                </template>

                <!-- 混合菜单 -->
                <template v-if="config.menuMode === 'mix'">
                    <basic-header
                        :theme="config.headerTheme"
                        @config="$refs.configDialogRef.handleOpen()">
                        <template #left>
                            <brand :theme="config.headerTheme"></brand>
                        </template>
                        <basic-menu
                            mode="horizontal"
                            :theme="config.headerTheme"
                            :data-list="topMenuList"></basic-menu>
                    </basic-header>
                    <a-layout>
                        <template v-if="sideMenuList.length">
                            <basic-side
                                :theme="config.sideTheme"
                                :style="{
                                    height: `calc(100vh - ${config.headerHeight}px)`,
                                    top: `${config.headerHeight}px`,
                                }">
                                <basic-menu
                                    :theme="config.sideTheme"
                                    :data-list="sideMenuList"></basic-menu>
                            </basic-side>
                        </template>
                        <a-layout>
                            <multi-tab v-if="config.multiTab"></multi-tab>
                            <basic-content></basic-content>
                        </a-layout>
                    </a-layout>
                </template>
            </template>

            <!-- 左右布局 -->
            <template v-if="config.layout === 'leftRight'">
                <!-- 侧边菜单 -->
                <template v-if="config.menuMode === 'side'">
                    <basic-side
                        :theme="config.sideTheme"
                        :style="{
                            height: `100vh`,
                            top: 0,
                        }">
                        <template #header>
                            <brand :theme="config.sideTheme"></brand>
                        </template>
                        <basic-menu
                            :theme="config.sideTheme"
                            :data-list="sideMenuList"></basic-menu>
                    </basic-side>
                    <a-layout>
                        <basic-header
                            :theme="config.headerTheme"
                            @config="$refs.configDialogRef.handleOpen()">
                        </basic-header>
                        <multi-tab v-if="config.multiTab"></multi-tab>
                        <basic-content></basic-content>
                    </a-layout>
                </template>
                <!-- 混合菜单 -->
                <template v-if="config.menuMode === 'mix'">
                    <basic-side
                        :theme="config.sideTheme"
                        :style="{
                            height: `100vh`,
                            top: 0,
                        }">
                        <template #header>
                            <brand :theme="config.sideTheme"></brand>
                        </template>
                        <basic-menu
                            :theme="config.sideTheme"
                            :data-list="sideMenuList"></basic-menu>
                    </basic-side>
                    <a-layout>
                        <basic-header
                            :theme="config.headerTheme"
                            @config="$refs.configDialogRef.handleOpen()">
                            <basic-menu
                                mode="horizontal"
                                :theme="config.headerTheme"
                                :data-list="topMenuList"></basic-menu>
                        </basic-header>
                        <multi-tab v-if="config.multiTab"></multi-tab>
                        <basic-content></basic-content>
                    </a-layout>
                </template>
            </template>

            <!-- 顶部菜单，不区分布局方式 -->
            <template v-if="config.menuMode === 'top'">
                <basic-header
                    :theme="config.headerTheme"
                    @config="$refs.configDialogRef.handleOpen()">
                    <template #left>
                        <brand :theme="config.headerTheme"></brand>
                    </template>
                    <basic-menu
                        mode="horizontal"
                        :theme="config.headerTheme"
                        :data-list="topMenuList"></basic-menu>
                </basic-header>
                <multi-tab v-if="config.multiTab"></multi-tab>
                <basic-content></basic-content>
            </template>
        </template>
    </a-layout>

    <config-dialog ref="configDialogRef"></config-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '@/store'
import useMultiTab from './hooks/useMultiTab'
import useMenu from './hooks/useMenu'
import BasicContent from './components/BasicContent.vue'
import BasicHeader from './components/BasicHeader.vue'
import BasicMenu from './components/BasicMenu.vue'
import BasicSide from './components/BasicSide.vue'
import Brand from './components/Brand.vue'
import MultiTab from './components/MultiTab.vue'
import ConfigDialog from './components/ConfigDialog.vue'

defineOptions({
    name: 'BasicLayout',
})

useMultiTab()
const appStore = useAppStore()
const { sideMenuList, topMenuList } = useMenu()

const { config } = storeToRefs(appStore)

const configDialogRef = ref()
</script>

<style lang="less" scoped>
.layout {
    min-height: 100vh;
}
</style>
