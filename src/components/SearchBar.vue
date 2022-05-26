<template>
    <a-card v-bind="attrsComp"
            class="x-search-bar">
        <slot></slot>
    </a-card>
</template>

<script>
import { computed } from 'vue'

export default {
    name: 'XSearchBar',
    setup(props, { attrs }) {
        const attrsComp = computed(() => ({
            bordered: false,
            ...attrs
        }))

        return {
            attrsComp
        }
    },
}
</script>

<style lang="less"
       scoped>
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
        >* {
            width: 100%;
        }
    }
}
</style>
