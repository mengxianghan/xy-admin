<template>
    <div
        v-show="show"
        ref="gridItemRef"
        :class="{
            'x-grid-item--suffix': suffix,
        }"
        :style="styleComputed"
        class="x-grid-item">
        <slot :overflow="overflowComputed"></slot>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, onBeforeUnmount, ref, toRefs, watch } from 'vue'
import { useGridInject } from './context'
import { findLast } from 'lodash-es'
import { theme } from 'ant-design-vue'

defineOptions({
    name: 'XGridItem',
})
const props = defineProps({
    span: { type: Number, default: 1 },
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    xl: Number,
    xxl: Number,
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
const { token } = theme.useToken()

const currentInstance = getCurrentInstance()

const gridItemRef = ref()
const show = ref(true)
const curSpan = ref(props.span)

const styleComputed = computed(() => {
    let span = curSpan.value + props.offset
    if (span > columns.value) {
        span = columns.value
    }
    const styles = {
        gridColumn: `span ${span} / span ${span}`,
    }
    const lastSuffix = findLast(Object.values(children.value), (o) => o.props.suffix)
    if (props.suffix && lastSuffix.uid === currentInstance.uid) {
        let cls = columns.value
        if (span > 1 && span <= columns.value) {
            cls = columns.value - span + 1
        }
        styles.gridColumn = `${cls} / span ${span}`
    }
    if (props.offset) {
        styles.marginLeft = `calc(${(100 / span) * props.offset}% + ${(columnGap.value / span) * props.offset}px)`
    }
    return styles
})
const overflowComputed = computed(() => {
    return collapsed.value ? Object.values(children.value)?.length > collapsedRows.value * columns.value : false
})

watch(
    () => toRefs(props),
    () => {
        onResize()
    }
)

init()

onBeforeUnmount(() => {
    removeChild(currentInstance)
    window.removeEventListener('resize', onResize)
})

function init() {
    addChild(currentInstance)
    onResize()
    window.addEventListener('resize', onResize)
}

function setShow(value) {
    show.value = value
}

function onResize() {
    const clientWidth = document.body.clientWidth
    if (clientWidth >= token.value.screenXXL && props.xxl) {
        curSpan.value = props.xxl
        return
    }
    if (clientWidth >= token.value.screenXL && props.xl) {
        curSpan.value = props.xl
        return
    }
    if (clientWidth >= token.value.screenLG && props.lg) {
        curSpan.value = props.lg
        return
    }
    if (clientWidth >= token.value.screenMD && props.md) {
        curSpan.value = props.md
        return
    }
    if (clientWidth >= token.value.screenSM && props.sm) {
        curSpan.value = props.sm
        return
    }
    if (clientWidth < token.value.screenSM && props.xs) {
        curSpan.value = props.xs
        return
    }
    if (props.span) {
        curSpan.value = props.span
    }
}

defineExpose({
    setShow,
})
</script>

<style lang="less" scoped></style>
