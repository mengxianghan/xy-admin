<template>
    <div class="x-transfer">
        <div class="x-transfer-list">
            <div class="x-transfer-list-header">
                <a-checkbox
                    :checked="cpCheckAll"
                    :indeterminate="cpIndeterminate"
                    @change="onCheckAllChange">
                    全选
                </a-checkbox>
            </div>
            <template v-if="showSearch">
                <div class="x-transfer-list-search">
                    <a-input
                        allow-clear
                        v-model:value="keyword"
                        @change="onSearchChange">
                        <template #prefix>
                            <search-outlined
                                :style="{
                                    color: token.colorTextPlaceholder,
                                }"></search-outlined>
                        </template>
                    </a-input>
                </div>
            </template>
            <template v-if="breadcrumb.length">
                <div class="x-transfer-list-breadcrumb">
                    <a-breadcrumb>
                        <a-breadcrumb-item @click="handleBreadcrumb()">
                            <a>
                                <home-outlined></home-outlined>
                            </a>
                        </a-breadcrumb-item>
                        <a-breadcrumb-item
                            v-for="(item, index) in breadcrumb"
                            :key="item[props.fieldNames.value]"
                            @click="handleBreadcrumb(item, index)">
                            <template v-if="index < breadcrumb.length - 1">
                                <a>{{ item[props.fieldNames.label] }}</a>
                            </template>
                            <template v-else>{{ item[props.fieldNames.label] }}</template>
                        </a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
            </template>
            <transfer-list-body
                direction="left"
                :data-source="list">
                <template #default="attrs">
                    <slot
                        name="item"
                        v-bind="attrs"></slot>
                </template>
            </transfer-list-body>
            <template v-if="cpShowFooter">
                <div class="x-transfer-list-footer">
                    <slot
                        name="footer"
                        direction="left"></slot>
                </div>
            </template>
        </div>
        <div class="x-transfer-list">
            <div class="x-transfer-list-header">
                <div class="x-transfer-list-header__label">已选：{{ cpCount }}</div>
                <div class="x-transfer-list-header__extra">
                    <a-button
                        size="small"
                        @click="handleClear">
                        清空
                    </a-button>
                </div>
            </div>
            <transfer-list-body
                direction="right"
                :data-source="curTargetDataSource">
                <template #default="attrs">
                    <slot
                        name="item"
                        v-bind="attrs"></slot>
                </template>
            </transfer-list-body>
            <template v-if="cpShowFooter">
                <div class="x-transfer-list-footer">
                    <slot
                        name="footer"
                        direction="right"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, useSlots, watch } from 'vue'
import { useTransferProvide } from './context'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import TransferListBody from './TransferListBody.vue'

defineOptions({
    name: 'XTransfer',
})

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    dataSource: {
        type: Array,
        default: () => [],
    },
    defaultTargetDataSource: {
        type: Array,
        default: () => [],
    },
    showClear: {
        type: Boolean,
        default: false,
    },
    showSearch: {
        type: Boolean,
        default: false,
    },
    fieldNames: {
        type: Object,
        default: () => ({
            label: 'label',
            value: 'value',
            children: 'children',
        }),
    },
})
const emit = defineEmits(['change', 'update:modelValue', 'next', 'check', 'search'])

const slots = useSlots()
const { token } = theme.useToken()

const curValue = ref(props.modelValue)
const curTargetDataSource = ref(props.defaultTargetDataSource)
const keyword = ref()
const list = ref(props.dataSource)
const breadcrumb = ref([])

const cpValidList = computed(() => list.value.filter((item) => !item.disabled))
const cpCount = computed(() => props.modelValue.length)
const cpShowFooter = computed(() => slots.footer)
const cpCheckAll = computed(
    () =>
        !!curValue.value.length &&
        cpValidList.value.every((item) => curValue.value.includes(item[props.fieldNames.value]))
)
const cpIndeterminate = computed(
    () => !cpCheckAll.value && cpValidList.value.some((item) => curValue.value.includes(item[props.fieldNames.value]))
)

