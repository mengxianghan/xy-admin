<template>
    <div class="x-filter">
        <template v-for="(item) in list"
                  :key="item.key">
            <template v-if="item.scopedSlot">
                <slot :name="item.key"
                      :record="item"></slot>
            </template>
            <template v-else>
                <filter-item :data-source="item"></filter-item>
            </template>
        </template>
        <div v-if="useButton"
             class="x-filter-footer"
             :style="{
                 paddingLeft: labelWidth ? `${labelWidth}px` : ''
             }">
            <a-space>
                <a-button type="primary"
                          ghost
                          @click="handleOk">确定
                </a-button>
                <a-button @click="handleReset">重置</a-button>
            </a-space>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, toRefs, watch, provide } from 'vue'
import { TYPE_ENUM } from './config'

import cloneDeep from 'lodash/cloneDeep'

import FilterItem from './FilterItem.vue'

/**
 * 筛选组件
 * @property {object} modelValue
 * @property {array} dataSource
 *  @value {string} label 名称，必填
 *  @value {string} key 索引，必填，多条件不允许重复
 *  @value {string} type 筛选显示类型，默认：tag；可选值：tag=标签，input=输入框，inputRange=区间输入框，date=日期，dateRange=日期区间
 *  @value {boolean} multiple 多选，仅限 tag
 *  @value {array} options 选项列表，仅限 tag
 *      @value {string} label 选项名称
 *      @value {string | number} value 选项值
 * @property {boolean} colon 是否显示冒号，默认：true
 * @property {boolean} useButton 使用按钮，默认：false
 */
export default {
    name: 'XFilter',
    components: { FilterItem },
    props: {
        modelValue: {
            type: Object,
            default: () => ({}),
        },
        dataSource: {
            type: Array,
            default: () => [],
        },
        colon: {
            type: Boolean,
            default: true,
        },
        labelWidth: {
            type: Number,
            default: 0,
        },
        useButton: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['change', 'update:modelValue', 'ok', 'reset'],
    setup(props, { emit }) {
        const { dataSource, modelValue, useButton, colon, labelWidth } = toRefs(props)
        const list = ref({})

        provide('filterContext', {
            colon,
            labelWidth,
            handleClick,
            onChange,
        })


        watch(() => dataSource.value, () => init())

        onMounted(() => {
            init()
        })

        /**
         * 点击 tag
         * @param item
         * @param tag
         */
        function handleClick(item, tag) {
            const { multiple, key } = item
            const { value, selected } = tag
            const index = list?.value?.findIndex(o => o.key === key)
            const tagIndex = item?.options?.findIndex(o => o.value === value)
            // 判断多选
            if (multiple) {
                // 多选
                list.value[index].options[tagIndex].selected = !selected
            } else {
                // 单选
                list.value[index].options = list.value[index].options.map(item => {
                    return {
                        ...item,
                        selected: item.value === value,
                    }
                })
            }
            trigger()
        }

        /**
         * 确定
         */
        function handleOk() {
            const value = getValue()
            emit('ok', value)
        }

        /**
         * 取消
         */
        function handleReset() {
            emit('reset', {})
        }

        /**
         * 文本框发生改变
         */
        function onChange() {
            trigger()
        }

        /**
         * 初始化
         * @private
         */
        function init() {
            list.value = cloneDeep(dataSource.value)
                .map((item) => {
                    const { key, type, multiple, scopedSlot, options } = item
                    // 判断是否自定义插槽
                    if (scopedSlot) {
                        // 是自定义插槽
                        item.value = modelValue?.value[key]
                    } else {
                        // 不是自定义插槽，根据类型回填内容
                        // tag
                        if (TYPE_ENUM.is('tag', type) || Array.isArray(options)) {
                            item.options = item?.options.map(tag => {
                                return {
                                    ...tag,
                                    selected: multiple ? modelValue?.value[key]?.includes(tag.value) : modelValue?.value[key] === tag.value,
                                }
                            })
                        }
                        // 输入框
                        if (TYPE_ENUM.is('input', type)) {
                            item.value = modelValue?.value[key] ?? ''
                        }
                        // 输入区间
                        if (TYPE_ENUM.is('inputRange', type)) {
                            item.value = modelValue?.value[key] ?? []
                        }
                        // 日期 || 日期区间
                        if (['date', 'dateRange'].includes(TYPE_ENUM.getKey(type))) {
                            item.value = modelValue?.value[key] ?? null
                        }
                    }
                    return item
                })
        }

        /**
         * 获取筛选值
         * @return {{}}
         */
        function getValue() {
            const value = {}
            list?.value?.forEach(item => {
                const { key, type, multiple, scopedSlot, options } = item
                // 判断是否自定义插槽
                if (scopedSlot) {
                    // 是自定义插槽
                    value[key] = item?.value ?? null
                } else {
                    // 不是自定义插槽，根据类型判断应该返回的内容
                    // tag
                    if (TYPE_ENUM.is('tag', type) || Array.isArray(options)) {
                        // 判断是否多选
                        if (multiple) {
                            // 多选
                            value[key] = item?.options?.filter(item => item.selected)
                                .map(item => item.value)
                        } else {
                            // 单选
                            value[key] = item?.options?.find(o => o.selected)?.value ?? undefined
                        }
                    }
                    // 输入框
                    if (TYPE_ENUM.is('input', type)) {
                        value[key] = item?.value ?? undefined
                    }
                    // 输入区间
                    if (TYPE_ENUM.is('inputRange', type)) {
                        value[key] = item?.value ?? []
                    }
                    // 日期 || 日期区间
                    if (['date', 'dateRange'].includes(TYPE_ENUM.getKey(type))) {
                        value[key] = item?.value ?? null
                    }
                }
            })
            return value
        }

        /**
         * 触发
         * @private
         */
        function trigger() {
            if (useButton.value) {
                return
            }
            const value = getValue()
            emit('update:modelValue', value)
            emit('change', value)
        }

        return {
            TYPE_ENUM,
            list,
            handleOk,
            handleReset,
            onChange,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-filter {
    &-footer {
        display: flex;
        padding: @padding-xs 0;

        .ant-space {
            margin-left: @margin-xs;
        }
    }
}
</style>
