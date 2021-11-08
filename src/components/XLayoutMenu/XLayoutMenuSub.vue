<template>
    <a-sub-menu :key="dataSource.name">
        <template v-if="dataSource.meta && dataSource.meta.icon"
                  #icon>
            <x-layout-menu-icon :name="dataSource.meta.icon"></x-layout-menu-icon>
        </template>
        <template v-if="dataSource.meta && dataSource.meta.title"
                  #title>
            <span>{{ dataSource.meta.title }}</span>
        </template>
        <template v-for="item in dataSource.children">
            <template v-if="item.meta.isMenu">
                <a-menu-item v-if="!item.children"
                             :key="item.name">
                    <x-layout-menu-link :data-source="item"/>
                </a-menu-item>
                <x-layout-menu-sub v-else
                                   :key="item.name"
                                   :data-source="item"/>
            </template>
        </template>
    </a-sub-menu>
</template>

<script>
import XLayoutMenuLink from './XLayoutMenuLink'
import XLayoutMenuIcon from './XLayoutMenuIcon'

export default {
    name: 'XLayoutMenuSub',
    components: {XLayoutMenuLink, XLayoutMenuIcon},
    props: {
        dataSource: {
            type: Object,
            default: () => ({})
        }
    },
    setup() {
    }
}
</script>

<style lang="scss"
       scoped>

</style>
