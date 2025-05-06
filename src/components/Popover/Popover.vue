<script setup>
import {
  autoPlacement as floatingAutoPlacement,
  computePosition as floatingComputePosition,
  hide as floatingHide,
  offset as floatingOffset,
} from '@floating-ui/dom'
import { isObject } from 'lodash-es'
import { ref } from 'vue'

const props = defineProps({
  reference: { type: Object, required: true },
  options: { type: Object },
  content: { type: [String, Number, Object], default: '' },
  delayHide: { type: Function, default: () => {}, required: true },
  clearHideTimer: { type: Function, default: () => {}, required: true },
})

const popoverRef = ref(null)
const popoverStyles = ref({})

function handleShow() {
  const middleware = []
  const { offset, hide, autoPlacement, placement } = props.options

  if (offset) {
    middleware.push(floatingOffset(offset))
  }

  if (hide) {
    middleware.push(floatingHide(hide))
  }

  if (autoPlacement) {
    middleware.push(floatingAutoPlacement(autoPlacement))
  }

  floatingComputePosition(props.reference, popoverRef.value, {
    placement,
    middleware,
  }).then((instance) => {
    const { x, y, strategy } = instance
    popoverStyles.value = {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
    }
  })
}

function handleHide() {}

function onMouseenter() {
  props.clearHideTimer(props.options.key)
}

function onMouseleave() {
  props.delayHide(props.options)
}

defineExpose({
  handleShow,
  handleHide,
})
</script>

<template>
  <div
    ref="popoverRef"
    :style="popoverStyles"
    class="x-popover"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <template v-if="isObject(content)">
      <component :is="content" />
    </template>
    <template v-else>
      {{ content }}
    </template>
  </div>
</template>

<style lang="less" scoped>
.x-popover {
  width: max-content;
  position: absolute;
  z-index: 9999;
}
</style>
