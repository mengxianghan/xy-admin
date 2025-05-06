<script setup>
import { getSlotProps } from '@/components/utils'
import { FormItem as AFormItem } from 'ant-design-vue'
import { useSlots } from 'vue'

defineOptions({
  name: 'XFilterItem',
})

const slots = useSlots()
</script>

<template>
  <a-form-item class="x-filter-item">
    <template
      v-for="(_, key) in slots"
      :key="key"
      #[key]="slotProps"
    >
      <slot
        :name="key"
        v-bind="getSlotProps(slotProps)"
      />
    </template>
  </a-form-item>
</template>

<style lang="less" scoped></style>
