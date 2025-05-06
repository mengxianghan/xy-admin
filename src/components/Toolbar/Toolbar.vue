<script setup>
import { createReusableTemplate } from '@vueuse/core'
import { computed, useSlots } from 'vue'

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

<template>
  <div class="x-toolbar">
    <define-template>
      <a-row class="x-toolbar">
        <a-col flex="1">
          <slot />
        </a-col>
        <a-col v-if="cpShowExtra">
          <slot name="extra" />
        </a-col>
      </a-row>
    </define-template>

    <template v-if="bordered">
      <a-card>
        <reuse-template />
      </a-card>
    </template>
    <template v-else>
      <reuse-template />
    </template>
  </div>
</template>

<style lang="less" scoped></style>