watch(
    () => props.modelValue,
    (val) => {
        if (val === curValue.value) return
        curValue.value = val
        curTargetDataSource.value = props.dataSource.filter((item) =>
            curValue.value.includes(item[props.fieldNames.value])
        )
    },
    { deep: true }
)

/**
 * 清空
 */
function handleClear() {
    curValue.value = []
    curTargetDataSource.value = []
    onTrigger()
}

/**
 * 面包屑导航
 * @param {object} record
 * @param {number} index
 */
function handleBreadcrumb(record, index) {
    // 根目录
    if (!record) {
        breadcrumb.value = []
        list.value = props.dataSource
        return
    }
    breadcrumb.value.splice(index + 1)
    list.value = record?.[props.fieldNames?.children]
}

/**
 * 切换选中状态
 * @param {object} value
 */
function onCheck(value) {
    const index = curValue.value.indexOf(value)
    const valueKey = props.fieldNames.value
    const targetIndex = curTargetDataSource.value.findIndex((item) => item[valueKey] === value)
    const record = list.value?.find((item) => item[valueKey] === value)

    if (index === -1) {
        curValue.value.push(value)
        curTargetDataSource.value.push(record)
    } else {
        curValue.value.splice(index, 1)
        curTargetDataSource.value.splice(targetIndex, 1)
    }

    onTrigger()
}

/**
 * 下级
 * @param {object} record
 */
function onNext(record) {
    breadcrumb.value.push(record)
    list.value = record?.[props.fieldNames?.children]
    emit('next', record)
}

/**
 * 全选发生改变
 */
function onCheckAllChange(e) {
    const { checked } = e.target
    if (checked) {
        // 全选
        cpValidList.value.forEach((item) => {
            const value = item[props.fieldNames.value]
            const index = curValue.value.indexOf(value)
            if (index === -1) {
                curValue.value.push(value)
                curTargetDataSource.value.push(item)
            }
        })
        // curValue.value = cpValidList.value.map((item) => item[props.fieldNames.value])
        // curTargetDataSource.value = list.value?.filter((item) => curValue.value.includes(item[props.fieldNames.value]))
    } else {
        // 取消全选
        curValue.value = curValue.value.filter(
            (item) => !cpValidList.value.map((item) => item[props.fieldNames.value]).includes(item)
        )
        curTargetDataSource.value = curTargetDataSource.value.filter(
            (item) =>
                !cpValidList.value.map((item) => item[props.fieldNames.value]).includes(item[props.fieldNames.value])
        )
    }
    onTrigger()
}

/**
 * 搜索发生改变
 */
function onSearchChange() {
    list.value = props.dataSource.filter((item) => item[props.fieldNames.label].indexOf(keyword.value) > -1)
    emit('search', keyword.value)
}

/**
 * 触发
 */
function onTrigger() {
    emit('update:modelValue', curValue.value)
    emit('change', curValue.value, { option: curTargetDataSource.value })
}

useTransferProvide({
    modelValue: computed(() => props.modelValue),
    fieldNames: computed(() => props.fieldNames),
    onCheck,
    onNext,
})
</script>

<style lang="less" scoped>
.x-transfer {
    display: flex;
    border: @color-border solid 1px;
    border-radius: @border-radius;
    background: #fff;
    height: 400px;

    &-list {
        flex: 1;
        display: flex;
        flex-direction: column;

        &:first-child {
            border-right: @color-border solid 1px;
        }

        &-header {
            display: flex;
            align-items: center;
            flex: 0 0 44px;
            padding-inline: 12px;
            box-sizing: content-box;
            border-bottom: @color-split solid 1px;

            &__extra {
                margin: 0 0 0 auto;
            }
        }

        &-search {
            padding-inline: 12px;
            margin-top: 12px;
            flex-shrink: 0;
        }

        &-breadcrumb {
            padding-inline: 12px;
            margin-top: 12px;
            flex-shrink: 0;
        }

        &-footer {
            flex: 0 0 44px;
            padding-inline: 12px;
            border-top: @color-split solid 1px;
            display: flex;
            align-items: center;
        }
    }
}
</style>
