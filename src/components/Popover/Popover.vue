<template>
    <div
        class="x-popover"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave">
        <template v-if="isObject(content)">
            <component :is="content"></component>
        </template>
        <template v-else>{{ content }}</template>
    </div>
</template>

<script setup>
import { isObject } from '@/utils/is'

const props = defineProps({
    reference: { type: Object, required: true },
    options: { type: Object },
    content: { type: [String, Number, Object], default: '' },
    delayHide: { type: Function, default: () => {}, required: true },
    clearHideTimer: { type: Function, default: () => {}, required: true },
})

function onMouseenter() {
    props.clearHideTimer(props.options.key)
}

function onMouseleave() {
    props.delayHide(props.options)
}
</script>

<style lang="less" scoped>
.x-popover {
    width: max-content;
    position: absolute;
    z-index: 9999;
}
</style>
