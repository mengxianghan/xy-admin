<template>
    <a-breadcrumb class="x-breadcrumb">
        <a-breadcrumb-item
            v-for="item in breadcrumbData"
            :key="item.name">
            {{ item.meta.title }}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

defineOptions({
    name: 'XBreadcrumb',
})

const route = useRoute()

const breadcrumbData = ref([])

update()

onBeforeRouteUpdate((to) => {
    update(to)
})

function update(_route = route) {
    breadcrumbData.value = _route?.meta?.breadcrumb
}
</script>

<style lang="less" scoped>
.x-breadcrumb {
    background: #fff;
    display: flex;
    align-items: center;
}
</style>
