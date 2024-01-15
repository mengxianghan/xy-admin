<template>
    <a-card
        class="x-search"
        :class="{
            'x-search--bordered': bordered,
        }">
        <a-form
            class="x-search__form"
            layout="inline"
            v-bind="attrs"
            :style="formStyleComputed">
            <slot></slot>
            <x-search-item :style="suffixStyleComputed">
                <slot name="suffix"> </slot>
            </x-search-item>
        </a-form>
    </a-card>
</template>

<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
    name: 'XSearch',
})

defineProps({
    bordered: {
        type: Boolean,
        default: true,
    },
})

const attrs = useAttrs()

const formStyleComputed = computed(() => {
    return {
        gridTemplateColumns: `repeat(4, minmax(0px, 1fr))`,
        gap: `12px`,
    }
})
const suffixStyleComputed = computed(() => {
    return {
        gridColumn: `3 / span 2`,
    }
})
</script>

<style lang="less" scoped>
.x-search {
    &:not(.x-search-bordered) {
        border: none;

        :deep(> .ant-card-body) {
            padding: 0;
        }
    }

    &__form {
        display: grid;
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
