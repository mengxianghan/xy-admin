<demo>
## 节点过滤
树节点可以过滤
</demo>

<!-- #region snippet -->
<template>
    <div>
        <div class="flex items-center gap-3 mb-2">
            <a-input
                v-model:value="keyword"
                :style="{ width: '240px' }"
                placeholder="请输入关键字"
                @change="onChange"></a-input>
            <span>
                筛选结果保留子节点：
                <a-switch v-model:checked="keepChildNodes"></a-switch>
            </span>
        </div>
        <x-tree
            :tree-data="treeData"
            :keep-child-nodes="keepChildNodes"
            :expanded-keys="expandedKeys"
            :filter-method="onFilterMethod"></x-tree>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Tree as XTree } from '@/components/index.js'
import { toList } from '@/utils/to'

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
    return keyword.value ? record.title.indexOf(keyword.value) !== -1 : true
}

function onChange() {
    if (keyword.value) {
        expandedKeys.value = toList(treeData.value).map((item) => item.key)
    } else {
        expandedKeys.value = []
    }
}
</script>

<style lang="less" scoped></style>
<!-- #endregion snippet -->
