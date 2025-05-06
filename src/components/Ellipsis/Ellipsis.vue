<script setup>
import { isEmpty } from '@/utils'
import { computed, nextTick, onMounted, onUpdated, ref, useSlots } from 'vue'

defineOptions({
  name: 'XEllipsis',
})

const props = defineProps({
  title: { type: String },
  lineClamp: { type: Number },
})

const slots = useSlots()

const ellipsisRef = ref()
const disabled = ref(true)

const isLineClampComputed = computed(() => props.lineClamp > 1)
const classComputed = computed(() => {
  return {
    'x-ellipsis--line-clamp': isLineClampComputed.value,
  }
})
const styleComputed = computed(() => {
  const style = {}

  if (isLineClampComputed.value) {
    style['-webkit-line-clamp'] = props.lineClamp
  }

  return style
})
const showTooltipComputed = computed(() => !isEmpty(props.title) || !!slots.title)

onMounted(() => {
  initialize()
})

onUpdated(() => {
  initialize()
})

async function initialize() {
  await nextTick()
  if (!ellipsisRef.value)
    return
  const scrollHeight = ellipsisRef.value.scrollHeight
  const scrollWidth = ellipsisRef.value.scrollWidth
  const height = ellipsisRef.value.clientHeight
  const width = ellipsisRef.value.clientWidth

  if (!showTooltipComputed.value) {
    disabled.value = true
    return
  }

  disabled.value = scrollHeight <= height && scrollWidth <= width
}
</script>

<template>
  <a-tooltip>
    <template
      v-if="!disabled"
      #title
    >
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <div
      ref="ellipsisRef"
      :class="classComputed"
      :style="styleComputed"
      class="x-ellipsis"
    >
      <slot />
    </div>
  </a-tooltip>
</template>

<style lang="less" scoped>
.x-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(.x-ellipsis--line-clamp) {
    white-space: nowrap;
  }

  &--line-clamp {
    display: -webkit-box;
    line-break: anywhere;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
  }
}
</style>
