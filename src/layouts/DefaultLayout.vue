<template>
    <a-layout class="layout">
        <a-layout-sider
            :collapsed="collapsed"
            :collapsible="collapsible"
            breakpoint="lg"
            :theme="theme"
            :width="208"
            class="layout-sider">
            <x-layout-menu :theme="theme"/>
        </a-layout-sider>
        <a-layout class="layout-main">
            <a-layout-header :theme="theme"
                             class="layout-header">
                <x-layout-header v-model:collapsed="collapsed"></x-layout-header>
            </a-layout-header>
            <x-multi-tab></x-multi-tab>
            <a-layout-content class="layout-content">
                <a-breadcrumb v-if="breadcrumb.length > 1 && pageType!=='iframe'"
                              class="mb-4-3">
                    <a-breadcrumb-item v-for="(item, index) in breadcrumb"
                                       :key="index">{{ item.meta.title }}
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <router-view v-slot="{ Component }">
                    <keep-alive :include="cacheList">
                        <component v-if="keepAlive"
                                   :is="Component"
                                   :key="$route.name"/>
                    </keep-alive>
                </router-view>
                <iframe-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import XLayoutHeader from '@/components/XLayoutHeader'
import XLayoutMenu from '@/components/XLayoutMenu/XLayoutMenu'
import XMultiTab from '@/components/XMultiTab'
import IframeView from '@/layouts/IframeView'
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter, onBeforeRouteUpdate} from 'vue-router'

export default {
    name: 'DefaultLayout',
    components: {IframeView, XMultiTab, XLayoutHeader, XLayoutMenu},
    setup() {
        const store = useStore()
        const router = useRouter()
        const collapsible = ref(false)
        const collapsed = ref(false)
        const refreshing = ref(false)
        const theme = 'dark'
        const cacheList = computed(() => store.getters['multiTab/cacheList'])
        const keepAlive = computed(() => store.getters['multiTab/keepAlive'])
        const breadcrumb = computed(() => router.currentRoute.value?.meta?.breadcrumb)
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
            breadcrumb,
            pageType,
            handleToggleCollapsed,
        }
    },
}
</script>

<style lang="less"
       scoped>
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
        margin: @margin-sm;
        min-height: auto;
        position: relative;
    }
}
</style>
