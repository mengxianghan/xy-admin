<template>
    <overlay-scrollbars-component
        ref="scrollbarRef"
        :style="cpStyle"
        :options="cpOptions"
        @os-scroll="onScroll"
        @os-initialized="onInitialized"
        @os-destroyed="onDestroyed"
        @os-updated="onUpdated">
        <slot></slot>
    </overlay-scrollbars-component>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
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

useSlots(['default'])

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

function scrollTo(payload) {
    scrollbarRef.value?.osInstance()?.elements()?.viewport?.scrollTo(payload)
}

defineExpose({
    scrollTo,
})
</script>

<style scoped lang="less"></style>
