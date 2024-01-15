<template>
    <div
        class="x-grid-item"
        ref="gridItemRef"
        v-show="show"
        :style="styleComputed">
        <slot :overflow="overflowComputed"></slot>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import { useGridInject } from './context'
import { findLast } from 'lodash-es'

defineOptions({
    name: 'XGridItem',
})
const props = defineProps({
    span: {
        type: Number,
        default: 1,
    },
    offset: {
        type: Number,
        default: 0,
    },
    suffix: {
        type: Boolean,
        default: false,
    },
})

const { columnGap, columns, addChild, removeChild, collapsed, collapsedRows, children } = useGridInject()

const currentInstance = getCurrentInstance()

const gridItemRef = ref()
const show = ref(true)

const styleComputed = computed(() => {
    const span = props.span + props.offset
    const styles = {
        gridColumn: `span ${span} / span ${span}`,
    }
    const lastSuffix = findLast(Object.values(children.value), (o) => o.props.suffix)
    if (props.suffix && lastSuffix.uid === currentInstance.uid) {
        styles.gridColumn = `${columns.value} / span ${span}`
    }
    if (props.offset) {
        styles.marginLeft = `calc(${(100 / span) * props.offset}% + ${(columnGap.value / span) * props.offset}px)`
    }
    return styles
})
const overflowComputed = computed(() => {
    return collapsed.value ? Object.values(children.value)?.length > collapsedRows.value * columns.value : false
})

addChild(currentInstance)

onBeforeUnmount(() => {
    removeChild(currentInstance)
})

function setShow(value) {
    show.value = value
}

defineExpose({
    setShow,
})
</script>

<style lang="less" scoped></style>
