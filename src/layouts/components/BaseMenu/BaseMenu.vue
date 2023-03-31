<template>
    <a-menu
        class="menu"
        :theme="theme"
        :mode="mode"
        :inline-collapsed="collapsed"
        :open-keys="cpOpenKeys"
        :selected-keys="selectedKeys"
        @openChange="onOpenChange">
        <template
            v-for="item in dataList"
            :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name">
                    <menu-link
                        :data-source="item"
                        @combination="handleCombination" />
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :data-source="item" />
            </template>
        </template>
    </a-menu>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ICON_LOGO } from '@/config'

import MenuLink from './MenuLink.vue'
import SubMenu from './SubMenu.vue'

/**
 * @property {string} theme 主题，【dark=暗色，light=亮色】
 * @property {string} mode 菜单类型，【vertical=垂直，horizontal=水平，inline=内嵌】
 * @property {array} dataList 数据
 */
export default {
    name: 'BaseMenu',
    components: {
        MenuLink,
        SubMenu,
    },
    props: {
        theme: {
            type: String,
            default: 'dark',
        },
        mode: {
            type: String,
            default: 'inline',
        },
        dataList: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const route = useRoute()

        const title = import.meta.env.VITE_TITLE

        const collapsed = ref(false)
        const openKeys = ref([])
        const selectedKeys = ref([])

        const cpIsHorizontal = computed(() => props.mode === 'horizontal')
        const rootSubmenuKeys = computed(() => props.dataList.map((item) => item.name))
        const cpOpenKeys = computed(() => {
            if (cpIsHorizontal.value) {
                return []
            }
            return openKeys.value
        })

        watch(route, () => setSelectedMenu())

        onMounted(() => {
            setSelectedMenu()
        })

        function handleCombination({ name }) {
            selectedKeys.value = [name]
        }

        /**
         * 设置选中菜单
         */
        function setSelectedMenu() {
            const { meta } = route || {}
            openKeys.value = meta?._openKeys || []
            selectedKeys.value = meta._breadcrumb.map((item) => item?.meta?.active || item.name)
        }

        /**
         * SubMenu 展开/关闭的回调
         * @param value
         */
        function onOpenChange(value) {
            if (cpIsHorizontal.value) return
            const latestOpenKey = value.find((key) => openKeys.value.indexOf(key) === -1)
            if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
                openKeys.value = value
            } else {
                openKeys.value = latestOpenKey ? [latestOpenKey] : []
            }
        }

        return {
            title,
            collapsed,
            ICON_LOGO,
            cpOpenKeys,
            handleCombination,
            selectedKeys,
            onOpenChange,
        }
    },
}
</script>

<style lang="less" scoped>
.menu {
    :deep(.menu__title) {
        display: flex;
        align-items: center;

        .anticon {
            display: inline-flex;
        }
    }

    :deep(.menu__text) {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    :deep(.menu__badge) {
        .ant-badge-count,
        .ant-badge-dot {
            box-shadow: none;
        }
    }

    &.ant-menu-inline {
        border-right: none;

        :deep(.ant-menu-item) {
            width: 100%;
        }
    }

    &.ant-menu-horizontal {
        :deep(.menu__badge) {
            margin-left: @margin-xs;
        }

        :deep(.ant-menu-submenu) {
            padding: 0 @padding-md;
        }

        :deep(.ant-menu-submenu::after),
        :deep(.ant-menu-submenu-selected::after) {
            left: @padding-md;
            right: @padding-md;
        }

        :deep(> .ant-menu-item a::before) {
            bottom: 0;
        }

        &.ant-menu-dark {
            :deep(.ant-menu-submenu-selected) {
                background: @primary-color;
            }
        }
    }
}
</style>
