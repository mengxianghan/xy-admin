<template>
    <a-sub-menu
        class="x-menu-sub"
        :key="dataSource.name">
        <template
            v-if="dataSource.meta && dataSource.meta.icon"
            #icon>
            <component :is="dataSource.meta.icon" />
        </template>
        <template
            v-if="dataSource.meta && dataSource.meta.title"
            #title>
            <div class="x-layout-menu__title">
                <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
                <a-badge
                    v-if="dataSource.meta.badge"
                    :count="dataSource.meta.badge"
                    class="x-layout-menu__badge" />
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
                <menu-sub :data-source="item" />
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
    name: 'MenuSub',
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
