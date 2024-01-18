<template>
    <div class="x-transfer">
        <transfer-list
            v-model:keyword="keyword"
            :direction="DIRECTION_ENUM.getValue('left')"
            :data-source="dataListComputed">
            <template
                v-for="(_, key) in slots"
                v-slot:[key]="slotProps"
                :key="key">
                <slot
                    v-bind="getSlotProps(slotProps)"
                    :name="key"></slot>
            </template>
        </transfer-list>
        <transfer-list
            :direction="DIRECTION_ENUM.getValue('right')"
            :data-source="targetList">
            <template
                v-for="(_, key) in slots"
                v-slot:[key]="slotProps"
                :key="key">
                <slot
                    v-bind="getSlotProps(slotProps)"
                    :name="key"></slot>
            </template>
        </transfer-list>
    </div>
</template>

<script setup>
import TransferList from './TransferList.vue'
import { DIRECTION_ENUM } from './config'
import { useTransferProvide } from './context'
import { computed, defineModel, ref, useSlots, watch } from 'vue'
import { filter } from 'lodash-es'
import { Form } from 'ant-design-vue'
import { getSlotProps } from '../utils'
import { findTree } from '@/utils'
import { isFunction } from '@/utils/is'

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
        return item[props.fieldNames.label].indexOf(keyword.value) > -1
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
    dataList.value = record.children || []
    breadcrumb.value.push(record)
}

function onBreadcrumb(record, index) {
    if (record) {
        dataList.value = record.children
        breadcrumb.value.splice(index + 1)
    } else {
        dataList.value = props.dataSource
        breadcrumb.value = []
    }
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
