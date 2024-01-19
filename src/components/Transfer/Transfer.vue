<template>
    <div class="x-transfer">
        <transfer-list
            v-model:keyword="keyword"
            :data-source="dataListComputed"
            :direction="DIRECTION_ENUM.getValue('left')">
            <template
                v-for="(_, key) in slots"
                :key="key"
                v-slot:[key]="slotProps">
                <slot
                    :name="key"
                    v-bind="getSlotProps(slotProps)"></slot>
            </template>
        </transfer-list>
        <transfer-list
            :data-source="targetList"
            :direction="DIRECTION_ENUM.getValue('right')">
            <template
                v-for="(_, key) in slots"
                :key="key"
                v-slot:[key]="slotProps">
                <slot
                    :name="key"
                    v-bind="getSlotProps(slotProps)"></slot>
            </template>
        </transfer-list>
    </div>
</template>

<script setup>
import TransferList from './TransferList.vue'
import { DIRECTION_ENUM } from './config'
import { useTransferProvide } from './context'
import { computed, defineModel, ref, useSlots, watch, watchEffect } from 'vue'
import { filter, isFunction, last } from 'lodash-es'
import { Form } from 'ant-design-vue'
import { getSlotProps } from '../utils'
import { findTree } from '@/utils'

defineOptions({
    name: 'XTransfer',
})

const props = defineProps({
    dataSource: {
        type: Array,
        default: () => [],
    },
    targetSource: {
        type: Array,
        default: () => [],
    },
    fieldNames: {
        type: Object,
        default: () => ({
            label: 'label',
            value: 'value',
            children: 'children',
        }),
    },
    clearText: {
        type: String,
        default: '清除',
    },
    placeholder: String,
    showSearch: {
        type: Boolean,
        default: true,
    },
    showCheckAll: {
        type: Boolean,
        default: false,
    },
    filterOption: {
        type: Function,
    },
    locale: {
        type: Object,
        default: () => ({
            emptyText: '暂无数据',
        }),
    },
    loadData: {
        type: Function,
    },
})
const modelValue = defineModel('modelValue', { type: Array, default: () => [] })
const emits = defineEmits(['change'])

const slots = useSlots()
const { onFieldChange } = Form.useInjectFormItemContext()

const dataList = ref(props.dataSource)
const targetList = ref([])
const keyword = ref('')
const breadcrumb = ref([])

const dataListComputed = computed(() =>
    filter(dataList.value, (item) => {
        if (isFunction(props.filterOption)) {
            return props.filterOption(keyword.value, item)
        }
        if (keyword.value && keyword.value !== '') {
            return item[props.fieldNames.label].indexOf(keyword.value) > -1
        }
        return true
    })
)

watch(
    () => modelValue.value,
    () => {
        const result = []
        modelValue.value.forEach((item) => {
            findTree(
                props.dataSource,
                item,
                (item) => {
                    result.push(item)
                },
                { key: props.fieldNames.value, children: props.fieldNames.children }
            )
        })
        targetList.value = result
    },
    {
        immediate: true,
        deep: true,
    }
)

watchEffect(() => {
    const record = last(breadcrumb.value)
    if (record) {
        findTree(
            props.dataSource,
            record[props.fieldNames.value],
            (item) => {
                dataList.value = item?.[props.fieldNames.children] || []
            },
            { key: props.fieldNames.value, children: props.fieldNames.children }
        )
    } else {
        dataList.value = props.dataSource || []
    }
})

/**
 * 清除
 */
function onClear() {
    modelValue.value = filter(targetList.value, (item) => item.disabled).map((item) => item[props.fieldNames.value])
    onChangeTrigger()
}

/**
 * 选择
 * @param selectedKey
 * @param checked
 */
function onItemCheck({ selectedKey, checked }) {
    const index = modelValue.value.indexOf(selectedKey)
    if (index > -1) {
        modelValue.value.splice(index, 1)
    }
    if (checked) {
        modelValue.value.push(selectedKey)
    }
    onChangeTrigger()
}

/**
 * 全选
 * @param checked
 */
function onItemCheckAll({ checked }) {
    if (checked) {
        // 全选，将可操作项添加到已选列表
        filter(dataListComputed.value, (item) => !item.disabled)?.forEach((item) => {
            const value = item[props.fieldNames.value]
            if (modelValue.value.indexOf(value) < 0) {
                modelValue.value.push(value)
            }
        })
    } else {
        // 取消全选，将可操作项从已选列表中移除
        filter(dataListComputed.value, (item) => !item.disabled).forEach((item) => {
            const index = modelValue.value.indexOf(item[props.fieldNames.value])
            modelValue.value.splice(index, 1)
        })
    }
    onChangeTrigger()
}

function onChangeTrigger() {
    emits('change', modelValue.value)
    onFieldChange()
}

/**
 * 下级
 * @param record
 */
function onNext(record) {
    keyword.value = undefined
    breadcrumb.value.push(record)
    onLoadData()
}

function onBreadcrumb(record, index) {
    keyword.value = undefined
    if (record) {
        breadcrumb.value.splice(index + 1)
    } else {
        breadcrumb.value = []
    }
    onLoadData()
}

function onLoadData() {
    if (!isFunction(props.loadData)) return
    const record = last(breadcrumb.value) || {}
    props.loadData(record)
}

useTransferProvide({
    fieldNames: computed(() => props.fieldNames),
    modelValue: computed(() => modelValue.value),
    breadcrumb: computed(() => breadcrumb.value),
    clearText: computed(() => props.clearText),
    placeholder: computed(() => props.placeholder),
    showSearch: computed(() => props.showSearch),
    showCheckAll: computed(() => props.showCheckAll),
    locale: computed(() => props.locale),
    loadData: props.loadData,
    onItemCheck,
    onItemCheckAll,
    onClear,
    onNext,
    onBreadcrumb,
})
</script>

<style lang="less" scoped>
.x-transfer {
    display: flex;
    border: @color-border solid 1px;
    border-radius: @border-radius;
    height: 480px;
}
</style>
