<template>
    <div
        class="x-filter-item"
        :class="{
            'x-filter-item--collapsible': cpCollapsible,
        }">
        <div
            class="x-filter-item__label"
            :style="{
                width: cpLabelWidth ? `${cpLabelWidth}px` : '',
            }">
            <slot name="label">{{ dataSource.label ?? label }}</slot>
            <template v-if="colon">：</template>
        </div>
        <div
            class="x-filter-item__content"
            ref="contentRef"
            :style="cpContentStyle">
            <div
                class="x-filter-item__content-inner"
                ref="contentInnerRef">
                <slot>
                    <filter-tag
                        :model-value="modelValue"
                        @change="onTagChange"></filter-tag>
                </slot>
            </div>
        </div>
        <div
            v-if="cpCollapsible"
            class="x-filter-item__collapse">
            <a @click="handleCollapse">
                <slot
                    name="collapse"
                    :collapsed="collapsed">
                    <template v-if="collapsed">收起</template>
                    <template v-else>展开</template>
                </slot>
            </a>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, useSlots, watchEffect } from 'vue'

import FilterTag from './FilterTag.vue'
import { useFilterItemDataSourceCtx, useInjectFilterCtx } from './context'

defineOptions({
    name: 'XFilterItem',
})

/**
 * @property {object | array | string | number} 当前输入值
 * @property {object} dataSource
 * @property {string | number} dataSource.label 名称，必填
 * @property {string | number} dataSource.key 索引，必填，多条件不允许重复
 * @property {boolean} dataSource.multiple 是否可以多选
 * @property {boolean} dataSource.toggle 切换选中/取消选中，仅限单选。默认：false
 * @property {boolean} dataSource.collapsible 是否可收起。默认：false
 * @property {boolean} dataSource.collapsed 当前收起状态。
 * @property {array} dataSource.options 选项列表
 * @property {string | number} dataSource.options.label 选项名称
 * @property {string | number} dataSource.options.value 选项值
 * @property {number} labelWidth 标签宽度，默认：80
 * @property {string} label label 标签内容
 */
const props = defineProps({
    modelValue: {
        type: [Object, Array, String, Number],
    },
    dataSource: {
        type: Object,
        default: () => ({}),
    },
    labelWidth: {
        type: Number,
        default: 80,
    },
    label: {
        type: String,
        default: '',
    },
})

useSlots(['default', 'label', 'collapse'])

const { labelWidth: _labelWidth, colon, onChange } = useInjectFilterCtx()
const curValue = ref({})
const contentRef = ref()
const contentInnerRef = ref()
const collapsed = ref(props.dataSource.collapsed)

const content = reactive({
    defaultHeight: null,
})
const contentInner = reactive({
    height: null,
})

const cpLabelWidth = computed(() => _labelWidth.value || props.labelWidth)
const cpCollapsible = computed(() => props.dataSource.collapsible && contentInner.height > content.defaultHeight)
const cpContentStyle = computed(() => {
    const styles = {
        height: '',
    }
    if (cpCollapsible.value) {
        if (collapsed.value) {
            styles.height = 'auto'
        } else {
            if (content.defaultHeight) {
                styles.height = `${content.defaultHeight}px`
            }
        }
    }
    return styles
})

watchEffect(() => {
    if (curValue.value === props.modelValue) return
    curValue.value = props.modelValue
})

useFilterItemDataSourceCtx(props.dataSource)

onMounted(async () => {
    await nextTick()
    content.defaultHeight = parseInt(window.getComputedStyle(contentRef.value).getPropertyValue('line-height'))
    contentInner.height = contentInnerRef.value.offsetHeight
})

/**
 * 展开/收起
 */
function handleCollapse() {
    collapsed.value = !collapsed.value
}

function onTagChange(value) {
    onChange(props.dataSource.key, value)
}
</script>

<style lang="less" scoped>
.x-filter {
    &-item {
        display: flex;
        padding: 8px 0;
        line-height: inherit;

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            padding-bottom: 0;
        }

        &:not(:last-child) {
            border-bottom: @color-split dashed 1px;
        }

        &__label {
            flex-shrink: 0;
            line-height: inherit;
        }

        &__content {
            flex: 1;
            margin-left: 8px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            line-height: inherit;
        }

        &__collapse {
            margin-left: 12px;
        }

        &--collapsible {
            .x-filter-item {
                &__content {
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
