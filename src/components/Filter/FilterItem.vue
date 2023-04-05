<template>
    <div class="x-filter-item">
        <div
            class="x-filter-item__label"
            :style="{
                width: cpLabelWidth ? `${cpLabelWidth}px` : '',
            }">
            <slot name="label">{{ dataSource.label ?? label }}</slot>
            <template v-if="colon">：</template>
        </div>
        <div class="x-filter-item__content">
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
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useInjectFilterCtx } from './context'
import FilterTag from './FilterTag.vue'

/**
 * @property {object} dataSource
 * @property {number} labelWidth 标签宽度，默认：80
 * @property {string} label 标签内容
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
    slots: ['default'],
    setup(props) {
        const { labelWidth, colon, onChange } = useInjectFilterCtx()
        const curValue = ref({})

        const cpLabelWidth = computed(() => labelWidth.value || props.labelWidth)

        watchEffect(() => {
            if (curValue.value === props.modelValue) return
            curValue.value = props.modelValue
        })

        function onTagChange(value) {
            onChange(props.dataSource.key, value)
        }

        return {
            colon,
            cpLabelWidth,
            curValue,
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
        }
    }
}
</style>
