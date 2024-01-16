<template>
    <a-card
        class="x-search"
        :class="{
            'x-search--bordered': bordered,
        }">
        <a-form
            layout="inline"
            v-bind="attrs">
            <grid
                :columns="columns"
                :gutter="gutter"
                :collapsed="collapsed"
                :collapsed-rows="collapsedRows">
                <slot></slot>
            </grid>
        </a-form>
    </a-card>
</template>

<script setup>
import { useAttrs } from 'vue'
import { Grid } from '../Grid'

defineOptions({
    name: 'XSearch',
})

defineProps({
    columns: {
        type: [Number, Object],
        default: 4,
    },
    collapsed: Boolean,
    collapsedRows: Number,
    gutter: {
        type: [Number, Array],
        default: () => [12, 12],
    },
    bordered: {
        type: Boolean,
        default: true,
    },
})

const attrs = useAttrs()
</script>

<style lang="less" scoped>
.x-search {
    &:not(.x-search-bordered) {
        border: none;

        :deep(> .ant-card-body) {
            padding: 0;
        }
    }

    :deep(.ant-form-inline) {
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

    :deep(.ant-form-row) {
        flex-flow: row nowrap;
    }
}
</style>
