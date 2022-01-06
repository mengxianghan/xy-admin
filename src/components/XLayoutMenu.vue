<template>
    <div class="x-layout-menu">
        <div class="x-layout-menu__logo">
            <img :src="require('@/assets/images/logo.png')">
            <h1>{{ title }}</h1>
        </div>
        <a-menu mode="inline"
                :theme="theme"
                :inline-collapsed="collapsed"
                :open-keys="openKeys"
                :selected-keys="selectedKeys"
                @openChange="onOpenChange">
            <template v-for="item in menus">
                <a-menu-item v-if="!item.children"
                             :key="item.name">
                    <x-custom-link :data-source="item"></x-custom-link>
                </a-menu-item>
                <x-sub-menu v-else
                            :key="item.name"
                            :menu-info="item"/>
            </template>
        </a-menu>
    </div>
</template>

<script>
import {Menu} from 'ant-design-vue'
import {mapGetters} from 'vuex'

const XCustomLink = {
    name: 'XCustomLink',
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        formatTo(value) {
            return {
                name: value.name,
                query: value?.meta?.query ?? {}
            }
        }
    },
    template: `
        <a v-if="dataSource.meta.type==='link'"
           :href="dataSource.path"
           :target="dataSource.meta.target"
           rel="opener">
        <a-icon v-if="dataSource.meta.icon"
                :type="dataSource.meta.icon"/>
        <span>{{ dataSource.meta.title }}</span>
        </a>
        <router-link v-else
                     :to="formatTo(dataSource)"
                     tag="a"
                     :target="dataSource.meta.target"
                     rel="opener">
        <a-icon v-if="dataSource.meta.icon"
                :type="dataSource.meta.icon"/>
        <span>{{ dataSource.meta.title }}</span>
        </router-link>
    `
}

const XSubMenu = {
    name: 'XSubMenu',
    components: {
        XCustomLink
    },
    template: `
        <a-sub-menu :key="menuInfo.name"
                    v-bind="$props"
                    v-on="$listeners">
        <template slot="title">
            <a-icon v-if="menuInfo.meta && menuInfo.meta.icon"
                    :type="menuInfo.meta.icon"/>
            <span>{{ menuInfo.meta.title }}</span>
        </template>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children"
                         :key="item.name">
                <x-custom-link :data-source="item"></x-custom-link>
            </a-menu-item>
            <x-sub-menu v-else
                        :key="item.name"
                        :menu-info="item"/>
        </template>
        </a-sub-menu>
    `,
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({})
        }
    }
}
export default {
    name: 'XLayoutMenu',
    components: {
        XSubMenu,
        XCustomLink
    },
    props: {
        theme: {
            type: String,
            default: 'dark'
        }
    },
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            collapsed: false,
            openKeys: [],
            selectedKeys: []
        }
    },
    computed: {
        ...mapGetters({
            menus: 'router/menus'
        }),
        rootSubmenuKeys() {
            return this.menus.map(item => item.name)
        }
    },
    watch: {
        '$route'() {
            this.setSelectedMenu()
        }
    },
    mounted() {
        this.setSelectedMenu()
    },
    methods: {
        /**
         * 设置选中菜单
         */
        setSelectedMenu() {
            const {name, meta} = this.$route || {}
            this.openKeys = meta?.openKeys || []
            this.selectedKeys = [meta?.active ?? name]
        },
        /**
         * SubMenu 展开/关闭的回调
         * @param openKeys
         */
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        }
    }
}
</script>

<style lang="less"
       scoped>
.x-layout-menu {
    &__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        white-space: nowrap;

        img {
            height: 32px;
            border-radius: 4px;
            display: none;
        }

        h1 {
            color: #ffffff;
            font-size: 20px;
            margin: 0;
            padding: 0 12px;
            text-overflow: ellipsis;
            overflow: hidden;
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

    ::v-deep {
        .ant-menu-submenu-title {
            display: flex;
            align-items: center;
        }
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
