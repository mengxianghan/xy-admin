<template>
    <div class="x-filter-item">
        <div
            class="x-filter-item__label"
            :style="{
                width: cptLabelWidth ? `${cptLabelWidth}px` : '',
            }">
            {{ currentValue.label ?? label }}
            <template v-if="colon">：</template>
        </div>
        <div class="x-filter-item__content">
            <!--slot-->
            <template v-if="$slots.default">
                <slot></slot>
            </template>
            <template v-else>
                <!--tag-->
                <template v-if="currentValue.options && currentValue.options.length">
                    <div class="x-filter-tags">
                        <div
                            v-for="item in currentValue.options"
                            :key="item.value"
                            class="x-filter-tag"
                            :class="{
                                'x-filter-tag--active': item.selected,
                            }"
                            @click="handleClick(currentValue, item)">
                            {{ item.label }}
                        </div>
                    </div>
                </template>
                <!--input-->
                <template v-if="TYPE_ENUM.is('input', currentValue.type)">
                    <a-space>
                        <a-input
                            v-model:value="currentValue.value"
                            allow-clear
                            @blur="onChange"></a-input>
                    </a-space>
                </template>
                <!--inputRange-->
                <template v-if="TYPE_ENUM.is('inputRange', currentValue.type)">
                    <a-space>
                        <a-input
                            v-model:value="currentValue.value[0]"
                            allow-clear
                            @blur="onChange"></a-input>
                        <span>~</span>
                        <a-input
                            v-model:value="currentValue.value[1]"
                            allow-clear
                            @blur="onChange"></a-input>
                    </a-space>
                </template>
                <!--date-->
                <template v-if="TYPE_ENUM.is('date', currentValue.type)">
                    <a-date-picker
                        v-model:value="currentValue.value"
                        allow-clear
                        :value-format="currentValue.valueFormat"
                        @change="onChange"></a-date-picker>
                </template>
                <!--dateRange-->
                <template v-if="TYPE_ENUM.is('dateRange', currentValue.type)">
                    <a-range-picker
                        v-model:value="currentValue.value"
                        allow-clear
                        :value-format="currentValue.valueFormat"
                        @change="onChange"></a-range-picker>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XFilterItem',
}
</script>

<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { TYPE_ENUM } from './config'

/**
 * @property {object} dataSource
 * @property {number} labelWidth 标签宽度，默认：80
 * @property {string} label 标签内容
 */
const props = defineProps({
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
})

const { labelWidth: ctxLabelWidth, colon, handleClick, onChange } = inject('filterContext')
const currentValue = ref({})

const cptLabelWidth = computed(() => ctxLabelWidth || props.labelWidth)

watchEffect(() => {
    if (currentValue.value === props.dataSource) return
    currentValue.value = props.dataSource
})
</script>

<style lang="less" scoped>
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
            display: flex;
            flex-wrap: wrap;
            align-items: center;
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
        transition: all 0.15s;

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
