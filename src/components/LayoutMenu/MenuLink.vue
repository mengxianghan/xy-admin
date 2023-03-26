<template>
    <a
        v-if="dataSource.meta.type === 'link'"
        rel="opener"
        class="x-layout-menu__title"
        :href="dataSource.path"
        :target="dataSource.meta.target">
        <component
            v-if="dataSource.meta.icon"
            :is="dataSource.meta.icon" />
        <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
        <a-badge
            v-if="dataSource.meta.badge"
            class="x-layout-menu__badge"
            :count="dataSource.meta.badge" />
    </a>
    <router-link
        v-else
        rel="opener"
        class="x-layout-menu__title"
        :to="{
            name: dataSource.name,
            query: dataSource?.meta?.query ?? {},
        }"
        :target="dataSource.meta.target">
        <component
            v-if="dataSource.meta.icon"
            :is="dataSource.meta.icon" />
        <span class="x-layout-menu__text">{{ dataSource.meta.title }}</span>
        <a-badge
            v-if="dataSource.meta.badge"
            class="x-layout-menu__badge"
            :count="dataSource.meta.badge" />
    </router-link>
</template>

<script>
/**
 * @property {object} dataSource
 */
export default {
    name: 'MenuLink',
    props: {
        dataSource: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style lang="less" scoped></style>
