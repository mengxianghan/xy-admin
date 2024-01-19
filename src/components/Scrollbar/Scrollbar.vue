<template>
    <overlay-scrollbars-component
        ref="scrollbarRef"
        :options="cpOptions"
        :style="cpStyle"
        @os-scroll="onScroll"
        @os-initialized="onInitialized"
        @os-destroyed="onDestroyed"
        @os-updated="onUpdated">
        <slot></slot>
    </overlay-scrollbars-component>
</template>

<script setup>
import { computed, ref } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'

defineOptions({
    name: 'XScrollbar',
})

const props = defineProps({
    height: {
        type: [Number, String],
        default: '100%',
    },
    maxHeight: {
        type: [Number, String],
    },
    always: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['scroll', 'initialized', 'updated', 'destroyed'])

const scrollbarRef = ref()

const cpStyle = computed(() => {
    return {
        height: formatUnit(props.height),
        maxHeight: formatUnit(props.maxHeight),
    }
})
const cpOptions = computed(() => ({
    scrollbars: {
        autoHide: props.always ? 'never' : 'leave',
        autoHideDelay: 100,
    },
}))

function onScroll(instance, event) {
    emits('scroll', instance, event)
}

/**
 * 已初始化
 * @param {*} instance
 */
function onInitialized(instance) {
    emits('initialized', instance)
}

/**
 * 已更新
 * @param {*} instance
 */
function onUpdated(instance) {
    emits('updated', instance)
}

/**
 * 已销毁
 * @param {*} instance
 */
function onDestroyed(instance) {
    emits('destroyed', instance)
}

function formatUnit(value) {
    return undefined !== value && '' !== value && /.*\d$/.test(value) ? `${value}px` : value
}

/**
 * 滚动到
 * @param {number} payload.left
 * @param {number} payload.top
 */
function scrollTo(payload) {
    scrollbarRef.value?.osInstance()?.elements()?.viewport?.scrollTo(payload)
}

/**
 * Y 轴滚动条位置
 * @param {number} value
 */
function setScrollTop(value) {
    scrollTo({ top: value })
}

/**
 * X 轴滚动条位置
 * @param {number} value
 */
function setScrollLeft(value) {
    scrollTo({ left: value })
}

defineExpose({
    scrollTo,
    setScrollTop,
    setScrollLeft,
})
</script>

<style lang="less" scoped></style>
