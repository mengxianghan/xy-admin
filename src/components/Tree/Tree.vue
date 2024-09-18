<template>
    <div
        :class="{
            'x-tree--switcher': switcher,
        }"
        :style="cpStyles"
        ref="treeRef"
        class="x-tree">
        <template v-if="loaded">
            <a-tree
                :default-expand-all="defaultExpandAll"
                :tree-data="treeData"
                v-bind="attrs">
                <template
                    v-for="(_, key) in slots"
                    :key="key"
                    v-slot:[key]="slotProps">
                    <slot
                        :name="key"
                        v-bind="getSlotProps(slotProps)"></slot>
                </template>
            </a-tree>
        </template>
    </div>
</template>

<script setup>
import { useAttrs, useSlots, watch, ref, computed } from 'vue'
import { getSlotProps } from '@/components/utils/index.js'

defineOptions({
    name: 'XTree',
})

const props = defineProps({
    treeData: { type: Array, default: () => [] },
    defaultExpandAll: { type: Boolean, default: false },
    fieldNames: { type: Object, default: () => ({ children: 'children', title: 'title', key: 'key' }) },
    switcher: { type: Boolean, default: true },
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
    { immediate: true, deep: true }
)
</script>

<style lang="less" scoped>
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

    // 为了使 a-tree 组件与当前组件样式保持一致，非组件独有样式详见：@/styles/antd/tree.less
}
</style>
