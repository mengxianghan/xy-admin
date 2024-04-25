<template>
    <div class="x-transfer-list">
        <!--header-->
        <a-space class="x-transfer-list__header">
            <template v-if="showCheckAllComputed">
                <a-checkbox
                    :checked="checkedAll"
                    @change="onItemCheckAllChange">
                    全选
                </a-checkbox>
            </template>
            <template v-if="isRightComputed">
                <div class="x-transfer__count">
                    <slot
                        :count="dataSource.length"
                        :direction="direction"
                        name="selectedText">
                        已选 {{ dataSource.length }} 项
                    </slot>
                </div>
                <a-typography-link @click="handleClear">{{ clearText }}</a-typography-link>
            </template>
        </a-space>
        <template v-if="isLeftComputed">
            <!--搜索-->
            <template v-if="showSearch">
                <div class="x-transfer-list__search">
                    <a-input
                        v-model:value="keyword"
                        :placeholder="placeholder"
                        allow-clear>
                        <template #prefix>
                            <search-outlined class="color-placeholder"></search-outlined>
                        </template>
                    </a-input>
                </div>
            </template>
            <!--面包屑-->
            <div
                v-if="breadcrumb.length"
                class="x-transfer-list__breadcrumb">
                <a-breadcrumb>
                    <a-breadcrumb-item @click="onBreadcrumb()">
                        <a>
                            <home-outlined></home-outlined>
                        </a>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item
                        v-for="(item, index) in breadcrumb"
                        :key="item[fieldNames.value]"
                        @click="onBreadcrumb(item, index)">
                        <template v-if="index < breadcrumb.length - 1">
                            <a>{{ item[fieldNames.label] }}</a>
                        </template>
                        <template v-else>{{ item[fieldNames.label] }}</template>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
        </template>
        <!--body-->
        <div class="x-transfer-list__body">
            <template v-if="dataSource.length">
                <div class="x-transfer-list__content">
                    <transfer-list-item
                        v-for="item in dataSource"
                        :key="item[fieldNames.value]"
                        :checked="modelValue.includes(item[fieldNames.value])"
                        :direcrion="direction"
                        :record="item">
                        <template
                            v-for="(_, key) in pick(slots, ['item'])"
                            :key="key"
                            v-slot:[key]="slotProps">
                            <slot
                                :name="key"
                                v-bind="getSlotProps(slotProps)"></slot>
                        </template>
                    </transfer-list-item>
                </div>
            </template>
            <template v-else>
                <div class="x-transfer-list__empty">
                    <template v-if="isVNode(locale.emptyText)">
                        <component :is="locale.emptyText"></component>
                    </template>
                    <template v-else>
                        <empty :image="Empty.PRESENTED_IMAGE_SIMPLE">
                            <template #description>
                                {{ locale.emptyText }}
                            </template>
                        </empty>
                    </template>
                </div>
            </template>
        </div>
        <!--footer-->
        <template v-if="slots.footer">
            <div class="x-transfer-list__footer">
                <slot
                    :direction="direction"
                    name="footer"></slot>
            </div>
        </template>
    </div>
</template>

<script setup>
import { HomeOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { DIRECTION_ENUM } from './config'
import TransferListItem from './TransferListItem.vue'
import { useTransferInject, useTransferListProvide } from './context'
import { computed, defineModel, isVNode, ref, useSlots, watchEffect } from 'vue'
import { every, pick } from 'lodash-es'
import { getSlotProps } from '@/components/utils'
import { Empty } from 'ant-design-vue'

defineOptions({
    name: 'XTransferList',
})

const props = defineProps({
    direction: String,
    dataSource: {
        type: Array,
        default: () => [],
    },
})

const keyword = defineModel('keyword', { type: String })

const slots = useSlots()
const {
    fieldNames,
    modelValue,
    clearText,
    placeholder,
    showSearch,
    showCheckAll,
    locale,
    breadcrumb,
    onItemCheckAll,
    onClear,
    onBreadcrumb,
} = useTransferInject()

const checkedAll = ref(false)

const isLeftComputed = computed(() => DIRECTION_ENUM.is('left', props.direction))
const isRightComputed = computed(() => DIRECTION_ENUM.is('right', props.direction))
const showCheckAllComputed = computed(() => isLeftComputed.value && showCheckAll.value)

watchEffect(() => {
    if (DIRECTION_ENUM.is('left', props.direction)) {
        checkedAll.value = modelValue.value.length
            ? every(
                  props.dataSource.filter((item) => !item?.disabled),
                  (item) => modelValue.value.includes(item?.[fieldNames.value?.value])
              )
            : false
    }
})

/**
 * 清除
 */
function handleClear() {
    onClear()
}

/**
 * 全选发生改变
 */
function onItemCheckAllChange(e) {
    checkedAll.value = e.target.checked
    onItemCheckAll({ checked: checkedAll.value })
}

useTransferListProvide({
    direction: computed(() => props.direction),
})
</script>

<style lang="less" scoped>
.x-transfer-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 12px;

    &:first-child {
        border-right: @color-border solid 1px;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding-inline: 12px;
        margin-bottom: 8px;
        box-sizing: content-box;
        min-height: @control-height;
    }

    &__search {
        padding-inline: 12px;
        margin-bottom: 8px;
        flex-shrink: 0;
    }

    &__breadcrumb {
        padding-inline: 12px;
        margin-bottom: 8px;
        flex-shrink: 0;

        :deep(.ant-breadcrumb) {
            a {
                transition-property: color, background-color;
            }
        }
    }

    &__body {
        overflow: hidden;
        flex: auto;
        display: flex;
        flex-direction: column;
    }

    &__content {
        flex: auto;
        overflow: auto;
        padding-inline: 4px;
        margin: 0;
    }

    &__empty {
        margin: auto;
        flex: none;
    }

    &__loading-text,
    &__finished-text,
    &__error-text {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-block: 8px;
        color: @color-text-placeholder;
    }

    &__error-text {
        cursor: pointer;
    }

    &__footer {
        flex-shrink: 0;
        padding: 8px 12px;
        display: flex;
        align-items: center;
    }
}
</style>
