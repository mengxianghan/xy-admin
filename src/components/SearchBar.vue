<template>
    <a-card
        v-bind="cptAttrs"
        class="x-search-bar">
        <slot></slot>
    </a-card>
</template>

<script>
export default {
    name: 'XSearchBar',
}
</script>

<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const cptAttrs = computed(() => ({
    bordered: false,
    ...attrs,
}))
</script>

<style lang="less" scoped>
.x-search-bar {
    :deep(.ant-card-body) {
        padding-bottom: 4px;
    }

    :deep(.ant-form) {
        display: block;
    }

    :deep(.ant-form-inline .ant-form-item) {
        margin-right: 0;
        margin-bottom: 12px;
    }

    :deep(.ant-form-item-control-input-content) {
        > * {
            width: 100%;
        }
    }
}
</style>
