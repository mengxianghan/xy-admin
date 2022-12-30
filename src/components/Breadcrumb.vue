<template>
    <a-breadcrumb class="x-breadcrumb">
        <a-breadcrumb-item
            v-for="(item, index) in list"
            :key="index"
            >{{ item.meta.title }}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
export default { name: 'XBreadcrumb' }
</script>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const list = computed(() => router.currentRoute.value?.meta?.breadcrumb)
</script>

<style lang="less" scoped>
.x-breadcrumb {
    height: 40px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: @padding-md;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
