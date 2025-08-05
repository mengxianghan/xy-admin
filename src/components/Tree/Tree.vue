<script setup>
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
import { getSlotProps } from '@/components/utils'
import { filterTree } from '@/utils'

defineOptions({
  name: 'XTree',
})

const props = defineProps({
  treeData: { type: Array, default: () => [] },
  defaultExpandAll: { type: Boolean, default: false },
  fieldNames: { type: Object, default: () => ({ children: 'children', title: 'title', key: 'key' }) },
  switcher: { type: Boolean, default: true },
  filterMethod: { type: Function, default: () => true },
  keepChildNodes: { type: Boolean, default: true }, // 筛选时是否保留子节点
})
const slots = useSlots()
const attrs = useAttrs()

const treeRef = ref()
const loaded = ref(true)

const cpStyles = computed(() => {
  const style = {}
  const treeRect = treeRef.value?.getBoundingClientRect?.()

  if (treeRect && !loaded.value) {
    style.height = `${treeRect.height}px`
  }

  return style
})
const cpTreeData = computed(() => {
  return filterTree(props.treeData, props.filterMethod, props.keepChildNodes)
})

watch(
  [() => props.defaultExpandAll, () => props.treeData],
  () => {
    if (props.defaultExpandAll && !attrs['expanded-keys']?.length) {
      loaded.value = false
      setTimeout(() => {
        loaded.value = true
      }, 1)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    ref="treeRef"
    :class="{
      'x-tree--switcher': switcher,
    }"
    :style="cpStyles"
    class="x-tree"
  >
    <template v-if="loaded">
      <a-tree
        :default-expand-all="defaultExpandAll"
        :tree-data="cpTreeData"
        v-bind="attrs"
      >
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
      </a-tree>
    </template>
  </div>
</template>

<style lang="less" scoped>
// 为了使 a-tree 组件与当前组件样式保持一致，部分样式详见：@/styles/antd/tree.less
.x-tree {
  &.x-tree--switcher {
    :deep(.ant-tree .ant-tree-switcher) {
      display: flex;
    }
  }

  :deep(.ant-tree) {
    .ant-tree-switcher {
      display: none;
    }
  }
}
</style>
