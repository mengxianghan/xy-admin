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
                        :options="dataSource.options"
                        :multiple="dataSource.multiple"
                        :allow-clear="dataSource.allowClear"
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

<script>
import { computed, ref, watchEffect, nextTick, onMounted, reactive } from 'vue'
import { useInjectFilterCtx } from './context'
import FilterTag from './FilterTag.vue'

/**
 * @property {object | array | string | number} 当前输入值
 * @property {object} dataSource
 * @property {string | number} dataSource.label 名称，必填
 * @property {string | number} dataSource.key 索引，必填，多条件不允许重复
 * @property {boolean} dataSource.multiple 是否可以多选
 * @property {boolean} dataSource.allowClear 是否可以清除，仅限单选。默认：false
 * @property {boolean} dataSource.collapsible 是否可收起。默认：false
 * @property {boolean} dataSource.collapsed 当前收起状态。
 * @property {array} dataSource.options 选项列表
 * @property {string | number} dataSource.options.label 选项名称
 * @property {string | number} dataSource.options.value 选项值
 * @property {number} labelWidth 标签宽度，默认：80
 * @property {string} label label 标签内容
 */
export default {
    name: 'XFilterItem',
    components: {
        FilterTag,
    },
    props: {
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
    },
    slots: ['default', 'label', 'collapse'],
    setup(props) {
        const { labelWidth, colon, onChange } = useInjectFilterCtx()
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

        const cpLabelWidth = computed(() => labelWidth.value || props.labelWidth)
        const cpCollapsible = computed(
            () => props.dataSource.collapsible && contentInner.height > content.defaultHeight
        )
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

        return {
            colon,
            curValue,
            collapsed,
            content,
            contentInner,
            contentRef,
            contentInnerRef,
            cpLabelWidth,
            cpContentStyle,
            cpCollapsible,
            handleCollapse,
            onTagChange,
        }
    },
}
</script>

<script setup></script>

<style lang="less" scoped>
.x-filter {
    &-item {
        display: flex;
        padding: @padding-xs 0;
        line-height: inherit;

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            padding-bottom: 0;
        }

        &:not(:last-child) {
            border-bottom: @border-color-split dashed 1px;
        }

        &__label {
            flex-shrink: 0;
            line-height: inherit;
            text-align: right;
        }

        &__content {
            flex: 1;
            margin-left: @margin-xs;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            line-height: inherit;
        }

        &__collapse {
            margin-left: @margin-sm;
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
