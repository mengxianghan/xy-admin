<template>
    <a-row class="x-action-bar">
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
    name: 'XActionBar',
})

const slots = useSlots(['default', 'extra'])

const cpShowExtra = computed(() => !!slots.extra)
</script>

<style lang="less" scoped></style>
