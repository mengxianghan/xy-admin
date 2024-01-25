<template>
    <div class="x-toolbar">
        <define-template>
            <a-row class="x-toolbar">
                <a-col flex="1">
                    <slot></slot>
                </a-col>
                <a-col v-if="cpShowExtra">
                    <slot name="extra"></slot>
                </a-col>
            </a-row>
        </define-template>

        <template v-if="bordered">
            <a-card>
                <reuse-template></reuse-template>
            </a-card>
        </template>
        <template v-else>
            <reuse-template></reuse-template>
        </template>
    </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { createReusableTemplate } from '@vueuse/core'

defineOptions({
    name: 'XToolbar',
})

defineProps({
    bordered: {
        type: Boolean,
        default: false,
    },
})

const slots = useSlots()

const cpShowExtra = computed(() => !!slots.extra)
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<style lang="less" scoped></style>
