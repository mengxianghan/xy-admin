<template>
    <div
        class="x-grid"
        :style="styleComputed">
        <slot></slot>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import { formatUnits } from '@/components/utils'
import { useGridProvide } from './context'
import { some } from 'lodash-es'
import { theme } from 'ant-design-vue'
import { isObject } from '@/utils/is'

defineOptions({
    name: 'XGrid',
})
const props = defineProps({
    columns: {
        type: [Number, Object],
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

const { token } = theme.useToken()

const children = ref({})
const curColumns = ref()

const gutterComputed = computed(() => (Array.isArray(props.gutter) ? props.gutter : String(props.gutter).split()))
const columnGapComputed = computed(() => {
    return gutterComputed.value?.[0] ?? 0
})
const rowGapComputed = computed(() => {
    return gutterComputed.value?.[1] ?? 0
})
const styleComputed = computed(() => {
    return {
        gridTemplateColumns: `repeat(${curColumns.value}, minmax(0, 1fr))`,
        gap: `${formatUnits(rowGapComputed.value)} ${formatUnits(columnGapComputed.value)}`,
    }
})

watchEffect(() => {
    const items = Object.values(children.value)
    const hasSuffix = some(items, (o) => o.props.suffix)
    let count = curColumns.value * props.collapsedRows
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

onResize()
window.addEventListener('resize', onResize)

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

function onResize() {
    if (isObject(props.columns)) {
        const clientWidth = document.body.clientWidth
        const { xs, sm, md, lg, xl, xxl } = props.columns
        if (clientWidth >= token.value.screenXXL && xxl) {
            curColumns.value = xxl
            return
        }
        if (clientWidth >= token.value.screenXL && xl) {
            curColumns.value = xl
            return
        }
        if (clientWidth >= token.value.screenLG && lg) {
            curColumns.value = lg
            return
        }
        if (clientWidth >= token.value.screenMD && md) {
            curColumns.value = md
            return
        }
        if (clientWidth >= token.value.screenSM && sm) {
            curColumns.value = sm
            return
        }
        if (clientWidth < token.value.screenSM && xs) {
            curColumns.value = xs
            return
        }
    }
    curColumns.value = props.columns
}

function addChild(child) {
    children.value[child.uid] = child
}

function removeChild(child) {
    delete children.value[child.uid]
}

useGridProvide({
    columnGap: computed(() => columnGapComputed.value),
    columns: computed(() => curColumns.value),
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
