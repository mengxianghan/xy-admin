<template>
    <div class="x-filter">
        <div v-for="(item, index) in list"
             :key="item.key"
             class="x-filter-item">
            <div class="x-filter-item__label"
                 :style="{
                    width: labelWidth ? `${labelWidth}px` : ''
                }">
                {{ item.label }}
                <template v-if="colon">：</template>
            </div>
            <div class="x-filter-item__content">
                <!--tag-->
                <template v-if="TYPE_ENUM.is('tag', item.type)">
                    <div class="x-filter-tags">
                        <div v-for="(tag, tagIndex) in item.children"
                             :key="tag.value"
                             class="x-filter-tag"
                             :class="{
                                 'x-filter-tag--active': tag.selected
                             }"
                             @click="handleTag(item, tag)">
                            {{ tag.label }}
                        </div>
                    </div>
                </template>
                <!--input-->
                <template v-if="TYPE_ENUM.is('input', item.type)">
                    <a-space>
                        <a-input v-model:value="item.value"
                                 allow-clear
                                 @blur="onChange"></a-input>
                    </a-space>
                </template>
                <!--inputRange-->
                <template v-if="TYPE_ENUM.is('inputRange', item.type)">
                    <a-space>
                        <a-input v-model:value="item.value[0]"
                                 allow-clear
                                 @blur="onChange"></a-input>
                        <span>~</span>
                        <a-input v-model:value="item.value[1]"
                                 allow-clear
                                 @blur="onChange"></a-input>
                    </a-space>
                </template>
                <!--date-->
                <template v-if="TYPE_ENUM.is('date', item.type)">
                    <a-date-picker v-model:value="item.value"
                                   allow-clear
                                   :value-format="item.valueFormat"
                                   @change="onChange"></a-date-picker>
                </template>
                <!--dateRange-->
                <template v-if="TYPE_ENUM.is('dateRange', item.type)">
                    <a-range-picker v-model:value="item.value"
                                    allow-clear
                                    :value-format="item.valueFormat"
                                    @change="onChange"></a-range-picker>
                </template>
            </div>
        </div>
        <div v-if="useButton"
             class="x-filter-item">
            <div class="x-filter-item__content"
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
    </div>
</template>

<script>
import {onMounted, ref, toRefs, watch} from 'vue'
import {TYPE_ENUM} from './enum'
import {cloneDeep} from 'lodash'

/**
 * 筛选组件
 * @property {object} model-value
 * @property {array} data-source
 *  @value {string} label 名称，必填
 *  @value {string} key 索引，必填，多条件不允许重复
 *  @value {string} type 筛选显示类型，默认：tag；可选值：tag=标签，input=输入框，inputRange=区间输入框，date=日期，dateRange=日期区间
 *  @value {boolean} multiple 多选，仅限 tag
 *  @value {array} children 选项列表，仅限 tag
 *      @value {string} label 选项名称
 *      @value {string | number} value 选项值
 * @property {boolean} colon 是否显示冒号，默认：true
 * @property {boolean} use-button 使用按钮，默认：false
 */
export default {
    name: 'Filter',
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
    setup(props, ctx) {
        const {dataSource, modelValue, useButton} = toRefs(props)
        const list = ref({})

        watch(() => dataSource.value, () => _init())

        onMounted(() => {
            _init()
        })

        /**
         * 点击 tag
         * @param item
         * @param tag
         */
        function handleTag(item, tag) {
            const {multiple, key} = item
            const {value, selected} = tag
            const index = list?.value?.findIndex(o => o.key === key)
            const tagIndex = item.children?.findIndex(o => o.value === value)
            // 判断多选
            if (multiple) {
                // 多选
                list.value[index].children[tagIndex].selected = !selected
            } else {
                // 单选
                list.value[index].children = list.value[index].children.map(item => {
                    return {
                        ...item,
                        selected: item.value === value,
                    }
                })
            }
            _trigger()
        }

        /**
         * 确定
         */
        function handleOk() {
            const value = _getValue()
            ctx.emit('ok', value)
        }

        /**
         * 取消
         */
        function handleReset() {
            ctx.emit('reset', {})
        }

        /**
         * 文本框发生改变
         */
        function onChange() {
            _trigger()
        }

        /**
         * 初始化
         * @private
         */
        function _init() {
            list.value = cloneDeep(dataSource.value).map((item) => {
                const {key, type, multiple} = item
                // tag
                if (TYPE_ENUM.is('tag', type)) {
                    item.children = item.children.map(tag => {
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
                return item
            })
        }

        /**
         * 获取筛选值
         * @return {{}}
         */
        function _getValue() {
            const value = {}
            list?.value?.forEach(item => {
                const {key, type, multiple} = item
                // tag
                if (TYPE_ENUM.is('tag', type)) {
                    // 判断是否多选
                    if (multiple) {
                        // 多选
                        value[key] = item.children.filter(item => item.selected).map(item => item.value)
                    } else {
                        // 单选
                        value[key] = item.children.find(o => o.selected)?.value ?? undefined
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
            })
            return value
        }

        /**
         * 触发
         * @private
         */
        function _trigger() {
            if (useButton.value) {
                return
            }
            console.log(1234)
            const value = _getValue()
            ctx.emit('update:modelValue', value)
            ctx.emit('change', value)
        }

        return {
            TYPE_ENUM,
            list,
            handleTag,
            handleOk,
            handleReset,
            onChange,
        }
    },
}
</script>

<style lang="less"
       scoped>
@line-height: 30px;
.x-filter {
    &-item {
        display: flex;
        padding: @padding-xs 0;

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
            line-height: @line-height;
            text-align: right;
        }

        &__content {
            flex: 1;
            margin-left: @margin-xs;
        }
    }

    &-tags {
        display: flex;
        flex-wrap: wrap;
        gap: @margin-xss;
    }

    &-tag {
        padding: 0 @padding-xs;
        display: flex;
        align-items: center;
        height: @line-height;
        line-height: @line-height;
        border-radius: @border-radius-base;
        cursor: pointer;
        border: transparent solid 1px;
        transition: all .15s;

        &:hover {
            color: @primary-color;
        }

        &--active {
            border: @primary-color solid 1px;
            color: @primary-color;
        }
    }
}
</style>
