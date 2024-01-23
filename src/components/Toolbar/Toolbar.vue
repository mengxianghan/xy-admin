<template>
    <a-row class="x-toolbar">
        <a-col flex="1">
            <slot></slot>
        </a-col>
        <a-col v-if="cpShowExtra">
            <slot name="extra"></slot>
        </a-col>
    </a-row>
</template>

<script setup>
import { computed, useSlots } from 'vue'

defineOptions({
    name: 'XToolbar',
})

const slots = useSlots()

const cpShowExtra = computed(() => !!slots.extra)
</script>

<style lang="less" scoped></style>
