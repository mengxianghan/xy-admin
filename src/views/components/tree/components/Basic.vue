<demo>
## 基础用法
重写了样式、拓展了属性
</demo>

<!-- #region snippet -->
<template>
    <div>
        <a-flex
            :gap="12"
            class="mb-4"
            wrap="wrap">
            <div>
                默认展开：
                <a-switch v-model:checked="defaultExpandAll"></a-switch>
            </div>
            <div>
                节点占一行：
                <a-switch v-model:checked="blockNode"></a-switch>
            </div>
            <div>
                显示复选框：
                <a-switch v-model:checked="checkable"></a-switch>
            </div>
            <div>
                显示 switcher：
                <a-switch v-model:checked="switcher"></a-switch>
            </div>
        </a-flex>
        <x-tree
            :block-node="blockNode"
            :checkable="checkable"
            :default-expand-all="defaultExpandAll"
            :switcher="switcher"
            :tree-data="treeData">
        </x-tree>
    </div>
</template>

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

<style lang="less" scoped></style>
<!-- #endregion snippet -->
