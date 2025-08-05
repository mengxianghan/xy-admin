<demo>
## 基础用法
重写了样式、拓展了属性
</demo>

<!-- #region snippet -->
<script setup>
import { ref } from 'vue'
import { Tree as XTree } from '@/components/index.js'

const defaultExpandAll = ref(false)
const blockNode = ref(false)
const checkable = ref(false)
const switcher = ref(true)
const treeData = ref([
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
])
</script>

<template>
  <div>
    <div class="mb-4 flex items-center gap-3 flex-wrap">
      <div>
        默认展开：
        <a-switch v-model:checked="defaultExpandAll" />
      </div>
      <div>
        节点占一行：
        <a-switch v-model:checked="blockNode" />
      </div>
      <div>
        显示复选框：
        <a-switch v-model:checked="checkable" />
      </div>
      <div>
        显示 switcher：
        <a-switch v-model:checked="switcher" />
      </div>
    </div>
    <x-tree
      :block-node="blockNode"
      :checkable="checkable"
      :default-expand-all="defaultExpandAll"
      :switcher="switcher"
      :tree-data="treeData"
    />
  </div>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
