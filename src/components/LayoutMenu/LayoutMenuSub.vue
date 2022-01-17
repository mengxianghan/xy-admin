<template>
    <a-sub-menu :key="dataSource.name">
        <template v-if="dataSource.meta && dataSource.meta.icon"
                  #icon>
            <layout-menu-icon :name="dataSource.meta.icon"></layout-menu-icon>
        </template>
        <template v-if="dataSource.meta && dataSource.meta.title"
                  #title>
            <span>{{ dataSource.meta.title }}</span>
        </template>
        <template v-for="item in dataSource.children">
            <a-menu-item v-if="!item.children"
                         :key="item.name">
                <layout-menu-link :data-source="item"/>
            </a-menu-item>
            <layout-menu-sub v-else
                               :key="item.name"
                               :data-source="item"/>
        </template>
    </a-sub-menu>
</template>

<script>
import LayoutMenuIcon from './LayoutMenuIcon'
import LayoutMenuLink from './LayoutMenuLink'

export default {
    name: 'LayoutMenuSub',
    components: {LayoutMenuIcon, LayoutMenuLink},
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
