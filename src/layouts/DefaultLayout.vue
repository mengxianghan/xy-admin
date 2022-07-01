<template>
    <a-layout class="layout">
        <a-layout-sider :collapsed="collapsed"
                        :collapsible="collapsible"
                        :collapsed-width="48"
                        breakpoint="lg"
                        :theme="theme"
                        :width="208"
                        class="layout-sider">
            <x-layout-menu :theme="theme" />
        </a-layout-sider>
        <a-layout class="layout-main">
            <a-layout-header :theme="theme"
                             class="layout-header">
                <x-layout-header v-model:collapsed="collapsed"></x-layout-header>
            </a-layout-header>
            <!--多标签页，建议和面包屑二选一-->
            <x-multi-tab />
            <!--面包屑-->
            <!--<x-breadcrumb/>-->
            <a-layout-content class="layout-content">
                <router-view v-slot="{ Component }">
                    <keep-alive :include="cacheList">
                        <component v-if="keepAlive"
                                   :is="Component"
                                   :key="$route.name" />
                    </keep-alive>
                </router-view>
                <iframe-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useMultiTabStore } from '@/store'

import IframeView from '@/layouts/IframeView'

export default {
    name: 'DefaultLayout',
    components: { IframeView },
    setup() {
        const multiTabStore = useMultiTabStore()
        const collapsible = ref(false)
        const collapsed = ref(false)
        const refreshing = ref(false)
        const theme = 'dark'
        const cacheList = computed(() => multiTabStore.cacheList)
        const keepAlive = computed(() => multiTabStore.keepAlive)
        const pageType = ref('')

        onBeforeRouteUpdate((to) => {
            pageType.value = to?.meta?.type
        })

        function handleToggleCollapsed() {
            collapsed.value = !collapsed.value
        }

        return {
            collapsible,
            collapsed,
            refreshing,
            theme,
            cacheList,
            keepAlive,
            pageType,
            handleToggleCollapsed,
        }
    },
}
</script>

<style lang="less" scoped>
.layout {
    height: 100vh;

    &-sider {
        box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
        position: relative;
        z-index: 1000;

        &.ant-layout-sider-collapsed {
            :deep(.x-layout-menu__brand) {
                h1 {
                    display: none;
                }

                img {
                    display: block;
                }
            }
        }
    }

    &-main {
        overflow: hidden;
        overflow-y: auto;
    }

    &-header {
        background: #fff;
        //boxShadow: 0 1px 4px rgba(0, 21, 41, .08),
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 999;
        height: 48px;
    }

    &-content {
        margin: @margin-md;
        min-height: auto;
        position: relative;
    }
}
</style>
