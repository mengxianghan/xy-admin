<template>
    <li
        :class="{
            'x-transfer-list-item--disabled': disabledComputed,
        }"
        class="x-transfer-list-item"
        @click="handleClick">
        <!--复选框-->
        <template v-if="checkableComputed">
            <div class="x-transfer-list-item__checkbox">
                <a-checkbox
                    :checked="checked"
                    :disabled="disabledComputed"></a-checkbox>
            </div>
        </template>
        <!--内容-->
        <div class="x-transfer-list-item__content">
            <slot
                :checked="checked"
                :direction="direction"
                :disabled="disabledComputed"
                :record="record"
                name="item">
                {{ record[fieldNames.label] }}
            </slot>
        </div>
        <div class="x-transfer-list-item__extra">
            <!--左侧-->
            <template v-if="isLeftComputed">
                <template v-if="hasChildrenComputed">
                    <template v-if="checkableComputed">
                        <a-config-provider
                            :theme="{
                                components: {
                                    Button: {
                                        colorText: token.colorPrimary,
                                        colorBgTextHover: token.colorPrimaryBgHover,
                                        colorBgTextActive: token.colorPrimaryBgHover,
                                    },
                                },
                            }">
                            <a-button
                                :disabled="nextDisabledComputed"
                                size="small"
                                type="text"
                                @click.stop="handleNext">
                                下级
                            </a-button>
                        </a-config-provider>
                    </template>
                    <template v-else>
                        <right-outlined class="color-secondary"></right-outlined>
                    </template>
                </template>
            </template>
            <!--右侧-->
            <template v-if="isRightComputed">
                <!--删除-->
                <a-button
                    size="small"
                    type="text"
                    @click="handleDelete">
                    <template #icon>
                        <close-outlined class="color-secondary"></close-outlined>
                    </template>
                </a-button>
            </template>
        </div>
    </li>
</template>

<script setup>
import { CloseOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useTransferInject, useTransferListInject } from './context'
import { DIRECTION_ENUM } from './config'
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { isFunction } from 'lodash-es'

defineOptions({
    name: 'XTransferItem',
})

const props = defineProps({
    record: {
        type: Object,
        default: () => ({}),
    },
    checked: {
        type: Boolean,
        default: false,
    },
})

const { direction } = useTransferListInject()
const { fieldNames, loadData, onItemCheck, onNext } = useTransferInject()
const { token } = theme.useToken()

const isLeftComputed = computed(() => DIRECTION_ENUM.is('left', direction.value))
const isRightComputed = computed(() => DIRECTION_ENUM.is('right', direction.value))
const checkableComputed = computed(() => {
    const checkable = props.record.checkable
    return ([undefined, null].includes(checkable) || checkable) && isLeftComputed.value
})
const hasChildrenComputed = computed(() => {
    const checkChildren = props.record[fieldNames.value.children]?.length
    if (isFunction(loadData)) {
        const isLeaf = props.record.isLeaf || false
        return !isLeaf || checkChildren
    }
    return checkChildren
})
const disabledComputed = computed(() => props.record.disabled)
const nextDisabledComputed = computed(() => props.checked || disabledComputed.value)

function handleDelete() {
    if (disabledComputed.value) return

    onItemCheck({
        selectedKey: props.record[fieldNames.value.value],
        checked: false,
        direction: direction.value,
    })
}

function handleClick() {
    if (isRightComputed.value) return
    if (disabledComputed.value) return
    if (!checkableComputed.value) {
        if (hasChildrenComputed.value) {
            handleNext()
        }
        return
    }

    onItemCheck({
        selectedKey: props.record[fieldNames.value.value],
        checked: !props.checked,
        direction: direction.value,
    })
}

/**
 * 下级
 */
function handleNext() {
    onNext(props.record)
}
</script>

<style lang="less" scoped>
.x-transfer-list-item {
    display: flex;
    align-items: center;
    min-height: @control-height;
    padding: 4px 8px;
    border-radius: @border-radius;
    transition: all @motion-duration-mid;
    cursor: pointer;

    &:hover {
        background: @control-item-bg-hover;
    }

    &--disabled {
        color: @color-text-disabled;
        cursor: not-allowed;
    }

    &__checkbox {
        flex-shrink: 0;
        margin-right: 8px;
    }

    &__content {
        flex: 1;
    }

    &__description {
        font-size: 12px;
        color: @color-text-description;
        margin-top: 2px;
    }

    &__extra {
        margin: 0 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        :deep(.ant-btn) {
            &.ant-btn-sm {
                padding-inline: 2px;
            }

            &.ant-btn-text {
                .anticon {
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
