<template>
    <div class="x-search-item">
        <a-form-item>
            <template
                v-for="(_, key) in slots"
                v-slot:[key]="slotProps"
                :key="key">
                <slot
                    v-bind="getSlotProps(slotProps)"
                    :name="key"></slot>
            </template>
        </a-form-item>
    </div>
</template>

<script setup>
import { FormItem as AFormItem } from 'ant-design-vue'
import { getSlotProps } from '@/components/utils'
import { useSlots } from 'vue'

defineOptions({
    name: 'XSearchItem',
})

const slots = useSlots()
</script>

<style lang="less" scoped></style>
