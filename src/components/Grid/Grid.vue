<template>
    <div
        class="x-grid"
        :style="styleComputed">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { formatUnits } from '@/components/utils'
import { useGridProvide } from './context'
import { some } from 'lodash-es'

defineOptions({
    name: 'XGrid',
})
const props = defineProps({
    columns: {
        type: Number,
        default: 24,
    },
    gutter: {
        type: [Number, Array],
        default: 0,
    },
    collapsed: {
        type: Boolean,
        default: false,
    },
    collapsedRows: {
        type: Number,
        default: 1,
    },
})

const children = ref({})

const gutterComputed = computed(() => (Array.isArray(props.gutter) ? props.gutter : String(props.gutter).split()))
const columnGapComputed = computed(() => {
    return gutterComputed.value?.[0] ?? 0
})
const rowGapComputed = computed(() => {
    return gutterComputed.value?.[1] ?? 0
})
const styleComputed = computed(() => {
    return {
        gridTemplateColumns: `repeat(${props.columns}, minmax(0px, 1fr))`,
        gap: `${formatUnits(rowGapComputed.value)} ${formatUnits(columnGapComputed.value)}`,
    }
})

watch([() => children.value, () => props.collapsed, () => props.collapsedRows], () => {
    const items = Object.values(children.value)
    const hasSuffix = some(items, (o) => o.props.suffix)
    let count = props.columns * props.collapsedRows
    if (hasSuffix) {
        count -= 1
    }
    items
        .filter((child) => !child.props.suffix)
        .forEach((child, index) => {
            if (props.collapsed) {
                child.exposed.setShow(index < count)
            } else {
                child.exposed.setShow(true)
            }
        })
})

function addChild(child) {
    children.value[child.uid] = child
}

function removeChild(child) {
    delete children.value[child.uid]
}

useGridProvide({
    columnGap: computed(() => columnGapComputed.value),
    columns: computed(() => props.columns),
    collapsed: computed(() => props.collapsed),
    collapsedRows: computed(() => props.collapsedRows),
    children: computed(() => children.value),
    addChild,
    removeChild,
})
</script>

<style lang="less" scoped>
.x-grid {
    display: grid;
}
</style>
