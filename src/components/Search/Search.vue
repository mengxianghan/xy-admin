<template>
    <div class="x-search">
        <define-template>
            <a-form
                layout="inline"
                v-bind="attrs">
                <grid
                    :collapsed="collapsed"
                    :collapsed-rows="collapsedRows"
                    :columns="columns"
                    :gutter="gutter">
                    <slot></slot>
                </grid>
            </a-form>
        </define-template>

        <template v-if="bordered">
            <a-card>
                <reuse-template></reuse-template>
            </a-card>
        </template>
        <template v-else>
            <reuse-template></reuse-template>
        </template>
    </div>
</template>

<script setup>
import { useAttrs } from 'vue'
import { Grid } from '../Grid'
import { createReusableTemplate } from '@vueuse/core'

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
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<style lang="less" scoped>
.x-search {
    :deep(.ant-form-inline) {
        display: block;
    }

    :deep(.ant-form-inline .ant-form-item) {
        margin-right: 0;
        margin-bottom: 0;
    }

    :deep(.ant-form-item-control-input-content) {
        > .ant-input,
        > .ant-select,
        > .ant-picker {
            width: 100%;
        }
    }
}
</style>
