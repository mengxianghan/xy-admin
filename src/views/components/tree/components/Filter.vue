<demo>
## 节点过滤
树节点可以过滤
</demo>

<!-- #region snippet -->
<script setup>
import { Tree as XTree } from '@/components/index.js'
import { tree2list } from '@/utils'
import { ref } from 'vue'

const keyword = ref('')
const keepChildNodes = ref(false)
const expandedKeys = ref([])
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

function onFilterMethod(record) {
  return keyword.value ? record.title.includes(keyword.value) : true
}

function onChange() {
  if (keyword.value) {
    expandedKeys.value = tree2list(treeData.value).map(item => item.key)
  }
  else {
    expandedKeys.value = []
  }
}
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-2">
      <a-input
        v-model:value="keyword"
        :style="{ width: '240px' }"
        placeholder="请输入关键字"
        @change="onChange"
      />
      <span>
        筛选结果保留子节点：
        <a-switch v-model:checked="keepChildNodes" />
      </span>
    </div>
    <x-tree
      :tree-data="treeData"
      :keep-child-nodes="keepChildNodes"
      :expanded-keys="expandedKeys"
      :filter-method="onFilterMethod"
    />
  </div>
</template>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
