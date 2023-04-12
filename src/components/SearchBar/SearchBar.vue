<template>
    <a-card
        class="x-search-bar"
        v-bind="cpAttrs">
        <slot></slot>
    </a-card>
</template>

<script>
import { computed, useAttrs } from 'vue'

/**
 * 搜索条
 */
export default {
    name: 'XSearchBar',
    props: {},
    slots: ['default'],
    setup() {
        const attrs = useAttrs()

        const cpAttrs = computed(() => ({
            bordered: false,
            ...attrs,
        }))

        return {
            cpAttrs,
        }
    },
}
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
