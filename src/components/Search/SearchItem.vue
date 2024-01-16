<template>
    <grid-item
        class="x-search-item"
        :span="span"
        :xs="xs"
        :sm="sm"
        :md="md"
        :lg="lg"
        :xl="xl"
        :xxl="xxl"
        :offset="offset"
        :suffix="suffix">
        <a-form-item v-bind="attrs">
            <template
                v-for="(_, key) in slots"
                v-slot:[key]="slotProps"
                :key="key">
                <slot
                    v-bind="getSlotProps(slotProps)"
                    :name="key"></slot>
            </template>
        </a-form-item>
    </grid-item>
</template>

<script setup>
import { FormItem as AFormItem } from 'ant-design-vue'
import { getSlotProps } from '@/components/utils'
import { useSlots, useAttrs } from 'vue'
import { GridItem } from '../Grid'

defineOptions({
    name: 'XSearchItem',
})

defineProps({
    span: Number,
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    xl: Number,
    xxl: Number,
    offset: Number,
    suffix: Boolean,
})

const slots = useSlots()
const attrs = useAttrs()
</script>

<style lang="less" scoped></style>
