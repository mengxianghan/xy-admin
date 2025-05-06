<script setup>
import { formatUnits } from '@/components/utils'
import { isObject } from '@/utils'
import { theme } from 'ant-design-vue'
import { some } from 'lodash-es'
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import { useGridProvide } from './context'

defineOptions({
  name: 'XGrid',
})
const props = defineProps({
  /**
   * 显示的栅格数量
   */
  columns: {
    type: [Number, Object],
    default: 24,
  },
  /**
   * 栅格间隔，可以写成像素值设置水平间隔 。或者使用数组形式同时设置 [水平间距, 垂直间距]
   */
  gutter: {
    type: [Number, Array],
    default: 0,
  },
  /**
   * 是否默认折叠
   */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /**
   * 默认展示的行数
   */
  collapsedRows: {
    type: Number,
    default: 1,
  },
})

const { token } = theme.useToken()

const children = ref({})
const curColumns = ref()

const gutterComputed = computed(() => (Array.isArray(props.gutter) ? props.gutter : String(props.gutter).split()))
const columnGapComputed = computed(() => {
  return gutterComputed.value?.[0] ?? 0
})
const rowGapComputed = computed(() => {
  return gutterComputed.value?.[1] ?? 0
})
const styleComputed = computed(() => {
  return {
    gridTemplateColumns: `repeat(${curColumns.value}, minmax(0, 1fr))`,
    gap: `${formatUnits(rowGapComputed.value)} ${formatUnits(columnGapComputed.value)}`,
  }
})

watchEffect(() => {
  const items = Object.values(children.value)
  const hasSuffix = some(items, o => o.props.suffix)
  let count = curColumns.value * props.collapsedRows
  if (hasSuffix) {
    count -= 1
  }
  items
    .filter(child => !child.props.suffix)
    .forEach((child, index) => {
      if (props.collapsed) {
        child.exposed.setShow(index < count)
      }
      else {
        child.exposed.setShow(true)
      }
    })
})

onResize()
window.addEventListener('resize', onResize)

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

function onResize() {
  if (isObject(props.columns)) {
    const clientWidth = document.body.clientWidth
    const { xs, sm, md, lg, xl, xxl } = props.columns
    if (clientWidth >= token.value.screenXXL && xxl) {
      curColumns.value = xxl
      return
    }
    if (clientWidth >= token.value.screenXL && xl) {
      curColumns.value = xl
      return
    }
    if (clientWidth >= token.value.screenLG && lg) {
      curColumns.value = lg
      return
    }
    if (clientWidth >= token.value.screenMD && md) {
      curColumns.value = md
      return
    }
    if (clientWidth >= token.value.screenSM && sm) {
      curColumns.value = sm
      return
    }
    if (clientWidth < token.value.screenSM && xs) {
      curColumns.value = xs
      return
    }
  }
  curColumns.value = props.columns
}

function addChild(child) {
  children.value[child.uid] = child
}

function removeChild(child) {
  delete children.value[child.uid]
}

useGridProvide({
  columnGap: computed(() => columnGapComputed.value),
  columns: computed(() => curColumns.value),
  collapsed: computed(() => props.collapsed),
  collapsedRows: computed(() => props.collapsedRows),
  children: computed(() => children.value),
  addChild,
  removeChild,
})
</script>

<template>
  <div
    :style="styleComputed"
    class="x-grid"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
.x-grid {
  display: grid;
}
</style>
