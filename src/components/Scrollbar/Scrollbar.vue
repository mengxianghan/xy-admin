<template>
    <overlay-scrollbars-component
        ref="scrollbarRef"
        :style="cpStyle"
        :options="cpOptions"
        @os-scroll="onScroll">
        <slot></slot>
    </overlay-scrollbars-component>
</template>

<script setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'
import { computed, ref, useSlots } from 'vue'

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

const emit = defineEmits(['scroll'])

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
    emit('scroll', instance, event)
}

function formatUnit(value) {
    return undefined !== value && '' !== value && /.*\d$/.test(value) ? `${value}px` : value
}

function scrollTo(payload) {
    scrollbarRef.value?.osInstance()?.elements()?.viewport?.scrollTo(payload)
}

defineExpose({
    scrollTo,
    instance: scrollbarRef.value,
})
</script>

<style scoped lang="less"></style>
