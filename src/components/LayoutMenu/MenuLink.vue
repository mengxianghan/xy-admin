<template>
    <a v-if="dataSource.meta.type === 'link'"
       :href="dataSource.path"
       :target="dataSource.meta.target"
       rel="opener"
       class="x-layout-menu__title">
        <component v-if="dataSource.meta.icon"
                   :is="dataSource.meta.icon" />
        <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
        <a-badge v-if="dataSource.meta.badge"
                 :count="dataSource.meta.badge"
                 class="x-layout-menu__badge" />
    </a>
    <router-link v-else
                 :to="{
                     name: dataSource.name,
                     query: dataSource?.meta?.query ?? {}
                 }"
                 tag="a"
                 :target="dataSource.meta.target"
                 rel="opener"
                 class="x-layout-menu__title">
        <component v-if="dataSource.meta.icon"
                   :is="dataSource.meta.icon" />
        <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
        <a-badge v-if="dataSource.meta.badge"
                 :count="dataSource.meta.badge"
                 class="x-layout-menu__badge" />
    </router-link>
</template>

<script>
export default { name: 'MenuLink' }
</script>

<script setup>
/**
 * @property {object} dataSource
 */

const props = defineProps({
    dataSource: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<style lang="less" scoped>

</style>
