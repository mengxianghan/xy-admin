<template>
    <div class="x-filter-tag">
        <slot>
            <filter-tag-item
                v-for="item in options"
                :key="item.value"
                :value="item.value">
                {{ item.label }}
            </filter-tag-item>
        </slot>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useFilterTagCtx, useFilterTagSelectedValueCtx } from './context'
import FilterTagItem from './FilterTagItem.vue'

/**
 * @property {array | string | number} modelValue
 * @property {array} options 标签选项
 * @property {string | number} options.label 显示的名称
 * @property {string | number} options.value 选中后的值
 * @property {boolean} multiple 是否多选，默认：false
 * @property {boolean} allowClear 是否允许取消，仅单选有效，多选默认支持取消，默认：false
 */
export default {
    name: 'XFilterTag',
    components: {
        FilterTagItem,
    },
    props: {
        modelValue: {
            type: [Array, String, Number],
        },
        options: {
            type: Array,
            default: () => [],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        allowClear: {
            type: Boolean,
            default: false,
        },
    },
    slots: ['default'],
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const curValue = ref()

        watch(
            () => props.modelValue,
            (val) => {
                if (val === curValue.value) return
                curValue.value = val
            },
            { immediate: true }
        )

        useFilterTagCtx({
            multiple: computed(() => props.multiple),
            onTagClick,
        })
        useFilterTagSelectedValueCtx(curValue)

        /**
         * 点击
         * @param {string | number} value
         */
        function onTagClick({ value }) {
            if (props.multiple) {
                curValue.value = curValue.value || []
                // 多选，判断是否选中
                const index = curValue.value.indexOf(value)
                if (index > -1) {
                    // 选中，从选中列表移除
                    curValue.value.splice(index, 1)
                } else {
                    // 未选中，添加到选中列表
                    curValue.value.push(value)
                }
            } else {
                // 单选，判断是否允许取消
                if (props.allowClear) {
                    // 允许取消，判断是否选中，并赋值
                    curValue.value = curValue.value === value ? null : value
                } else {
                    // 不允许取消
                    curValue.value = value
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
                props.options.filter((item) => {
                    if (props.multiple) {
                        curValue.value = curValue.value || []
                        return curValue.value.includes(item.value)
                    } else {
                        curValue.value === item.value
                    }
                })
            )
        }

        return {}
    },
}
</script>

<style lang="less" scoped>
.x-filter-tag {
    display: flex;
    flex-wrap: wrap;
    gap: @margin-xss @margin-xs;
}
</style>
