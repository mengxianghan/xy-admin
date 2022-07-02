<template>
    <a-sub-menu :key="dataSource.name"
                class="x-menu-sub">
        <template v-if="dataSource.meta && dataSource.meta.icon"
                  #icon>
            <component :is="dataSource.meta.icon"/>
        </template>
        <template v-if="dataSource.meta && dataSource.meta.title"
                  #title>
            <div class="x-layout-menu__title">
                <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
                <a-badge v-if="dataSource.meta.badge"
                         :count="dataSource.meta.badge"
                         class="x-layout-menu__badge"/>
            </div>
        </template>
        <template v-for="item in dataSource.children">
            <a-menu-item v-if="!item.children"
                         :key="item.name">
                <menu-link :data-source="item"/>
            </a-menu-item>
            <menu-sub v-else
                      :key="item.name"
                      :data-source="item"/>
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
    components: {MenuLink},
    props: {
        dataSource: {
            type: Object,
            default: () => ({}),
        },
    },
    setup() {
    },
}
</script>

<style lang="less"
       scoped>
</style>
