<template>
    <grid-item
        :lg="lg"
        :md="md"
        :offset="offset"
        :sm="sm"
        :span="span"
        :suffix="suffix"
        :xl="xl"
        :xs="xs"
        :xxl="xxl"
        class="x-search-item">
        <a-form-item v-bind="attrs">
            <template
                v-for="(_, key) in slots"
                :key="key"
                v-slot:[key]="slotProps">
                <slot
                    :name="key"
                    v-bind="getSlotProps(slotProps)"></slot>
            </template>
        </a-form-item>
    </grid-item>
</template>

<script setup>
import { FormItem as AFormItem } from 'ant-design-vue'
import { getSlotProps } from '@/components/utils'
import { useAttrs, useSlots } from 'vue'
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
