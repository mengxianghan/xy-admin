<template>
    <a-sub-menu
        class="sub-menu"
        :key="dataSource.name">
        <template
            v-if="dataSource.meta && dataSource.meta.icon"
            #icon>
            <component :is="dataSource.meta.icon" />
        </template>
        <template
            v-if="dataSource.meta && dataSource.meta.title"
            #title>
            <div class="menu__title">
                <span class="menu__text">{{ dataSource.meta.title }}</span>
                <a-badge
                    v-if="dataSource.meta.badge"
                    class="menu__badge"
                    :count="dataSource.meta.badge" />
            </div>
        </template>
        <template
            v-for="item in dataSource.children"
            :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name">
                    <menu-link :data-source="item" />
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :data-source="item" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script>
import MenuLink from './MenuLink.vue'

/**
 * @property {object} dataSource
 */
export default {
    name: 'SubMenu',
    components: { MenuLink },
    props: {
        dataSource: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style lang="less" scoped></style>
