<template>
    <a v-if="dataSource.meta.type === 'link'"
       :href="dataSource.path"
       :target="dataSource.meta.target"
       rel="opener">
        <x-layout-menu-icon v-if="dataSource.meta.icon"
                            :name="dataSource.meta.icon"/>
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
        <x-layout-menu-icon v-if="dataSource.meta.icon"
                            :name="dataSource.meta.icon"/>
        <span>{{ dataSource.meta.title }}</span>
    </router-link>
</template>

<script>
export default {
    name: 'LayoutMenuLink',
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

<style lang="less"
       scoped>

</style>
