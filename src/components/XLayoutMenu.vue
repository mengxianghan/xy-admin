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
            <template v-for="item in menuList">
                <template v-if="item.meta.isMenu">
                    <a-menu-item v-if="!item.children"
                                 :key="item.name">
                        <x-custom-link :data-source="item"></x-custom-link>
                    </a-menu-item>
                    <x-sub-menu v-else
                                :key="item.name"
                                :menu-info="item"/>
                </template>
            </template>
        </a-menu>
    </div>
</template>

<script>
import {Menu} from 'ant-design-vue';
import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';

const XCustomLink = {
    name: 'XCustomLink',
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    template: `
        <a v-if="dataSource.meta.isUrl"
           :href="dataSource.path"
           :target="dataSource.meta.target"
           rel="opener">
        <a-icon v-if="dataSource.meta.icon"
                :type="dataSource.meta.icon"/>
        <span>{{ dataSource.meta.title }}</span>
        </a>
        <router-link v-else
                     :to="{
                        name: dataSource.name,
                        query: dataSource?.meta?.query ?? {}
                     }"
                     tag="a"
                     :target="dataSource.meta.target"
                     rel="opener">
        <a-icon v-if="dataSource.meta.icon"
                :type="dataSource.meta.icon"/>
        <span>{{ dataSource.meta.title }}</span>
        </router-link>
    `
};

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
            <template v-if="item.meta.isMenu">
                <a-menu-item v-if="!item.children"
                             :key="item.name">
                    <x-custom-link :data-source="item"></x-custom-link>
                </a-menu-item>
                <x-sub-menu v-else
                            :key="item.name"
                            :menu-info="item"/>
            </template>
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
};

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
    setup() {
        const store = useStore();
        const route = useRoute();
        const title = process.env.VUE_APP_TITLE;
        const collapsed = ref(false);
        const openKeys = ref([]);
        const selectedKeys = ref([]);
        const menuList = computed(() => store.getters['router/menuList']);
        const rootSubmenuKeys = computed(() => menuList.map(item => item.name));
        watch(route, () => setSelectedMenu());

        onMounted(() => {
            setSelectedMenu();
        });

        /**
         * 设置选中菜单
         */
        function setSelectedMenu() {
            const {name, meta} = route || {};
            openKeys.value = meta?.openKeys || [];
            selectedKeys.value = [meta?.active ?? name];
        }

        /**
         * SubMenu 展开/关闭的回调
         * @param value
         */
        function onOpenChange(value) {
            const latestOpenKey = value.find(key => openKeys.value.indexOf(key) === -1);
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                openKeys.value = value;
            } else {
                openKeys.value = latestOpenKey ? [latestOpenKey] : [];
            }
        }

        return {
            title,
            collapsed,
            openKeys,
            selectedKeys,
            onOpenChange
        };
    }
};
</script>

<style lang="scss"
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

    :deep(.ant-menu-submenu-title) {
        display: flex;
        align-items: center;
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
