<template>
    <div class="x-filter-tag">
        <slot>
            <filter-tag-item
                v-for="item in options"
                :key="item.value || item.label"
                :value="item.value">
                {{ item.label }}
            </filter-tag-item>
        </slot>
    </div>
</template>

<script setup>
import { find, get } from 'lodash-es'
import { computed, ref, useSlots, watch } from 'vue'

import FilterTagItem from './FilterTagItem.vue'
import { useFilterTagCtx, useFilterTagSelectedValueCtx, useInjectFilterItemDataSourceCtx } from './context'

/**
 * @property {array | string | number} modelValue
 */
const props = defineProps({
    modelValue: {
        type: [Array, String, Number],
    },
})

const emit = defineEmits(['update:modelValue', 'change'])

useSlots(['default'])

const { options, multiple, toggle } = useInjectFilterItemDataSourceCtx()

const curValue = ref()

const cpHasAll = computed(() => options.some((item) => item.isAll))
const cpAllOptionItem = computed(() => find(options, { isAll: true }))

watch(
    () => props.modelValue,
    (val) => {
        if (val === curValue.value) return
        curValue.value = val
    },
    { immediate: true }
)

useFilterTagCtx({
    multiple: computed(() => multiple),
    onTagClick,
})
useFilterTagSelectedValueCtx(curValue)

/**
 * 点击
 * @param {string | number} value
 */
function onTagClick({ value }) {
    const isAll = get(find(options, { value }), 'isAll', false)
    // 判断是否多选
    if (multiple) {
        // 多选
        curValue.value = curValue.value || []
        // 判断是否 “全部” 选项
        if (isAll) {
            // 是
            curValue.value = [cpAllOptionItem.value?.value]
        } else {
            // 不是“全部”选项，判断是否包含全部选项
            const allIndex = curValue.value.indexOf(cpAllOptionItem.value?.value)
            if (allIndex > -1) {
                // 将“全部”选项移除
                curValue.value.splice(allIndex, 1)
            }
            const index = curValue.value.indexOf(value)
            if (index > -1) {
                // 选中，从选中列表移除
                curValue.value.splice(index, 1)
            } else {
                // 未选中，添加到选中列表
                curValue.value.push(value)
            }
        }
        // 有“全部”选项 && 没有任何选中值
        if (cpHasAll.value && !curValue.value.length) {
            curValue.value = [cpAllOptionItem.value?.value]
        }
    } else {
        // 单选，判断是否 “全部” 选项
        if (isAll) {
            // 不是
            curValue.value = cpHasAll.value ? cpAllOptionItem.value?.value : ''
        } else {
            // 判断是否允许取消
            if (toggle) {
                // 允许取消，判断是否选中，并赋值
                curValue.value = curValue.value === value ? null : value
            } else {
                // 不允许取消
                curValue.value = value
            }
        }
        // 有“全部选项” && 没有任何选中值
        if (cpHasAll.value && ['', null, undefined].includes(curValue.value)) {
            curValue.value = cpAllOptionItem.value?.value
        }
    }
    trigger()
}

/**
 * 触发
 */
function trigger() {
    emit('update:modelValue', curValue.value)
    emit(
        'change',
        curValue.value,
        options.filter((item) => {
            if (multiple) {
                curValue.value = curValue.value || []
                return curValue.value.includes(item.value)
            } else {
                curValue.value === item.value
            }
        })
    )
}
</script>

<style lang="less" scoped>
.x-filter-tag {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
