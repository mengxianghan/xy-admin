<script setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { computed, ref } from 'vue'
import 'overlayscrollbars/overlayscrollbars.css'

defineOptions({
  name: 'XScrollbar',
})

const props = defineProps({
  /**
   * 容器高度
   */
  height: {
    type: [Number, String],
    default: '100%',
  },
  /**
   * 最大高度
   */
  maxHeight: {
    type: [Number, String],
  },
  /**
   * 是否一直显示滚动条，为 false 时，仅滑过容器时显示
   */
  always: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['scroll', 'initialized', 'updated', 'destroyed'])

const scrollbarRef = ref()

const cpStyle = computed(() => {
  return {
    height: formatUnit(props.height),
    maxHeight: formatUnit(props.maxHeight),
  }
})
const cpOptions = computed(() => ({
  scrollbars: {
    autoHide: props.always ? 'never' : 'leave',
    autoHideDelay: 100,
  },
}))

function onScroll(instance, event) {
  emit('scroll', instance, event)
}

/**
 * 已初始化
 * @param {*} instance
 */
function onInitialized(instance) {
  emit('initialized', instance)
}

/**
 * 已更新
 * @param {*} instance
 */
function onUpdated(instance) {
  emit('updated', instance)
}

/**
 * 已销毁
 * @param {*} instance
 */
function onDestroyed(instance) {
  emit('destroyed', instance)
}

function formatUnit(value) {
  return undefined !== value && value !== '' && /.*\d$/.test(value) ? `${value}px` : value
}

/**
 * 滚动到
 * @param {number} payload.left
 * @param {number} payload.top
 */
function scrollTo(payload) {
  scrollbarRef.value?.osInstance()?.elements()?.viewport?.scrollTo(payload)
}

/**
 * Y 轴滚动条位置
 * @param {number} value
 */
function setScrollTop(value) {
  scrollTo({ top: value })
}

/**
 * X 轴滚动条位置
 * @param {number} value
 */
function setScrollLeft(value) {
  scrollTo({ left: value })
}

defineExpose({
  scrollTo,
  setScrollTop,
  setScrollLeft,
})
</script>

<template>
  <overlay-scrollbars-component
    ref="scrollbarRef"
    :options="cpOptions"
    :style="cpStyle"
    @os-scroll="onScroll"
    @os-initialized="onInitialized"
    @os-destroyed="onDestroyed"
    @os-updated="onUpdated"
  >
    <slot />
  </overlay-scrollbars-component>
</template>

<style lang="less" scoped></style>
