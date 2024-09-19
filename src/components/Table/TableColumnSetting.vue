<template>
    <a-popover
        :placement="placement"
        :trigger="trigger">
        <slot></slot>
        <template #title>
            <div class="x-table-column-setting__title">
                <a-checkbox
                    v-model:checked="checkAll"
                    :indeterminate="indeterminate"
                    @change="onCheckboxAllChange">
                    列展示/排序
                </a-checkbox>
                <a @click="handleReset">重置</a>
            </div>
        </template>
        <template #content>
            <vue-draggable
                v-model="list"
                :animation="150"
                class="x-table-column-setting__list"
                handle=".j-table-column-setting-handle"
                @update="onUpdate">
                <div
                    v-for="item in list"
                    :key="item.key"
                    class="x-table-column-setting__item">
                    <holder-outlined
                        class="x-table-column-setting__handle j-table-column-setting-handle"></holder-outlined>
                    <a-checkbox
                        v-model:checked="item.checked"
                        class="x-table-column-setting__name"
                        @change="onCheckboxChange">
                        {{ item.title }}
                    </a-checkbox>
                </div>
            </vue-draggable>
        </template>
    </a-popover>
</template>

<script setup>
import { HolderOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { cloneDeep, findIndex } from 'lodash-es'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({
    name: 'XTableColumnSetting',
})

defineProps({
    placement: {
        type: String,
        default: 'bottomLeft',
    },
    trigger: {
        type: String,
        default: 'click',
    },
})

const emits = defineEmits(['change'])

const columns = defineModel('columns', { type: Array, default: () => [] })

const cacheColumns = ref([])
const list = ref([])
const checkAll = ref(false)
const indeterminate = ref(false)

watch(
    () => list.value,
    () => {
        const checkedLength = list.value.filter((item) => item?.checked).length
        checkAll.value = checkedLength === list.value.length
        indeterminate.value = !!checkedLength && checkedLength < list.value.length
    },
    { deep: true }
)

onMounted(() => {
    init(columns.value)
})

/**
 * 初始化
 * @param _columns
 */
function init(_columns) {
    initCacheColumns(_columns)
    initList()
    initCheckAll()
    onTrigger()
}

/**
 * 初始化缓存列
 * @param _columns
 */
function initCacheColumns(_columns) {
    cacheColumns.value = cloneDeep(_columns)
}

/**
 * 初始化拖拽列表
 */
function initList() {
    list.value = cacheColumns.value
        .filter(
            /**
             * @param {{ignoreSetting?: boolean}} item
             * @returns {boolean}
             */
            (item) => !item?.ignoreSetting
        )
        .map(
            /**
             * @param {{title: string | number, key: string | number, hidden?: boolean}} item
             * @returns {{checked: boolean, title: *, key: *}}
             */
            (item) => {
                return {
                    title: item?.title,
                    key: item?.key,
                    checked: !item?.hidden,
                }
            }
        )
}

/**
 * 初始化全选
 */
function initCheckAll() {
    checkAll.value = !!list.value.filter((item) => item?.checked).length
}

/**
 * 重置
 */
function handleReset() {
    initList()
    columns.value = cacheColumns.value.filter((item) => !item?.hidden)
}

/**
 * 拖拽更新
 */
function onUpdate() {
    onTrigger()
}

/**
 * 复选框发生改变
 */
function onCheckboxChange() {
    onTrigger()
}

/**
 * 全选复选框发生改变
 * @param e
 */
function onCheckboxAllChange(e) {
    const checked = e.target.checked
    list.value = list.value.map((item) => ({ ...item, checked }))
    onTrigger()
}

/**
 * 触发
 */
function onTrigger() {
    const checkedKeys = list.value.filter((item) => item?.checked).map((item) => item?.key)
    columns.value = cacheColumns.value
        .filter(
            /**
             * @param {{key: string | number, ignoreSetting?: boolean}} column
             * @returns {boolean}
             */
            (column) => checkedKeys.includes(column?.key) || column?.ignoreSetting
        )
        .sort(
            /**
             * @param {{key: string | number}} a
             * @param {{key: string | number}} b
             * @returns {number}
             */
            (a, b) => {
                const indexA = findIndex(list.value, { key: a?.key })
                const indexB = findIndex(list.value, { key: b?.key })

                if (indexA < 0 || indexB < 0) {
                    return 1
                }

                return indexA - indexB
            }
        )

    emits('change', columns.value)
}

defineExpose({
    init,
})
</script>

<style lang="less" scoped>
.x-table-column-setting {
    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__list {
        overflow: hidden auto;
        max-height: 180px;
    }

    &__item {
        padding-block: 4px;
    }

    &__handle {
        margin-right: 8px;
        cursor: move;
    }
}
</style>
