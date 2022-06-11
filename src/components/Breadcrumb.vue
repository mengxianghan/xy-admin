<template>
    <a-breadcrumb class="x-breadcrumb">
        <a-breadcrumb-item v-for="(item, index) in list"
                           :key="index">{{ item.meta.title }}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'XBreadcrumb',
    setup() {
        const router = useRouter()
        const list = computed(() => router.currentRoute.value?.meta?.breadcrumb)
        return {
            list,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-breadcrumb {
    height: 40px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: @padding-md;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}
</style>
