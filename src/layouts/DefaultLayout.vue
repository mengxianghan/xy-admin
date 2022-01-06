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
            <a-layout-header :style="headerStyle">
                <x-layout-header :collapsed.sync="collapsed"></x-layout-header>
            </a-layout-header>
            <x-multi-tab></x-multi-tab>
            <a-layout-content :style="contentStyle">
                <keep-alive :include="cacheList">
                    <router-view v-if="keepAlive"
                                 :key="$route.name"/>
                </keep-alive>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import XLayoutHeader from '@/components/XLayoutHeader'
import XLayoutMenu from '@/components/XLayoutMenu'
import XMultiTab from '@/components/XMultiTab'
import {mapGetters} from 'vuex'

export default {
    name: 'DefaultLayout',
    components: {XMultiTab, XLayoutHeader, XLayoutMenu},
    data() {
        return {
            headerStyle: {
                background: '#ffffff',
                //boxShadow: '0 1px 4px rgba(0, 21, 41, .08)',
                padding: '0',
                position: 'sticky',
                top: '0',
                zIndex: 999,
                height: '48px'
            },
            siderStyle: {
                boxShadow: '2px 0 8px 0 rgb(29 35 41 / 5%)',
                position: 'relative',
                zIndex: 1000
            },
            contentStyle: {
                margin: '12px',
                minHeight: 'auto',
                position: 'relative'
            },
            footerStyle: {
                textAlign: 'center'
            },
            collapsible: false,
            collapsed: false,
            refreshing: false,
            theme: 'dark'
        }
    },
    computed: {
        ...mapGetters({
            cacheList: 'multiTab/cacheList',
            keepAlive: 'multiTab/keepAlive'
        })
    },
    methods: {
        handleToggleCollapsed() {
            this.collapsed = !this.collapsed
        }
    }
}
</script>

<style lang="less"
       scoped>
.ant-layout-sider {
    &.ant-layout-sider-light {
        ::v-deep {
            .x-layout-menu__logo {
                h1 {
                    color: @heading-color;
                }
            }
        }
    }
}
</style>
