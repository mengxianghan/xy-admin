<template>
    <a-card
        class="x-search-bar"
        v-bind="cpAttrs">
        <slot
            :gutter="gutter"
            :col-span="colSpan"></slot>
    </a-card>
</template>

<script setup>
import { computed, useAttrs, useSlots, ref } from 'vue'

defineOptions({
    name: 'XSearchBar',
})

/**
 * 搜索条
 */
useSlots(['default'])

const gutter = ref([16, 12])
const colSpan = ref({ sm: 24, md: 24, xl: 8 })

const attrs = useAttrs()

const cpAttrs = computed(() => ({
    bordered: false,
    ...attrs,
}))
</script>

<style lang="less" scoped>
.x-search-bar {
    :deep(.ant-form) {
        display: block;
    }

    :deep(.ant-form-inline .ant-form-item) {
        margin-right: 0;
        margin-bottom: 0;
    }

    :deep(.ant-form-item-control-input-content) {
        > * {
            width: 100%;
        }
    }
}
</style>
