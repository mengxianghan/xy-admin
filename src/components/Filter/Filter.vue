<template>
    <div
        class="x-filter"
        :class="cpClassNames">
        <template
            v-for="item in dataSource"
            :key="item.key">
            <slot :record="item">
                <filter-item
                    :data-source="item"
                    :model-value="getModelValue(item.key)">
                    <template #collapse="{ collapsed }">
                        <slot
                            name="collapse"
                            :collapsed="collapsed"></slot>
                    </template>
                </filter-item>
            </slot>
        </template>
        <div
            v-if="footer"
            class="x-filter__footer"
            :style="{
                paddingLeft: labelWidth ? `${labelWidth}px` : '',
            }">
            <a-space>
                <template v-if="cpShowFooterSlot">
                    <slot name="footer"></slot>
                </template>
                <template v-else>
                    <a-button
                        :type="okType"
                        :size="size"
                        @click="handleOk"
                        v-bind="okButtonProps">
                        {{ okText }}
                    </a-button>
                    <a-button
                        :type="resetType"
                        :size="size"
                        @click="handleReset"
                        v-bind="resetButtonProps">
                        {{ resetText }}
                    </a-button>
                </template>
            </a-space>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, useSlots, watch } from 'vue'

import FilterItem from './FilterItem.vue'
import { useFilterCtx } from './context'

defineOptions({
    name: 'XFilter',
})

/**
 * 筛选组件
 * @property {object} modelValue
 * @property {array} dataSource
 * @property {boolean} colon 是否显示冒号。默认：true
 * @property {number} labelWidth label 标签宽度。默认：0
 * @property {boolean} footer 底部内容，当不需要底部按钮时可以设为 false。默认：false
 * @property {string} okText 确定按钮文字。默认：确定
 * @property {string} okType 确定按钮类型，详见：https://antdv.com/components/button-cn#API
 * @property {object} okButtonProps 确认按钮 props，详见：https://antdv.com/components/button-cn#API
 * @property {string} resetText 重置按钮文字。默认：确定
 * @property {string} resetType 重置按钮类型，详见：https://antdv.com/components/button-cn#API
 * @property {object} resetButtonProps 重置按钮 props，详见：https://antdv.com/components/button-cn#API
 * @property {string} size 尺寸，可选：default、small。默认：default
 */
const props = defineProps({
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
    labelAlign: {
        type: String,
        default: 'right',
    },
    footer: {
        type: Boolean,
        default: false,
    },
    okText: {
        type: String,
        default: '确定',
    },
    okType: {
        type: String,
        default: 'primary',
    },
    okButtonProps: {
        type: Object,
        default: () => ({
            ghost: true,
        }),
    },
    resetText: {
        type: String,
        default: '重置',
    },
    resetType: {
        type: String,
    },
    resetButtonProps: {
        type: Object,
        default: () => ({}),
    },
    size: {
        type: String,
        default: 'default',
    },
})

const emit = defineEmits(['change', 'update:modelValue', 'ok', 'reset'])

const slots = useSlots(['default', 'footer', 'collapse'])

const curValue = ref(new Map(Object.entries(props.modelValue)))
const cpShowFooterSlot = computed(() => slots.footer)
const cpClassNames = computed(() => ({
    [`x-filter--${props.size}`]: true,
    [`x-filter--label-align-${props.labelAlign}`]: true,
}))

useFilterCtx({
    colon: computed(() => props.colon),
    labelWidth: computed(() => props.labelWidth),
    onChange: trigger,
})

watch(
    () => props.modelValue,
    (val) => {
        if (Object.fromEntries(curValue.value) === val) return
        curValue.value = new Map(Object.entries(val))
    },
    { deep: true }
)

/**
 * 获取子节点当前值
 * @param {string | number} key
 */
function getModelValue(key) {
    return curValue.value.get(key)
}

/**
 * 确定
 */
function handleOk() {
    emit('ok')
}

/**
 * 取消
 */
function handleReset() {
    emit('reset')
}

/**
 * 触发
 * @private
 */
function trigger(key, value) {
    if (value === null || value === undefined) {
        curValue.value.delete(key)
    } else {
        curValue.value.set(key, value)
    }
    const val = Object.fromEntries(curValue.value)
    emit('update:modelValue', val)
    emit('change', val)
}
</script>

<style lang="less" scoped>
.x-filter {
    &--default {
        line-height: 32px;
    }

    &--small {
        line-height: 24px;
    }

    &__footer {
        display: flex;
        padding: 8px 0;

        .ant-space {
            margin-left: 8px;
        }
    }

    &--label-align {
        &-left {
            :deep(.x-filter-item__label) {
                text-align: left;
            }
        }
        &-right {
            :deep(.x-filter-item__label) {
                text-align: right;
            }
        }
    }
}
</style>
