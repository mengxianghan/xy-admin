<template>
    <div class="x-layout-menu"
         :class="classes">
        <div class="x-layout-menu__brand">
            <img :src="require('@/assets/logo.png')">
            <h1>{{ title }}</h1>
        </div>
        <a-menu mode="inline"
                :theme="theme"
                :inline-collapsed="collapsed"
                :open-keys="openKeys"
                :selected-keys="selectedKeys"
                @openChange="onOpenChange">
            <template v-for="item in menuList">
                <a-menu-item v-if="!item.children"
                             :key="item.name">
                    <layout-menu-link :data-source="item"/>
                </a-menu-item>
                <layout-menu-sub v-else
                                 :key="item.name"
                                 :data-source="item"/>
            </template>
        </a-menu>
    </div>
</template>

<script>
import LayoutMenuLink from './LayoutMenuLink'
import LayoutMenuSub from './LayoutMenuSub'
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
    name: 'LayoutMenu',
    components: {LayoutMenuLink, LayoutMenuSub},
    props: {
        theme: {
            type: String,
            default: 'dark',
        },
    },
    setup(props) {
        const store = useStore()
        const route = useRoute()
        const {theme} = toRefs(props)
        const title = process.env.VUE_APP_TITLE
        const collapsed = ref(false)
        const openKeys = ref([])
        const selectedKeys = ref([])
        const menuList = computed(() => store.getters['router/menuList'])
        const rootSubmenuKeys = computed(() => menuList.value.map(item => item.name))
        const classes = computed(() => {
            const classList = []
            classList.push(`x-layout-menu--${theme.value}`)
            return classList
        })
        watch(route, () => setSelectedMenu())

        onMounted(() => {
            setSelectedMenu()
        })

        /**
         * 设置选中菜单
         */
        function setSelectedMenu() {
            const {name, meta} = route || {}
            openKeys.value = meta?.openKeys || []
            selectedKeys.value = [meta?.active ?? name]
        }

        /**
         * SubMenu 展开/关闭的回调
         * @param value
         */
        function onOpenChange(value) {
            const latestOpenKey = value.find(key => openKeys.value.indexOf(key) === -1)
            if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
                openKeys.value = value
            } else {
                openKeys.value = latestOpenKey ? [latestOpenKey] : []
            }
        }

        return {
            title,
            collapsed,
            openKeys,
            selectedKeys,
            menuList,
            classes,
            onOpenChange,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-layout-menu {

    &__brand {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        white-space: nowrap;
        position: relative;
        z-index: 10;

        img {
            height: 32px;
            border-radius: 4px;
            display: none;
        }

        h1 {
            font-size: 18px;
            margin: 0;
            padding: 0 12px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    &--dark {
        h1 {
            color: #fff;
        }
    }

    &--light {
        box-shadow: 0 0 0 1px @border-color-split;

        .x-layout-menu__brand {
            box-shadow: 0 0 0 1px @border-color-split;
        }

        h1 {
            color: #222;
        }
    }

    .ant-menu {
        height: calc(100vh - 48px);
        overflow: hidden;
        overflow-y: auto;
        border: none;
    }

    .ant-menu-item {
        a {
            display: flex;
            align-items: center;
        }
    }

    :deep(.ant-menu-submenu-title) {
        display: flex;
        align-items: center;
    }

    :deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title),
    :deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item) {
        padding: 0 @padding-md;
    }
}

.ant-layout-sider-collapsed {
    .x-layout-menu {
        &__logo {

            img {
                display: block;
            }

            h1 {
                display: none;
            }
        }
    }
}
</style>
