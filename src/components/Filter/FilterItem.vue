<template>
    <a-form-item class="x-filter-item">
        <template
            v-for="(_, key) in slots"
            :key="key"
            v-slot:[key]="slotProps">
            <slot
                :name="key"
                v-bind="getSlotProps(slotProps)"></slot>
        </template>
    </a-form-item>
</template>

<script setup>
import { FormItem as AFormItem } from 'ant-design-vue'
import { getSlotProps } from '@/components/utils'
import { useSlots } from 'vue'

defineOptions({
    name: 'XFilterItem',
})

const slots = useSlots()
</script>

<style lang="less" scoped></style>
