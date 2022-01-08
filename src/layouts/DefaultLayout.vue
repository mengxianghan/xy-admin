<template>
    <a-layout :style="{height:'100vh'}">
        <a-layout-sider
            :collapsed="collapsed"
            :collapsible="collapsible"
            breakpoint="lg"
            :theme="theme"
            :width="208"
            :style="siderStyle">
            <x-layout-menu :theme="theme"/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerStyle"
                             :theme="theme">
                <x-layout-header v-model:collapsed="collapsed"></x-layout-header>
            </a-layout-header>
            <x-multi-tab></x-multi-tab>
            <a-layout-content :style="contentStyle">
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
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import IframeView from '@/layouts/IframeView'

export default {
    name: 'DefaultLayout',
    components: {IframeView, XMultiTab, XLayoutHeader, XLayoutMenu},
    setup() {
        const store = useStore()
        const headerStyle = {
            background: '#fff',
            //boxShadow: '0 1px 4px rgba(0, 21, 41, .08)',
            padding: '0',
            position: 'sticky',
            top: '0',
            zIndex: 999,
            height: '48px',
        }
        const siderStyle = {
            boxShadow: '2px 0 8px 0 rgb(29 35 41 / 5%)',
            position: 'relative',
            zIndex: 1000,
        }
        const contentStyle = {
            margin: '12px',
            minHeight: 'auto',
            position: 'relative',
        }
        const footerStyle = {
            textAlign: 'center',
        }
        const collapsible = ref(false)
        const collapsed = ref(false)
        const refreshing = ref(false)
        const theme = 'dark'

        const cacheList = computed(() => store.getters['multiTab/cacheList'])
        const keepAlive = computed(() => store.getters['multiTab/keepAlive'])

        function handleToggleCollapsed() {
            this.collapsed = !this.collapsed
        }

        return {
            headerStyle,
            siderStyle,
            contentStyle,
            footerStyle,
            collapsible,
            collapsed,
            refreshing,
            theme,
            cacheList,
            keepAlive,
            handleToggleCollapsed,
        }
    },
}
</script>

<style lang="less"
       scoped>
</style>
